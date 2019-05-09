const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarsSchema = new Schema({
    name: String,
    safety: Array,
    economics: String,
    seating: Array,
    problems: Array,
    cargo: String,
    score: Number,
    images: Array,
    image: String
});

const Cars = mongoose.model("Cars", CarsSchema);

module.exports = Cars;
