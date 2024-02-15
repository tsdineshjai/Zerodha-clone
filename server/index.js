const express = require("express");
const jwt = require("jsonwebtoken");
const jwtpassword = "123456";
const app = express();
const mongose = require("mongoose");
mongose.connect(
	"mongodb+srv://jai:oRheL8WluAybJLLK@cluster0.tkjwomo.mongodb.net/"
);
app.use(express.json());

const userModel = mongose.model("User", {
	username: String,
	password: String,
	name: String,
});
const USERS = [
	{
		username: "jai@gmail.com",
		password: "12345",
		name: "jai",
	},
	{
		username: "tanishkasri@gmail.com",
		password: "12345",
		name: "tanishkasri",
	},
	{
		username: "ammu@gmail.com",
		password: "12345",
		name: "ammu",
	},
];

app.post("/sign-up", async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const name = req.body.name;

	const userExists = await userModel.findOne({ name: name });
	console.log(userExists);
	//if user exists this would return true.

	if (userExists ? true : false) {
		res.status(404).json({
			msg: "user already exists",
		});
	} else {
		const NewUser = new userModel({
			username,
			password,
			name,
		});

		NewUser.save().then(() =>
			console.log(`user have been saved to the database successfully`)
		);

		res.json({
			msg: "user has been added succesfully",
		});
	}
});

function userExists(username, password) {
	const result = USERS.find(
		(user) => user.username === username && user.password === password
	);
	return result ? true : false;
}
app.get("/", (req, res) => {
	console.log(req.body);
	res.send({
		message: "get request is working",
	});
});

app.post("/sign-in", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	if (!userExists(username, password)) {
		res.status(400).json({
			message: "user not found in our database",
		});
	}
	let token = jwt.sign({ username, password }, jwtpassword);
	return res.json({
		token,
	});
});

app.get("/users", (req, res) => {
	const token = req.headers.authorization;
	try {
		const decoded = jwt.verify(token, jwtpassword);
		const USERNAME = decoded.username;
		res.json({
			users: USERS.filter((user) => user.username !== USERNAME),
		});
		//we are returning all the users except the one
	} catch (err) {
		res.status(403).json({
			msg: err.msg,
		});
	}
});

app.listen(3000, () => console.log(`server is up and running`));
