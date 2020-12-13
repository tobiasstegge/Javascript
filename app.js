
    // Create Dino Constructor


    // Create Dino Objects


    // Create Human Object

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


// On button click, prepare and display infographic

document.getElementById("btn").onclick = function() {changeContent()};

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
    console.log("Hallo")
    grid.appendChild(createTileItem());
    console.log(grid);
    i++;
  }

}



