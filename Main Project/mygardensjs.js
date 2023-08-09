// Sample data for the garden grid
const initialPlants = [
  { name: 'Carrot', position: { row: 1, column: 2 } },
  { name: 'Tomato', position: { row: 2, column: 3 } },
  // Add more initial plant data as needed
];

// Function to add a plant to the garden grid
function addPlant() {
  const selectedPlant = document.getElementById('plantSelect').value;
  // Add the selected plant to the garden grid at the specified position
  // (You can use the selectedPlant and position data to create a new DOM element and append it to the garden grid)
}

// Function to rotate crops in the garden grid
function rotateCrops() {
  // Implement the logic to rotate crops (e.g., change their positions) in the garden grid
}

// Function to initialize the garden grid with initialPlants
function initializeGardenGrid() {
  const gardenGrid = document.getElementById('gardenGrid');
  // Loop through the initialPlants data and create DOM elements for each plant
  // Append the created elements to the garden grid
}

// Event listeners for buttons
document.getElementById('addPlantBtn').addEventListener('click', addPlant);
document.getElementById('rotateCropsBtn').addEventListener('click', rotateCrops);

// Initialize the garden grid on page load
initializeGardenGrid();
// ... (Previous JavaScript code remains unchanged) ...

// Function to handle clicks on empty spaces within the garden grid
function handleGridClick(event) {
  const selectedPlant = document.getElementById('plantSelect').value;
  if (!selectedPlant) return; // No plant selected, do nothing

  const emptySpace = event.target;
  if (emptySpace.classList.contains('garden-grid')) return; // Clicked outside the plants area, do nothing

  if (emptySpace.childElementCount === 0) {
      // If the clicked empty space does not contain any plant, add the selected plant image
      const plantImage = document.createElement('img');
      plantImage.src = `path/to/${selectedPlant}.png`; // Replace with the path to the plant image
      plantImage.alt = selectedPlant;
      emptySpace.appendChild(plantImage);
  } else {
      // If the clicked empty space already contains a plant, replace it with the new selected plant image
      emptySpace.firstElementChild.src = `path/to/${selectedPlant}.png`; // Replace with the path to the plant image
      emptySpace.firstElementChild.alt = selectedPlant;
  }
}

// Add event listener to handle clicks on empty spaces within the garden grid
document.getElementById('gardenGrid').addEventListener('click', handleGridClick);
