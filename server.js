const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const socketIO = require('socket.io');

const container = require('./container');
const config = require('./config');
const { Users } = require('./helpers/UsersClass');

container.resolve(function(users, _, admin, home, group) {
	mongoose.Promise = global.Promise;

	mongoose.connect(config.MONGODB_URI, { useMongoClient: true }, function() {
		console.log('Connected to the database...');
	});

	const app = setupExpress();

	function setupExpress() {
		const app = express();
		const server = http.createServer(app);
		const io = socketIO(server);
		const PORT = process.env.PORT || 3000;

		server.listen(PORT, function() {
			console.log(`Listening on port ${PORT}...`);
		});

		configureExpress(app);

		require('./socket/groupchat')(io, Users);

		const router = require('express-promise-router')();

		users.setRouting(router);
		admin.setRouting(router);
		home.setRouting(router);
		group.setRouting(router);

		app.use(router);
	}

	function configureExpress(app) {
		require('./passport/passport-local');
		require('./passport/passport-facebook');
		require('./passport/passport-google');

		app.use(express.static('public'));

		app.use(cookieParser());

		app.set('view engine', 'ejs');

		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(validator());
		app.use(
			session({
				secret: config.SESSION_SECRET,
				resave: true,
				saveUninitialized: true,
				store: new MongoStore({ mongooseConnection: mongoose.connection })
			})
		);
		app.use(flash());
		app.use(passport.initialize());
		app.use(passport.session());

		app.locals._ = _;
	}
});
