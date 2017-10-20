'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

passport.use(
	'local.signup',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		(req, email, password, done) => {
			User.findOne({ email }, (err, user) => {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, false, req.flash('error', 'A user with that e-mail address already exists.'));
				}

				let newUser = new User();
				newUser.username = req.body.username;
				newUser.email = req.body.email;
				newUser.password = newUser.encryptPassword(req.body.password);

				newUser.save(err => {
					done(null, newUser);
				});
			});
		}
	)
);

passport.use(
	'local.login',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		(req, email, password, done) => {
			User.findOne({ email }, (err, user) => {
				if (err) {
					return done(err);
				}

				let messages = [];

				if (!user || !user.validatePassword(password)) {
					messages.push('Invalid login credentials. Please try again.');

					return done(null, false, req.flash('error', messages));
				}

				return done(null, user);
			});
		}
	)
);
