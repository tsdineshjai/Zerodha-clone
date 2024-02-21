const express = require("express");
const mongoose = require("mongoose");

const { User } = require("./model.js");

mongoose.connect(
	"mongodb+srv://jai:oRheL8WluAybJLLK@cluster0.tkjwomo.mongodb.net/?retryWrites=true&w=majority"
);

const app = express();
app.use(express.json());

const PORT = 3000;

//create operation done.
app.post("/create", (req, res) => {
	const username = req.body.username;
	const age = req.body.age;
	User.create({ username, age })
		.then((user) => {
			console.log(`user was created`);
			res.status(200).json({
				message: "User was created",
			});
		})
		.catch((err) => {
			console.log(err.message);
			res.status(404).json({
				message: "a unknown error has happened",
			});
		});
});

//read operation done
app.get("/user:username", async (req, res) => {
	let username = req.params.username;
	username = username.slice(1);
	console.log(username);
	if (username) {
		User.findOne({ username })
			.then((user) => {
				console.log(user);
				res.status(200).json({
					results: user,
				});
			})
			.catch((error) => {
				res.json({
					msg: error.message,
				});
			});
	} else {
		res.status(403).json({
			msg: "user name wasnt included in the request",
		});
	}
});

//updateOperation.

app.get("/update:username", async (req, res) => {
	let username = req.params.username;
	username = username.slice(1);
	const filter = { username: username };
	const update = { age: "22" };

	const user = await User.findOneAndUpdate(filter, update);
	res.json({
		msg: "opeartion succesfuly done",
	});
});

app.listen(PORT, () => {
	console.log(`listening to the port `);
});
