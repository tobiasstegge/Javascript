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
  this.factDisplayed = undefined;
  }

// select random fact
generateFact(human) {
  var randomNumber = Math.floor(Math.random() * 6);
  console.log("random Number: " + randomNumber)
  switch(randomNumber) {
  case 0:
      if (this.weight > human.weight) {
        this.factDisplayed = `This Dino is heavier than you`
      }
      else {
        this.factDisplayed = `This Dino is ligther than you`
      }
    break;
  case 1: 
      if (this.height > human.feet) {
        this.factDisplayed = `This Dino is ${this.height - human.feet} feet smaller than you`;
      }
      else {
        this.factDisplayed = `his Dino is ${human.feet - this.height} feet smaller than you`;
      }
      break;
  case 2: 
      if (this.weight > human.weight) {
        this.factDisplayed = "This Dino is heavier than you";
      }
      else {
        this.factDisplayed = "This Dino is lighter than you";
      }
      break;
  case 3: 
      this.factDisplayed = `The species of this dinosaur is ${this.species}!`;
      break;
  case 4: 
    this.factDisplayed = `This dinausaur was living in the ${this.when}!`;
      break;
  case 5: 
    this.factDisplayed = this.fact;
      break;
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

// sourced from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
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

// Prepare and display infographic on button click
document.getElementById("btn").onclick = async function() {
  human = getHumanData();
  dinos = await getDinoData();

  dinos.forEach(dino => dino.generateFact(human))
  console.log(dinos);
  tiles = shuffle(dinos);
  tiles.splice(4, 0, human); // add human tile in the middle
  changeContent(tiles) // update view
  }

// edit DOM
function changeContent(tiles) {
  document.getElementById("dino-compare").classList.toggle("remove");

  grid = document.getElementById("grid");

  function createTileItem(tile) {
    let div = document.createElement('div');
    div.classList = "grid-item";
    
    let imagePath;
    let species;
    let factDisplayed;

    if (tile.species !== undefined) {
      imagePath = "./images/" + String(tile.species).toLowerCase() + ".png";
      species = tile.species;
      factDisplayed = tile.factDisplayed;
    }
    else {
      species = tile.name;
      imagePath = tile.image;
      factDisplayed = ""; 
    }

    div.innerHTML = `
    <h3>${species}</h3>
    <img src="${imagePath}">
    <p>${factDisplayed}</p> `;

    return div;
  }

  tiles.forEach(tile => {
    grid.appendChild(createTileItem(tile));
  }) 
}

