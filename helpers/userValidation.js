'use strict';

module.exports = function() {
	return {
		signupValidation: (req, res, next) => {
			req.checkBody('username', 'A username is required.').notEmpty();
			req.checkBody('username', 'Your username must be at least five characters long.').isLength({ min: 5 });
			req.checkBody('email', 'Your e-mail address is required.').notEmpty();
			req.checkBody('email', 'Your e-mail address is invalid.').isEmail();
			req.checkBody('password', 'Please select a password.').notEmpty();
			req.checkBody('password', 'Your password must be at least five characters long.').isLength({ min: 5 });

			req
				.getValidationResult()
				.then(result => {
					const errors = result.array();
					let messages = [];

					errors.forEach(error => {
						messages.push(error.msg);
					});

					req.flash('error', messages);
					res.redirect('/signup');
				})
				.catch(err => {
					return next();
				});
		},
		loginValidation: (req, res, next) => {
			req
				.getValidationResult()
				.then(result => {
					const errors = result.array();
					let messages = [];

					errors.forEach(error => {
						messages.push(error.msg);
					});

					req.flash('error', messages);
					res.redirect('/');
				})
				.catch(err => {
					return next();
				});
		},
		checkAuthStatus: (req, res, next) => {
			if (!req.isAuthenticated() || !req.user) {
				res.redirect('/');
			} else {
				next();
			}
		}
	};
};
