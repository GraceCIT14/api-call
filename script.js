const baseUrl = "https://foodish-api.com/api";
const imgElement = document.getElementById("food-image");
const errorMessage = document.getElementById("error-message");

let images = [];   // Array to store images
let currentIndex = -1;  // Index for current image

// Function to fetch a random image that matches the selected category
function fetchFoodImage() {
  const cuisine = document.getElementById("cuisine-select").value;

  // Show loading message while fetching
  errorMessage.textContent = "Loading image...";

  // Function to get a random image that matches the category
  function getRandomImage() {
    fetch(`${baseUrl}/`)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        const imageUrl = data.image;

        // Check if the URL includes the selected category
        if (cuisine === "" || imageUrl.includes(cuisine)) {
          images.push(imageUrl); // Add the image to the array
          currentIndex = images.length - 1; // Update current index to the last image
          displayImage(); // Show the image
        } else {
          // Retry if category doesn't match
          getRandomImage();
        }
      })
      .catch(error => {
        errorMessage.textContent = `Error loading image: ${error.message}`;
        console.error("Fetch error:", error);
      });
  }

  getRandomImage(); // Start fetching
}

// Function to display the current image based on currentIndex
function displayImage() {
  if (images.length > 0 && currentIndex >= 0 && currentIndex < images.length) {
    imgElement.src = images[currentIndex];
    errorMessage.textContent = "";  // Clear error/loading message
  } else {
    errorMessage.textContent = "No images available.";
  }
}

// Event listeners for buttons
document.getElementById("fetch-food-btn").addEventListener("click", fetchFoodImage);

document.getElementById("next-btn").addEventListener("click", () => {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    displayImage();
  } else {
    fetchFoodImage();  // Fetch new image if at the end of the array
  }
});

document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    displayImage();
  }
});

// Initial fetch on page load
fetchFoodImage();
