function searchPlant() {
  const searchQuery = document.getElementById('search').value;
  const url = `http://localhost:3000/search?q=${searchQuery}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const plants = data.data;

      if (!plants || plants.length === 0) {
        document.getElementById("content").innerHTML = '<p>No results found.</p>';
        return;
      }

      let contentHtml = '';
      plants.forEach(plant => {
        const commonName = plant.common_name || 'Unknown';
        const imageUrl = plant.image_url || '';
        contentHtml += `
          <div class="result">
            ${imageUrl ? `<img src="${imageUrl}" alt="${commonName}" style="max-width: 100%; max-height: 100px;">` : '<p>No image available.</p>'}
            <span class="name" style="font-size: 12px; display: block; text-align: center;">${commonName}</span>
            <button class="add-plant-btn" onclick="addPlantToServer('${commonName}', ${currentBoxIndex})">Add Plant</button>
          </div>
        `;
      });

      document.getElementById("content").innerHTML = contentHtml;
    })
    .catch(error => {
      console.error('Error fetching the plant data:', error);
      document.getElementById("content").innerHTML = 'Sorry, something went wrong. Please try again later.';
    });
}

let currentBoxIndex = 0;

function addPlant(commonName) {
  if (currentBoxIndex >= 10) {
    alert('You have reached the limit of 10 plants.');
    return;
  }

  const boxes = document.querySelectorAll('.box-container .box');
  if (boxes && boxes.length > currentBoxIndex) {
    const box = boxes[currentBoxIndex];
    box.textContent = commonName; // Updating the text
    box.style.backgroundImage = "url('nature (1).png')"; // Updating the background image
    currentBoxIndex++; 
  }
}

function addPlantToServer(commonName, boxIndex) {
  addPlant(commonName); // Add plant to the UI

  // Retrieve the username from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');
  const garden_id = urlParams.get('garden_id');

  // Send the plant data to the server
  const body = `common_name=${commonName}&box_index=${boxIndex}&username=${username}&garden_id=${garden_id}`;
  fetch('save_plants.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body,
  })
  .then(response => response.json())
  .then(data => {
    if (!data.success) {
      alert('An error occurred while saving the plant.');
    }
  })
  .catch(error => {
    console.error('Error saving the plant:', error);
  });
}

function resetSearch() {
  currentBoxIndex = 0;
  searchPlant(); 
}
function loadSavedPlants() {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');
  const garden_id = urlParams.get('garden_id');
  const url = `get_plants.php?username=${username}&garden_id=${garden_id}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const plants = data.data;

      plants.forEach((plant, index) => {
        addPlant(plant.common_name); // Add plant to the UI
      });
    })
    .catch(error => {
      console.error('Error fetching saved plants:', error);
    });
}

window.onload = function() {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username') || "Guest";
  const garden_id = urlParams.get('garden_id') || "DefaultUserId";
  const gardenName = urlParams.get('garden_name') || "My Garden";

  // Add an event listener to the left-section
  const leftSectionElement = document.querySelector('.left-section');
  leftSectionElement.addEventListener('click', function() {
    window.location.href = `/add_plants/gardenpage/index.html?username=${username}&garden_id=${garden_id}&garden_name=${gardenName}`;
  });
  loadSavedPlants();
};
