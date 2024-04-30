// Function to handle the fetching and displaying of Amazon product data
function fetchData() {
    // Get the keyword from the input field
    const keyword = document.getElementById('keyword').value;
    
    // Check if the keyword is not empty
    if (keyword) {
        // Retrieve the overlay element and display it (to show the loading spinner)
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'flex'; // Show overlay with spinner

        // Make an HTTP GET request to the server's /api/scrape endpoint with the keyword
        fetch(`/api/scrape?keyword=${encodeURIComponent(keyword)}`)
            .then(response => response.json()) // Parse the JSON response from the server
            .then(data => {
                // Hide the overlay and spinner once the data is received
                overlay.style.display = 'none'; 

                // Get the results div to display the products
                const results = document.getElementById('results');

                // Map over the array of products and create HTML content for each product
                results.innerHTML = data.map(product => `
                    <li class="product-item">
                        <h2 class="product-title">${product.title}</h2>
                        <div class="product-image-container">
                            <img class="product-image" src="${product.imageUrl}" alt="${product.title}">
                        </div>
                        <div class="product-details">
                            <span class="product-rating">Rating: ${product.rating} stars</span>
                            <span class="product-reviews">Reviews: ${product.reviews}</span>
                        </div>
                    </li>
                `).join(''); // Join the array elements into a single string to set as HTML
            })
            .catch(error => {
                // If an error occurs during fetching, hide the overlay and log the error
                overlay.style.display = 'none';
                console.error('Error fetching data:', error);
                // Display an error message in the results div
                results.innerHTML = `<p>Error fetching data. Please try again.</p>`;
            });
    } else {
        // If the keyword input is empty, alert the user to enter a keyword
        alert('Please enter a keyword to search.');
    }
}
