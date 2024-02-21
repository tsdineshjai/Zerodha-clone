const mongoose = require("mongoose");

const { Schema, model } = mongoose;

//create a schema
const MySchema = new Schema({
	username: String,
	age: String,
});

//create a model : to create documents with a specific schema

const User = model("User", MySchema);
module.exports = { User };
