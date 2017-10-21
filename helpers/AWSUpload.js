const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const config = require('../config');

AWS.config.update({
	accessKeyId: config.aws.accessKeyID,
	secretAccessKey: config.aws.secretAccessKey,
	region: 'us-west-1'
});

const s3 = new AWS.S3({});
const upload = multer({
	storage: multerS3({
		s3,
		bucket: 'footballkik-bjh',
		acl: 'public-read',
		metadata(req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key(req, file, cb) {
			cb(null, file.originalname);
		}
	}),
	rename: function(fieldname, filename) {
		return filename.replace(/\W+/g, '-').toLowerCase();
	}
});

exports.Upload = upload;
