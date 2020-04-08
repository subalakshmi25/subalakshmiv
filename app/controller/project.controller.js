


const db = require('../config/db.config.js');
const Project = db.project;
const User = db.user;
 
// Init data: Projects & Users
exports.init = (req, res) => {	

	User.create({
		firstname: "suba",
		lastname: "v",
		age: 21		
	}).then(jack => {
			let users = [jack];
			
			return User.create({
				firstname: "sundar",
				lastname: "v",
				age: 18
			}).then(mary => {
				users.push(mary);
				return users;
			})
	}).then(users => {
		Project.create({
			code: 'Pr1',
			name: 'sql dev'
		}).then(p123 => {
			p123.setWorkers(users);
		})
		
		Project.create({
			code: 'Pr2',
			name: 'mysql Development'
		}).then(p456 => {
			p456.setWorkers(users);
		})
	}).then(() => {
		res.send("statement ok");
	});
};

// Fetch all Projects include Users
exports.findAll = (req, res) => {
	Project.findAll({
		attributes: ['code', 'name'],
		include: [{
			model:User, as: 'Workers',
			attributes: [['firstname', 'name'], 'age'],
			through: {
				attributes: ['projectId', 'userId'],
			}
		  }]
	}).then(projects => {
	   res.send(projects);
	});
};