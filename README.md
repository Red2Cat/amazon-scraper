# Amazon Scraper

Welcome to the Amazon Scraper project! This Node.js application scrapes product details from Amazon based on user-provided keywords. It fetches information such as product titles, ratings, number of reviews, and image URLs using Express, Axios, and JSDOM.

## Features

- Retrieves product information from Amazon search results.
- Simple web interface for keyword input.
- Displays results with product images, ratings, and reviews.
- Includes a loading spinner during data fetch operations.

## Prerequisites

You need Node.js and npm installed on your machine to run this project. Download and install them from [Node.js official website](https://nodejs.org/).

## Installation

Follow these steps to set up the project locally:

### Clone the Repository

```bash
git clone https://github.com/Red2Cat/amazon-scraper.git
cd amazon-scraper
```

### Install Dependencies

Run the following command in the project directory:

```bash
npm install
```
This command installs all necessary dependencies required for the project.

### Start the Server

To start the server, execute:
```bash
node server.js
```
The server will run on http://localhost:3000. Access this URL in a web browser.

### Usage

#### Access the Web Interface:
Open your browser and navigate to http://localhost:3000.

#### Enter a Search Keyword:
Type a search term in the input field and click the "Scrape" button.
The application will display a spinner while fetching data and show the results below the input field.

### Contributing

Contributions are welcome. Please fork the repository and submit a pull request with your changes.

### License

This project is licensed under the MIT License

### Disclaimer

This scraper is for educational purposes only. Please ensure you comply with Amazon's Terms of Service before using this tool.




