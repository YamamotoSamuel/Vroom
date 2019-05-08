// const Celebrity = require("./models/celebrity.js");
const User = require("./models/user.js");
const Quiz = require("./models/quiz.js");

module.exports = function(app, passport) {
  app.get("/question", (req, res, next) => {
    res.render("question");
  });

  app.post("/saveMyQuiz", isLoggedIn, (req, res, next) => {
    console.log("am i in this", req.body);
    Quiz.create({ questions: req.body, userId: req.user._id }).then(result => {
      res.redirect("/");
    });
  });

  // normal routes ===============================================================

  let cars = [
    {
      name: "Sedan",
      safety: ["3", "4"],
      economics: "MPG",
      seating: ["Just me or +1", "2-4 passengers"],
      problems: "Cant find a parking spot because my car is too big",
      cargo: "No",
      score: 0,
      images: ['images/sedan.jpg','images/sedan2.jpg', ]
    },
    {
      name: "Coupe",
      safety: ["1", "2", "3"],
      economics: "Horsepower",
      seating: "Just me or +1",
      problems: [
        "Couldnt make the light because my car is too heavy and slow to pick up speed",
        "Cant find a parking spot because my car is too big"
      ],
      cargo: "No",
      score: 0
    },
    {
      name: "Hatchback or Wagon",
      safety: ["3", "4"],
      economics: "Horsepower",
      seating: "2-4 passengers",
      problems: [
        "Couldnt make the light because my car is too heavy and slow to pick up speed",
        "Cant find a parking spot because my car is too big",
        "Cant fit all my gear in my trunk"
      ],
      cargo: "Yes",
      score: 0
    },
    {
      name: "SUV or Crossover",
      safety: ["4", "5"],
      economics: "MPG",
      seating: "2-4 passengers",
      problems: "Cant fit all my gear in my trunk",
      cargo: "Yes",
      score: 0
    },
    {
      name: "Van or Minivan",
      safety: ["4", "5"],
      economics: "MPG",
      seating: "5+",
      problems: [
        "Too many heads, not enough seats",
        "Cant fit all my gear in my trunk"
      ],
      cargo: "Yes",
      score: 0
    },
    {
      name: "Truck",
      safety: ["4", "5"],
      economics: "Horsepower",
      seating: ["Just me or +1", "2-4"],
      problems: "Cant fit all my gear in my trunk",
      cargo: "Yes",
      score: 0
    }
  ];

  function filterCarFunction(yourLatestQuiz) {
    let answers = yourLatestQuiz.questions;

    console.log(answers);

    for (let c = 0; c < cars.length; c++) {
      //loop through all cars
      let eachCar = cars[c];

      for (ansKey in answers) {
        //loop through all answers
        for (key in eachCar) {
          //at each answer we loop through each car's attributes
          console.log(
            eachCar[ansKey] == answers[ansKey],
            eachCar[ansKey],
            answers[ansKey]
          );
          //if(eachCar[ansKey] == answers[ansKey]){
          if (eachCar[ansKey].includes(answers[ansKey])) {
            eachCar["score"]++;
            break;
          }
        }
        //return eachCar[key] == eachCar[key]
      }
      console.log(eachCar);
    }
    let bestCar = cars[0];
    cars.forEach(car => {
      if (car.score > bestCar.score) {
        bestCar = car;
      }
    });

    console.log("the best car is", bestCar);
    return bestCar;
  }

  // show the home page (will also have our login links)
  app.get("/", isLoggedIn, function(req, res) {
    Quiz.findOne({ userId: req.user._id })
      .sort({ $natural: -1 })
      .then(yourLatestQuiz => {
        console.log(yourLatestQuiz);
        //Now you gotta do the recommendation logic.... ?  Urban, Stylish, Can't fit all the gear in my truck
        let bestCar = filterCarFunction(yourLatestQuiz);

        res.render("index.hbs", { bestCar });
      });
  });

  // PROFILE SECTION =========================
  app.get("/profile", isLoggedIn, function(req, res) {
    console.log("in profile", req.user._id, "adfasdf", req.user.local._id);

    Quiz.findOne({ userId: req.user._id })
      .sort({ $natural: -1 })
      .then(yourLatestQuiz => {
        let bestCar = filterCarFunction(yourLatestQuiz);

        res.render("profile.hbs", {
          user: req.user,
          quiz: yourLatestQuiz,
          bestCar
        });
      }).catch(err=>{
        console.error('err',err)
        res.redirect('question')
      })
  });

  // LOGOUT ==============================
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // route middleware to ensure user is logged in
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/login");
  }
};
