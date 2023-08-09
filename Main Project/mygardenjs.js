const gardenLayout = document.getElementById("gardenLayout");
const ROWS = 2; // Number of rows in the garden layout
const COLUMNS = 14; // Number of columns in the garden layout
let selectedPlantNames = new Array(ROWS * COLUMNS).fill("1"); // Initialize with "1"

// Dummy plant data for demonstration purposes
const dummyPlants = [
  { name: "Rose", image: "images/rose.jpeg" },
  { name: "Tulip", image: "https://example.com/tulip.jpg" },
  { name: "Sunflower", image: "https://example.com/sunflower.jpg" },
  { name: "Lavender", image: "https://example.com/lavender.jpg" },
  { name: "Daisy", image: "https://example.com/daisy.jpg" },
  { name: "Lily", image: "https://example.com/lily.jpg" }
];

// Function to navigate to the search box when clicking the garden layout
function navigateToSearchBox(event) {
  const target = event.target;
  if (target === gardenLayout) {
    document.getElementById("searchBox").scrollIntoView({ behavior: "smooth" });
  }
}

// Function to create the plant item element with image, name, quantity box, and add button
function createPlantItem(plant) {
  const plantItem = document.createElement("div");
  plantItem.className = "plant-item";

  const plantImage = document.createElement("img");
  plantImage.src = plant.image;
  plantImage.alt = plant.name;
  plantImage.className = "plant-image";

  const plantDetails = document.createElement("div");
  plantDetails.className = "plant-details";

  const plantName = document.createElement("h3");
  plantName.textContent = plant.name;

  const quantityBox = document.createElement("input");
  quantityBox.type = "number";
  quantityBox.min = "1";
  quantityBox.value = "1";
  quantityBox.className = "quantity-box";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Plant";
  addButton.className = "add-button";
  addButton.onclick = function () {
    addPlantToLayout(plant.name, Number(quantityBox.value));
  };

  plantDetails.appendChild(plantName);
  plantDetails.appendChild(quantityBox);
  plantDetails.appendChild(addButton);

  plantItem.appendChild(plantImage);
  plantItem.appendChild(plantDetails);

  return plantItem;
}

// Function to search for plants and display results in the plant list
function searchPlant() {
  const searchInput = document.querySelector(".search-box input");
  const searchTerm = searchInput.value.trim().toLowerCase();
  const plantList = document.getElementById("plantList");
  plantList.innerHTML = "";

  if (!searchTerm) return;

  // Filter the dummyPlants based on the search term
  const filteredPlants = dummyPlants.filter(plant => plant.name.toLowerCase().includes(searchTerm));

  if (filteredPlants.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent = "No results found.";
    plantList.appendChild(noResultsMessage);
  } else {
    filteredPlants.forEach(plant => {
      const plantItem = createPlantItem(plant);
      plantList.appendChild(plantItem);
    });
  }

  searchInput.value = "";
}

function addPlantToLayout(plantName, quantity) {
  const emptySpaces = document.querySelectorAll(".selected-space");

  let availableEmptySpaces = [];

  emptySpaces.forEach((emptySpace, index) => {
    if (emptySpace.textContent !== "x") {
      availableEmptySpaces.push(index);
    }
  });

  if (availableEmptySpaces.length < quantity) {
    alert("Not enough empty spaces to add this quantity of plants.");
    return;
  }

  let updated = 0; // Variable to keep track of the number of spaces updated
  for (let i = 0; i < availableEmptySpaces.length && updated < quantity; i++) {
    const emptySpaceIndex = availableEmptySpaces[i];
    emptySpaces[emptySpaceIndex].textContent = "x";
    selectedPlantNames[emptySpaceIndex] = plantName;
    updated++;
  }

  updatePlantNames();
}

function updatePlantNames() {
  const plantNamesDisplay = document.getElementById("plantNamesDisplay");
  const plantNameQuantities = {};

  selectedPlantNames.forEach(name => {
    if (name !== "1") {
      plantNameQuantities[name] = (plantNameQuantities[name] || 0) + 1;
    }
  });

  const uniquePlantNames = Object.keys(plantNameQuantities);
  const displayText = uniquePlantNames.map(name => `${name} x${plantNameQuantities[name]}`).join(", ");
  plantNamesDisplay.textContent = displayText;
}

// Highlight search box when clicking an empty space inside the box
gardenLayout.addEventListener("click", function (event) {
  const target = event.target;
  if (target === gardenLayout) {
    document.querySelector(".search-box input").focus();
  }
});
