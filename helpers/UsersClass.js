class Users {
	constructor() {
		this.users = [];
	}

	addUserData(id, name, room) {
		const user = { id, name, room };
		this.users.push(user);
		return user;
	}
}

module.exports = { Users };
