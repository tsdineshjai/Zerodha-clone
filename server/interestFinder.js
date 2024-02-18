const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.listen(3000, () => {
	console.log(`interest server up and running`);
});

app.get("/interest", (req, res) => {
	const body = req.body;
	const principal = Number(req.query.principal);
	const rate = Number(req.query.rate);
	const tenure = Number(req.query.tenure);

	if (principal === null || rate === null || tenure === null) {
		res
			.status(403)
			.send(
				"required paramaters is found in wrong format or required paramaters are not mentioned"
			);
	}
	const SI = (principal * rate * tenure) / 100;
	res.status(200).json({
		simpleInterest: SI,
	});
});
