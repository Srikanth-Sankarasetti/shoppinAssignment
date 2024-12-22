# SHOPPIN BACK END DEVLOPMENT ASSIGNMENT

This project is a web crawler built with Node.js, Express.js, Puppeteer for web scraping, and MongoDB for storing the extracted URLs. The crawler visits web pages, extracts product URLs, and saves them to a MongoDB database.

# Features:

    Crawls websites recursively to a specified depth.
    Extracts product URLs that match specific patterns (/product/, /item/, /p/).
    Stores the extracted URLs in MongoDB.
    Handles dynamic content loading using Puppeteer.
    Rate-limiting to avoid overloading servers using Bottleneck.
    Handles error logging and retries.

# Prerequisites

    Node.js and npm installed.
    MongoDB instance running (either locally or remotely).
    Puppeteer and Bottleneck libraries for scraping.

# 1. Clone the Repository

    https://github.com/Srikanth-Sankarasetti/shoppinAssignment.git
    cd web-crawler

# 2. Install Dependencies

    Install the required Node.js packages:

# 3. Set Up MongoDB and setup in .env file

    Make sure you have a MongoDB instance running. If you're using a local MongoDB, ensure it's running on the default port (27017), or you can use a MongoDB cloud service like MongoDB Atlas.

    Create a .env file in the root directory and configure the necessary environment variables. For example:

    env
    DATABASE="Mongo db connection ulr"
    PASSWORD="Password for mangodb batabase"
    PORT="server port number"

# 5. Start the Server

    Run the following command to start the server:
    npm start (automatical start the server after modification install nodmone and nobemon server file name)

# API Endpoints

# GET /signup

    sign up the  new user , after signup you will get the respose like below

# response

    {
    "status": "successfull",
    "userCreate": {
        "name": "SrikanthS",
        "email": "srikanth@yahoo.com",
        "password": "$2b$10$4EaIX4a1pahxTVe4Tog3s.OghEf7wAQhkK94ZoFcNL.SMxyWqdi.2",
        "_id": "67679d2edc1c50ca50a31e8c",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Njc5ZDJlZGMxYzUwY2E1MGEzMWU4YyIsImlhdCI6MTczNDg0MzY5NH0.Kq1qsNm9dYgO9OIpi1pOcvMiR9uJtnHBFKZ4F3fHxik"

}

# POST /login

    login with credintials , it will provide the JWT Token , if give correct credentials

# resposne

    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjZhYTBjZjkzYjI3NjlkYjFjNzgzNCIsImlhdCI6MTczNDg0Mzc0M30.La6FCO--1bQcTA1wUSeJSkk1GPcVw_W61Z5l2VuxRXM"

}

# POST /crawl

    Crawl the provided list of domains and extract product URLs.
    {
    "domains": [
        "https://www.amazon.in",
        "https://www.flipkart.com"
    ]
    }

# response

        { Status: "Success", message: "Crawling completed." }

# GET /products

    Get all the product URLs stored in the MongoDB database.

# response

    {
    "status": "Success",
    "message": "Data successful",
    "productList": [
        {
            "_id": "6766e4bd62eb21ee22111de8",
            "domain": "https://www.flipkart.com",
            "url": [
                "/apple-iphone-16-white-128-gb/p/itm7c0281cd247be?otracker=undefined_footer",
                "https://www.flipkart.com/apple-iphone-16-plus-teal-128-gb/p/itmfa939eebe8adf?otracker=undefined_footer",
                "https://www.flipkart.com/apple-iphone-16-pro-white-titanium-128-gb/p/itm50f720fdcec51?otracker=undefined_footer",
                "https://www.flipkart.com/apple-iphone-16-pro-max-black-titanium-256-gb/p/itm7e75db4f27bd5?otracker=undefined_footer",
                "https://www.flipkart.com/redmi-note-14-pro-5g-spectre-blue-128-gb/p/itm7fa24a152cbc9?otracker=undefined_footer",
                "https://www.flipkart.com/whoop-4-0-wearable-health-fitness-activity-tracker-sleep-strain-recovery-wellness-smartwatch/p/itm85144628074bc?otracker=undefined_footer",
                "https://www.flipkart.com/oppo-find-x8-5g-space-black-512-gb/p/itm0e193d19d23ff?otracker=undefined_footer",
                "https://www.flipkart.com/nothing-phone-2a-plus/p/itm0c99b11bfe22d?otracker=undefined_footer",
                ]
        }
            ]
    }

# GET /products

    it download the all domain and it product URL's, you can save it in your local system

# How the Crawler Works

# 1. Fetch the HTML content of the page:

    We use Puppeteer to load the dynamic content of each page by launching a headless browser and fetching the page HTML.

# 2. Extract URLs:

    Once the page HTML is fetched, Puppeteer extracts all the <a> tags' href attributes. These URLs are checked against certain patterns (e.g., /product/, /item/, /p/) to identify product pages.

# 3. Store the URLs in MongoDB:

    The product URLs are stored in MongoDB in a collection. If the URL already exists for a domain, it is not added again.

# 4. Rate Limiting:

    We use Bottleneck to rate-limit the requests to avoid overwhelming the server. The minimum time between requests is set to 200ms.

# Folder Structure

SHOPPIN BACKEND ASSIGNMENT/
│
├── controllers/
│ └── authcontrollers.js # Handles the authcontrol like signup and login user
│ └── crawlwebsite.js # Handles the crawling logic
│ └── globaErrorHandle.js #handle the global errors
│ └── jwtVerification.js #handle the login user jwttoken
│ └── MycollectionData.xlsx #it have the all the UR L product in given website
│ └── Product Controller.js #it have the all the end point logics
├── models/
│ └── commerce.js # MongoDB model for storing product URLs
│ └──userModel.js #mongoDb model for stroring the user details
├── routes/
│ └── ProductRoutes.js # API route definitions
├── utils/
│ ├── catchAsyncError.js # Helper function for catching async errors
│ └── productPatternCheck.js # Helper function to check product URL patterns
├── .env # Environment variables
├── app.js #initializing the app and routes and handling global error
├── package.json # Project dependencies
└── README.md # Documentation
├── server.js # Main entry point
