const express = require("express");
const birds = require("./birds");

const app = express();

//middlewares that run for all the routes
app.use(express.json());
app.use("/birds", birds);

app.get("/", (req, res) => {
	res.send("Hello from the main application!");
});

app.listen(3000, () => {
	console.log(`started listening to the port 3000`);
});
