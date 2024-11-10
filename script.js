const baseUrl = "https://foodish-api.com/api";
const imgElement = document.getElementById("food-image");
const errorMessage = document.getElementById("error-message");

let images = [];   
let currentIndex = -1;  


function fetchFoodImage() {
  const cuisine = document.getElementById("cuisine-select").value;

  
  errorMessage.textContent = "Loading image...";

  
  function getRandomImage() {
    fetch(`${baseUrl}/`)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        const imageUrl = data.image;

        
        if (cuisine === "" || imageUrl.includes(cuisine)) {
          images.push(imageUrl); 
          currentIndex = images.length - 1; 
          displayImage(); 
        } else { 
          
          getRandomImage();
        }
      })
      .catch(error => {
        errorMessage.textContent = `Error loading image: ${error.message}`;
        console.error("Fetch error:", error);
      });
  }

  getRandomImage(); 
}


function displayImage() {
  if (images.length > 0 && currentIndex >= 0 && currentIndex < images.length) {
    imgElement.src = images[currentIndex];
    errorMessage.textContent = "";  
  } else {
    errorMessage.textContent = "No images available.";
  }
}


document.getElementById("fetch-food-btn").addEventListener("click", fetchFoodImage);

document.getElementById("next-btn").addEventListener("click", () => {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    displayImage();
  } else {
    fetchFoodImage();  
  }
});

document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    displayImage();
  }
});

fetchFoodImage();
