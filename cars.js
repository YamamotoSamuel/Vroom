let cars = [
    {
      name: "Sedan",
      safety: ["3", "4"],
      economics: "MPG",
      seating: ["Just me or +1", "2-4 passengers"],
      problems: "Cant find a parking spot because my car is too big",
      cargo: "No",
      score: 0,
      images: ['images/sedan1.png','images/sedan2.png','images/sedan3.png' ],
      image: 'images/sedan1.png'

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
      score: 0,
      images: ['images/coupe1.png','images/coupe5.png','images/coupe4.png' ],
      image: 'images/coupe1.webp'
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
      score: 0,
      images: ['/images/hatch1.png','/images/hatch2.webp','/images/hatch3.webp' ],
      image: '/images/hatch1.png'

    },
    {
      name: "SUV or Crossover",
      safety: ["4", "5"],
      economics: "MPG",
      seating: "2-4 passengers",
      problems: "Cant fit all my gear in my trunk",
      cargo: "Yes",
      score: 0,
      images: ['images/suv1.png','images/suv2.png','images/suv3.webp' ],
      image: 'images/suv1.png'

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
      score: 0,
      images: ['images/van1.png','images/van2.webp','images/van3.png' ],
      image: 'images/van1.png'

    },
    {
      name: "Truck",
      safety: ["4", "5"],
      economics: "Horsepower",
      seating: ["Just me or +1", "2-4"],
      problems: "Cant fit all my gear in my trunk",
      cargo: "Yes",
      score: 0,
      images: ['images/truck1.png','images/truck2.webp','images/truck3.png' ],
      image: 'images/truck1.png'

    }
  ];

  module.exports = cars; 