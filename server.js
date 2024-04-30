// Import required modules
const express = require('express');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const path = require('path'); // Make sure to include this to use 'path.join'

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000; // Use environment-defined port or 3000 if not defined

// Serve static files from the 'public' directory, making them accessible from the root URL
app.use(express.static('public'));

// Route to serve the index.html file when accessing the root URL
app.get('/', function(req, res) {
    // Log to console whenever the root URL is accessed
    console.log('Received request for keyword:', req.query.keyword); // This seems misplaced as '/' route typically doesn't involve keyword querying
    // Send the index.html file to the client
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// API route to perform the scraping action
app.get('/api/scrape', async (req, res) => {
    const { keyword } = req.query; // Extract the keyword from query parameters
    // Validate the presence of 'keyword' in the query
    if (!keyword) {
        return res.status(400).json({ error: 'Keyword is required' });
    }

    try {
        // Log successful scraping initiation
        console.log('Scraping completed successfully.');
        
        // Perform the HTTP GET request to Amazon with a custom User-Agent to mimic a web browser
        const response = await axios.get(`https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });
        
        // Parse the HTML response using JSDOM
        const dom = new JSDOM(response.data);
        const document = dom.window.document;
        
        // Extract product details from the document
        const products = Array.from(document.querySelectorAll('.s-result-item')).map(el => {
            const titleEl = el.querySelector('h2 a span');
            const ratingEl = el.querySelector('.a-icon-alt');
            const reviewsEl = el.querySelector('.a-size-small .a-size-base, .a-size-mini .a-size-base');
            const imageUrlEl = el.querySelector('.s-image');

            // Check if all elements exist before creating the product object
            if (titleEl && ratingEl && reviewsEl && imageUrlEl) {
                const title = titleEl.textContent;
                const rating = ratingEl.textContent.match(/(\d+(\.\d+)?)/)?.[0] || 'No rating';
                const reviews = reviewsEl.textContent.replace(/[^\d]/g, '');
                const imageUrl = imageUrlEl.src;

                return { title, rating, reviews, imageUrl };
            }

            return null;
        }).filter(Boolean); // Remove any null entries from the array, i.e., skip incomplete data

        // Send the array of products back to the client as JSON
        res.json(products);
    } catch (error) {
        // Log error and send a 500 Internal Server error response if scraping fails
        console.error('Error during scraping:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Start the server on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
