'use strict';

module.exports = function(_) {
	return {
		setRouting: function(router) {
			router.get('/', this.getIndexPage);
		},
		getIndexPage: function(req, res) {
			return res.render('index', { title: 'Footballkik | Login' });
		}
	};
};
