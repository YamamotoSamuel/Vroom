const Celebrity = require("./models/celebrity.js");
const User = require("./models/user.js");
const Quiz = require("./models/quiz.js");

module.exports = function(app, passport) {
  app.get("/question", (req, res, next) => {
    res.render("question");
  });


  app.post("/saveMyMoFoQuiz", isLoggedIn, (req, res, next) => {
    console.log("am i in this mofo shit ", req.body);
    Quiz.create({ questions: req.body, userId: req.user._id }).then(result => {
      res.redirect("/");
    });
  });

  // normal routes ===============================================================

  let cars = [

    {
      type:'Suburban',
      seating: '4 or more',
      economics: 'Horsepower',
      name: 'Z',
      problems:'Cant find a parking spot because my car is too big',
      score:0
    },
    {
      type:'Urban',
      seating: '4 or more',
      economics: 'MPG',
      name: 'Taho',
      problems:'Cant find a parking spot because my car is too big',
      score:0
    },
    {
      type:'SubUrban',
      seating: '4 or more',
      economics: 'Horsepower',
      name: 'Y!',
      problems:'Cant find a parking spot because my car is too big',
      score:0
    },
    {
      type:'Urban',
      seating: '4 or more',
      economics: 'Horsepower',
      name: 'W',
      problems:'Cant find a parking spot because my car is too big',
      score:0
    },
  ]



  /**
   * 
   * MPG vs Horsepower 
   * 
   * 
   * Just me 
   * 2-3 
   * 4 or more
   * 
   * 
   * 
   */





  function filterCarFunction(yourLatestQuiz){
    let answers = yourLatestQuiz.questions; 

    console.log(answers)
    
    for(let c=0; c<cars.length; c++){
      let eachCar = cars[c]

        for(ansKey in answers){
          for(key in eachCar){
          console.log(eachCar[ansKey] == answers[ansKey], eachCar[ansKey], answers[ansKey])
          if(eachCar[ansKey] == answers[ansKey]){
            eachCar['score']++
            break;
          }
        }
        //return eachCar[key] == eachCar[key]
      }
      console.log(eachCar)
    }
    let bestCar = {score:0} 
    cars.forEach(car=>{
      if(car.score > bestCar.score) {
        bestCar = car;
      }
    })

    console.log('the best car is', bestCar)
    return cars


  }








  // show the home page (will also have our login links)
  app.get("/",  isLoggedIn, function(req, res) {

    Quiz.findOne({ userId: req.user._id}).sort({$natural:-1}).then(yourLatestQuiz => {
      console.log(yourLatestQuiz)
      //Now you gotta do the recommendation logic.... ?  Urban, Stylish, Can't fit all the gear in my truck 
      let filteredCars = filterCarFunction(yourLatestQuiz)

      res.render("index.hbs", { filteredCars });
    })
  });

  // PROFILE SECTION =========================
  app.get("/profile", isLoggedIn, function(req, res) {



    Quiz.findOne({ userId: req.user._id}).sort({$natural:-1}).then(yourLatestQuiz => {

      filterCarFunction(yourLatestQuiz)

      res.render("profile.hbs", {
        user: req.user,
        quiz: yourLatestQuiz
      });
    })
  });

  // LOGOUT ==============================
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/celebrities", (req, res, next) => {
    Celebrity.find().then(celebs => {
      res.render("celebrities.hbs", { celebs });
    });
  });

  app.post("/saveActorToTheDatabase", (req, res, next) => {
    console.log("did we make it????", req.body);
    Celebrity.create(req.body).then(result => {
      res.redirect("celebrities");
    });
  });

  ///details/5cc9e9a3329be1f82a23c0da
  app.get("/details/:celebID", (req, res, next) => {
    Celebrity.findById(req.params.celebID).then(celeb => {
      res.render("celebDetail.hbs", { celeb });
    });
  });

  app.get("/delete/:id", (req, res, next) => {
    Celebrity.findByIdAndDelete(req.params.id)
      .then(r => {
        console.log(r);
        res.redirect("/celebrities");
      })
      .catch(err => console.log(err));
  });

  app.get("/edit/:id", (req, res, next) => {
    Celebrity.findById(req.params.id).then(celeb => {
      res.render("edit.hbs", { celeb });
    });
  });
  //http://localhost:3000/edit/5cc9ee3d420635faac3fd7df
  app.post("/edit/:id", (req, res, next) => {
    Celebrity.findByIdAndUpdate(req.params.id, req.body).then(ifItWOrKs => {
      res.redirect(`/details/${req.params.id}`);
    });
  });

  // route middleware to ensure user is logged in
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/login");
  }
};
