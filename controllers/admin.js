// const path = require('path');
// const fs = require('fs');

module.exports = function(formidable, Club, aws) {
	return {
		setRouting: function(router) {
			router.get('/dashboard', this.getDashboard);

			router.post('/upload', aws.Upload.any(), this.postUpload);
			router.post('/dashboard', this.postDashboard);
		},
		getDashboard: function(req, res) {
			res.render('admin/dashboard');
		},
		postUpload: function(req, res) {
			let form = new formidable.IncomingForm();
			// form.uploadDir = path.join(__dirname, '../public/uploads');

			form.on('file', (field, file) => {
				// fs.rename(file.path, path.join(form.uploadDir, file.name), err => {
				// 	if (err) {
				// 		throw new Error('Error renaming file.');
				// 	}
				//
				// 	console.log('File renamed successfully...');
				// });
			});

			form.on('error', err => {
				console.log(err);
			});

			form.on('end', () => {
				console.log('File upload successful...');
			});

			form.parse(req);

			res.end();
		},
		postDashboard: function(req, res) {
			let newClub = new Club();
			newClub.name = req.body.club;
			newClub.country = req.body.country;
			newClub.image = req.body.imagename;

			newClub.save(err => {
				res.render('admin/dashboard');
			});
		}
	};
};
