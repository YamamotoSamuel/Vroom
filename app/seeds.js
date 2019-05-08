const mongoose = require("mongoose");
const carType = require("../models/car-type.js");
mongoose.connect("mongodb://localhost/project-02");
const carTypes = [
  {
    name: "Sedan",
    description:
      "Most common car found on the road and is best for daily commutes on paved roads",
    avgWeight:
      "Ranges roughly from 2500-4500 lbs in 'curb weight' typically depending on the engine size",
    knownFor: "Simplicity and reliability",
    drivetrain: "Typically FWD, RWD, or AWD"
  },
  {
    body: "Coupe",
    description:
      '2 door car typically known to be a manufacturer\'s "sports car" or sport variant',
    avgWeight:
      "Ranges roughly from 2500-4500 lbs in 'curb weight' typically depending on the engine size",
    knownFor: "Sleek body design and racing characteristics",
    drivetrain: "Typically RWD or AWD"
  },
  {
    body: "Hatchback",
    description:
      "Most common car found on the road and is best for daily commutes on paved roads",
    avgWeight:
      "Ranges roughly from 2500-4500 lbs in 'curb weight' typically depending on the engine size",
    knownFor: "Simplicity and reliability",
    drivetrain: "Typically FWD or AWD"
  },
  {
    body: "SUV/Crossover",
    description:
      "Most common car found on the road and is best for daily commutes on paved roads",
    avgWeight:
      "Ranges roughly from 2500-4500 lbs in 'curb weight' typically depending on the engine size",
    knownFor: "Simplicity and reliability",
    drivetrain: "Typically RWD or AWD"
  },
  {
    body: "Truck",
    description:
      "Most common car found on the road and is best for daily commutes on paved roads",
    avgWeight:
      "Ranges roughly from 2500-4500 lbs in 'curb weight' typically depending on the engine size",
    knownFor: "Simplicity and reliability",
    drivetrain: "Typically RWD, or AWD"
  },
  {
    body: "Van/Minivan",
    description:
      "Common car amongst big families and soccer moms all around the globe",
    avgWeight:
      "Ranges roughly from 2500-4500 lbs in 'curb weight' typically depending on the engine size",
    knownFor: "Space in the cabin and all around comfort (Not the best looker)",
    drivetrain: "Typically FWD, or AWD(for a higher cost)"
  }
];

carType
  .insertMany(carTypes)
  .then(res => {
    console.log("inserted ", carTypes.length, " cars");
    mongoose.connection.close();
  })
  .catch(err => console.log(err));
