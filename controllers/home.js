'use strict';

module.exports = function(userValidation, async, Club, _) {
	return {
		setRouting: function(router) {
			router.get('/home', userValidation.checkAuthStatus, this.getHomePage);
		},
		getHomePage: function(req, res) {
			async.parallel(
				[
					function(callback) {
						Club.find({}, (err, result) => {
							callback(err, result);
						});
					}
				],
				(err, results) => {
					const res1 = results[0];
					const chunkSize = 3;
					let dataChunk = [];

					for (let i = 0; i < res1.length; i += chunkSize) {
						dataChunk.push(res1.slice(i, i + chunkSize));
					}

					res.render('home', { title: 'Footballkik | Home', data: dataChunk });
				}
			);
		}
	};
};
