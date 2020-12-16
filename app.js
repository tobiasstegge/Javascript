
// Create Dino Class
class Dino {
  constructor(species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height; 
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
  }

  generateFact(human) {
    // select random fact
    var randomNumber = Math.floor(Math.random() * 3);
    console.log("random Number: " + randomNumber)
    switch(randomNumber) {
      case 0: {
        if (this.weight > human.weight) {
          return `This Dino is heavier than you`
        }
        else {
          return `This Dino is ligther than you`
        }
      }
      case 1: {
        if (this.height > human.feet) {
          return `This Dino is ${this.height - human.feet} feet smaller than you`;
        }
        else {
          return `his Dino is ${human.feet - this.height} feet smaller than you`;
        }
      }
      case 2: {
        if (this.weight > human.weight) {
          return "This Dino is heavier than you";
        }
        else {
          return "This Dino is lighter than you";
        }
      }
    }
  }
} 

// Create Human Class
class Human {
  constructor(name, feet, inches, weight, diet, image) {
  this.name = name, 
  this.feet = feet,
  this.height = inches,
  this.weight = weight,
  this.diet = diet,
  this.image = image;
  }
}

// Get Dino Data From JSON
const getDinoData = (e) => { 
  return fetch("./dino.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data.Dinos.map(dino => new Dino(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact))
    })
};

// Create Human Object
const getHumanData = (function () {
  let name = document.getElementById("name").value; 
  let feet = document.getElementById("feet").value; 
  let inches = document.getElementById("inches").value; 
  let weight = document.getElementById("weight").value; 
  let diet = document.getElementById("diet").value;
  let image = "images/human.png";

  return new Human(name, feet, inches, weight, diet, image);
})


    // Use IIFE to get human data from form


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// Prepare and display infographic on button click
document.getElementById("btn").onclick = function() {
  human = getHumanData();
  console.log(human);

  getDinoData().then((dinos) => {
    console.log(dinos.length)
    dinos.forEach(dino => {
      console.log(dino.generateFact(human))
    });
  })

  changeContent()

};

function changeContent() {
  document.getElementById("dino-compare").classList.toggle("remove");

  grid = document.getElementById("grid");

  function createTileItem() {
    let tile = document.createElement("div"); 

    let content = document.createElement("p");
    content.textContent = "Test";

    tile.appendChild(content);
    tile.classList.add("grid-item");

    return tile;
  }

  var i = 0;
  while (i < 9) {
    grid.appendChild(createTileItem());
    console.log(grid);
    i++;
  }

}



