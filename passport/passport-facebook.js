'use strict';

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/User');
const config = require('../config');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

passport.use(
	new FacebookStrategy(
		{
			clientID: config.facebook.clientID,
			clientSecret: config.facebook.clientSecret,
			profileFields: ['email', 'displayName', 'photos'],
			callbackURL: 'http://localhost:3000/auth/facebook/callback',
			passReqToCallback: true
		},
		(req, token, refreshToken, profile, done) => {
			User.findOne({ facebook: profile.id }, (err, user) => {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, user);
				}

				let newUser = new User();
				newUser.facebook = profile.id;
				newUser.fullname = profile.displayName;
				newUser.email = profile._json.email;
				newUser.userImage = `https://graph.facebook.com/${profile.id}/picture?type=large`;
				newUser.facebookTokens.push({ token });

				newUser.save(err => {
					return done(null, user);
				});
			});
		}
	)
);
