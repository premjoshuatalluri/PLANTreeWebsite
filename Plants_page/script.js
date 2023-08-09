document.getElementById('search-btn').addEventListener('click', searchPlant);

function searchPlant() {
  const searchQuery = document.getElementById('search-input').value;
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
