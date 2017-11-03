'use strict';

module.exports = function(_, passport, userValidation) {
	return {
		setRouting: function(router) {
			router.get('/', this.getIndexPage);
			router.get('/signup', this.getSignupPage);
			router.get('/auth/facebook', this.getFacebookLogin);
			router.get('/auth/facebook/callback', this.getFacebookCallback);
			router.get('/auth/google', this.getGoogleLogin);
			router.get('/auth/google/callback', this.getGoogleCallback);

			router.post('/', userValidation.loginValidation, this.postLoginPage);
			router.post('/signup', userValidation.signupValidation, this.postSignupPage);
		},
		getIndexPage: function(req, res) {
			const errors = req.flash('error');

			return res.render('index', {
				title: 'Footballkik | Log In',
				messages: errors,
				hasErrors: errors.length > 0
			});
		},
		getSignupPage: function(req, res) {
			const errors = req.flash('error');

			return res.render('signup', {
				title: 'Footballkik | Register',
				messages: errors,
				hasErrors: errors.length > 0
			});
		},
		getFacebookLogin: passport.authenticate('facebook', {
			scope: 'email'
		}),
		getFacebookCallback: passport.authenticate('facebook', {
			successRedirect: '/home',
			failureRedirect: '/',
			failureFlash: true
		}),
		getGoogleLogin: passport.authenticate('google', {
			scope: [
				'https://www.googleapis.com/auth/plus.login',
				'https://www.googleapis.com/auth/plus.profile.emails.read'
			]
		}),
		getGoogleCallback: passport.authenticate('google', {
			successRedirect: '/home',
			failureRedirect: '/',
			failureFlash: true
		}),
		postLoginPage: passport.authenticate('local.login', {
			successRedirect: '/home',
			failureRedirect: '/',
			failureFlash: true
		}),
		postSignupPage: passport.authenticate('local.signup', {
			successRedirect: '/home',
			failureRedirect: '/signup',
			failureFlash: true
		})
	};
};
