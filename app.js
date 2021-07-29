
const dinos = [
  {
    species: "Triceratops",
    weight: 13000,
    height: 114,
    diet: "herbavor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "First discovered in 1889 by Othniel Charles Marsh",
  },
  {
    species: "Tyrannosaurus Rex",
    weight: 11905,
    height: 144,
    diet: "carnivor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "The largest known skull measures in at 5 feet long.",
  },
  {
    species: "Anklyosaurus",
    weight: 10500,
    height: 55,
    diet: "herbavor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "Anklyosaurus survived for approximately 135 million years.",
  },
  {
    species: "Brachiosaurus",
    weight: 70000,
    height: "372",
    diet: "herbavor",
    where: "North America",
    when: "Late Jurasic",
    fact: "An asteroid was named 9954 Brachiosaurus in 1991.",
  },
  {
    species: "Stegosaurus",
    weight: 11600,
    height: 79,
    diet: "herbavor",
    where: "North America, Europe, Asia",
    when: "Late Jurasic to Early Cretaceous",
    fact: "The Stegosaurus had between 17 and 22 seperate places and flat spines.",
  },
  {
    species: "Elasmosaurus",
    weight: 16000,
    height: 59,
    diet: "carnivor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "Elasmosaurus was a marine reptile first discovered in Kansas.",
  },
  {
    species: "Pteranodon",
    weight: 44,
    height: 20,
    diet: "carnivor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "Actually a flying reptile, the Pteranodon is not a dinosaur.",
  },
  {
    species: "Pigeon",
    weight: 0.5,
    height: 9,
    diet: "herbavor",
    where: "World Wide",
    when: "Holocene",
    fact: "All birds are living dinosaurs.",
  },
];

// Create Dino Constructor
const Animal = function (data) {
  this.species = data.species;
  this.weight = data.weight;
  this.height = data.height;
  this.diet = data.diet;
  this.where = data.where;
  this.when = data.when;
  this.fact = data.fact;
  this.name = data.name;
  this.image = `./images/${data.species.toLowerCase()}.png`;
};

// Create Dino Objects
const animalsArray = dinos.map(function (dino) {
  return new Animal(dino);
});

// Create Human Object
let human;

const createHumanObject = function (data) {
  human = new Animal(data);
};

// Use IIFE to get human data from form

function getHumanData(target) {
  return (function () {
    const data = new FormData(target);
    const res = Object.fromEntries(data.entries());
    res.height = Number(res.feet) * 12 + Number(res.inches);
    res.species = "Human";
    return res;
  })();
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareSpeciesNameLength() {
  if (this.species === "Pigeon") {
    return;
  }
  if (this.species.length < human.name.length) {
    this.fact = `Your name is longer than ${this.species}`;
  }
}
Animal.prototype.compareSpeciesNameLength = compareSpeciesNameLength;

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareHeight() {
  if (this.species === "Pigeon") {
    return;
  }
  if (this.height < human.height) {
    this.fact = `Your are ${human.height - this.height} inches taller than ${
      this.species
    }`;
  }
}
Animal.prototype.compareHeight = compareHeight;

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareWeight() {
  if (this.species === "Pigeon") {
    return;
  }
  if (this.weight < Number(human.weight)) {
    this.fact = `You are ${Number(human.weight) - this.weight} heavier than ${
      this.species
    }`;
  }
}
Animal.prototype.compareWeight = compareWeight;

// Generate Tiles for each Dino in Array
function generateTiles() {
  animalsArray.forEach(function (data) {
    const div = document.createElement("div");
    div.classList.add("grid-item");

    const title = document.createElement("h3");
    title.innerHTML = data.name ? data.name : data.species;
    div.appendChild(title);

    const image = document.createElement("img");
    image.src = data.image;
    div.appendChild(image);

    if (data.fact) {
      const fact = document.createElement("p");
      fact.innerHTML = data.fact;
      div.appendChild(fact);
    }
    // Add tiles to DOM
    const gridElement = document.getElementById("grid");
    gridElement.appendChild(div);
  });
}

// Remove form from screen
function removeForm() {
  document.querySelector("form").remove();
}

// On button click, prepare and display infographic
function handleSubmit(event) {
  event.preventDefault();

  removeForm();

  const data = getHumanData(event.target);

  createHumanObject(data);

  // Initialize animals comparison
  animalsArray.forEach(function (dino) {
    dino.compareSpeciesNameLength();
    dino.compareHeight();
    dino.compareWeight();
  });

  // Add human to the animals array
  animalsArray.splice(4, 0, human);

  generateTiles();
}

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
