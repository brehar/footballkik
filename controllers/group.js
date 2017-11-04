'use strict';

module.exports = function() {
	return {
		setRouting: function(router) {
			router.get('/group/:name', this.getGroupPage);
		},
		getGroupPage: function(req, res) {
			const name = req.params.name;
			res.render('groupchat/group', { title: 'Footballkik | ' + name, user: req.user, groupName: name });
		}
	};
};
