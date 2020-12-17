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

  compareHeight(human) {
    if (this.height > human.feet) {
      this.factDisplayed = `This Dino is ${
        this.height - human.feet
      } feet smaller than you`;
    } else {
      this.factDisplayed = `his Dino is ${
        human.feet - this.height
      } feet smaller than you`;
    }
  }

  compareWeight(human) {
    if (this.weight > human.weight) {
      this.factDisplayed = `This Dino is heavier than you`;
    } else {
      this.factDisplayed = `This Dino is ligther than you`;
    }
  }

  compareDiet(human) {
    if (this.diet === human.diet) {
      this.factDisplayed = `This Dino is eating just like you`;
    } else {
      this.factDisplayed = `This Dino is not eating like you`;
    }
  }

  // select random fact
  generateFact(human) {
    const randomNumber = Math.floor(Math.random() * 6);

    switch (randomNumber) {
      case 0:
        this.compareWeight(human);
        break;
      case 1:
        this.compareDiet(human);
        break;
      case 2:
        this.compareHeight(human);
        break;
      case 3:
        this.factDisplayed = `The species of this dinosaur is ${this.species}!`;
        break;
      case 4:
        this.factDisplayed = `This dinausaur was living in the ${this.when}!`;
        break;
      default:
        this.factDisplayed = this.fact;
        break;
    }
  }
}

// Create Human Class
class Human {
  constructor(name, feet, inches, weight, diet, image) {
    (this.name = name),
      (this.feet = feet),
      (this.height = inches),
      (this.weight = weight),
      (this.diet = diet),
      (this.image = image);
  }
}

// sourced from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

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
      return data.Dinos.map(
        (dino) =>
          new Dino(
            dino.species,
            dino.weight,
            dino.height,
            dino.diet,
            dino.where,
            dino.when,
            dino.fact
          )
      );
    });
};

// Create Human Object
const getHumanData = function () {
  const name = document.getElementById("name").value;
  const feet = document.getElementById("feet").value;
  const inches = document.getElementById("inches").value;
  const weight = document.getElementById("weight").value;
  const diet = document.getElementById("diet").value;
  const image = "images/human.png";

  return new Human(name, feet, inches, weight, diet, image);
};

// Prepare and display infographic on button click
document.getElementById("btn").onclick = async function () {
  const human = getHumanData();
  const dinos = await getDinoData();

  dinos.forEach((dino) => {
    if (dino.species !== "Pigeon") {
      dino.generateFact(human);
    } else {
      dino.factDisplayed = dino.fact;
    }
  });

  tiles = shuffle(dinos);
  tiles.splice(4, 0, human); // add human tile in the middle
  changeContent(tiles); // update view
};

// edit DOM
function changeContent(tiles) {
  document.getElementById("dino-compare").classList.toggle("remove");

  const grid = document.getElementById("grid");

  function createTileItem(tile) {
    const div = document.createElement("div");
    div.classList = "grid-item";

    let imagePath;
    let species;
    let factDisplayed;

    if (tile.species !== undefined) {
      imagePath = "./images/" + String(tile.species).toLowerCase() + ".png";
      species = tile.species;
      factDisplayed = tile.factDisplayed;
    } else {
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

  tiles.forEach((tile) => {
    grid.appendChild(createTileItem(tile));
  });
}
