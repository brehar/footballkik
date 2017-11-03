'use strict';

module.exports = function(userValidation) {
	return {
		setRouting: function(router) {
			router.get('/home', userValidation.checkAuthStatus, this.getHomePage);
		},
		getHomePage: function(req, res) {
			return res.render('home');
		}
	};
};
