/* express.Router deep dive */

const express = require("express");
const router = express.Router();
//router instance is a routing system , middleware too

router.use((req, res, next) => {
	console.log("Time: ", Date.now());
	next();
});

//defining some routes : home page
router.get("/", (req, res) => {
	res.status(200).json({
		msg: "this is the home page",
	});
});

//defining about route
router.get("/about", (req, res) => {
	res.json({
		msg: "its about birds",
	});
});

module.exports = router;
