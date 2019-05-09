// const Celebrity = require("./models/celebrity.js");
const User = require("./models/user.js");
const Quiz = require("./models/quiz.js");
const Cars = require("./models/cars.js");
const carsOriginal = require('../cars') 

module.exports = function(app, passport) {
  app.get("/question", (req, res, next) => {
    res.render("question");
  });

  app.post("/saveMyQuiz", isLoggedIn, (req, res, next) => {
    console.log("am i in this ------------------------------------------------------------ ", req.body);
    Quiz.create({ questions: req.body, userId: req.user._id }).then(result => {
      console.log("the results from the questions <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ", result);
      console.log("===============================================================================");
      
      res.redirect("/");
    });
  });
///////////////////^^^^^^^^^^^^^^^^^^ this creating a quiz each time?
  // normal routes ===============================================================


  function filterCarFunction(yourLatestQuiz) {
    let answers = yourLatestQuiz.questions;
    let cars = [...carsOriginal]

    // console.log('cars copy',cars)
    //console.log(answers);
    cars.forEach(oneCar => {
      oneCar.score = 0;
      console.log("each cars score >>>>> ======== ", oneCar.score);
    })

    for (let c = 0; c < cars.length; c++) {
      //loop through all cars
      let eachCar = cars[c];

      for (ansKey in answers) {
        //loop through all answers
        for (key in eachCar) {

          if (eachCar[ansKey].includes(answers[ansKey])) {
            eachCar["score"]++;
            console.log("checking each car >>>>>>>>>>>>>>>> ", eachCar.name, eachCar.score, eachCar[ansKey], " =========== ", answers, answers[ansKey])
            break;
          }
        }
      }
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


  //  function filterCarFunction(yourLatestQuiz) {
  //   let answers = yourLatestQuiz.questions;
  //   let cars = [...carsOriginal]

  //   console.log('cars copy',cars)
  //   //console.log(answers);

  //   for (let c = 0; c < cars.length; c++) {
  //     //loop through all cars
  //     let eachCar = cars[c];

  //     for (ansKey in answers) {
  //       //loop through all answers
  //       for (key in eachCar) {

  //         if (eachCar[ansKey].includes(answers[ansKey])) {
  //           eachCar["score"]++;
  //           break;
  //         }
  //       }
  //     }
  //   }
  //   let bestCar = cars[0];
  //   cars.forEach(car => {
  //     if (car.score > bestCar.score) {
  //       bestCar = car;
  //     }
  //   });


  //   console.log("the best car is", bestCar);
  //   return bestCar;
  // }

  // show the home page (will also have our login links)
  app.get("/", isLoggedIn, function(req, res) {
    // >>>>>>>>>>>>>>>>>>> must find all quizzes that belong to the user and use the last quiz in the array <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Quiz.find({ userId: req.user._id })
      .sort({ $natural: 1 })
      .then(yourLatestQuiz => {
        console.log(yourLatestQuiz);
        console.log("all of the quizzes that belong to the user ?M?>M?><>?<?<?><>?M?><>?<?><?><?><?><?<?<>?<>?<?<>?<?<<>?<?><>?<?><?<?>", yourLatestQuiz[yourLatestQuiz.length-1])
        //Now you gotta do the recommendation logic.... ?  Urban, Stylish, Can't fit all the gear in my truck
        let bestCar = filterCarFunction(yourLatestQuiz[yourLatestQuiz.length-1]);

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