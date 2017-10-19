'use strict';

module.exports = function(_, passport) {
	return {
		setRouting: function(router) {
			router.get('/', this.getIndexPage);
			router.get('/signup', this.getSignupPage);
			router.get('/home', this.getHomePage);

			router.post('/signup', this.postSignupPage);
		},
		getIndexPage: function(req, res) {
			return res.render('index', { title: 'Footballkik | Log In', hasErrors: false });
		},
		getSignupPage: function(req, res) {
			return res.render('signup', { title: 'Footballkik | Register', hasErrors: false });
		},
		getHomePage: function(req, res) {
			return res.render('home');
		},
		postSignupPage: passport.authenticate('local.signup', {
			successRedirect: '/home',
			failureRedirect: '/signup',
			failureFlash: true
		})
	};
};
