# Building-Energy-Analysis-System

## File structue

Building-Energy-Analysis-System/
│
├── backend/                  # Backend folder (API and server-related code)
│   ├── controllers/          # Controller files for handling requests
│   ├── models/               # Mongoose models for the database
│   ├── routes/               # API route files
│   ├── validators/           # Validator files for validating data before processing
│   ├── utils/                # Utility files for helper functions
│   ├── config/               # Configuration files (e.g., database, server)
│   ├── server.js             # Main server file to start the backend server
│   └── .env                  # Environment variables for the backend
│
├── frontend/                 # Frontend folder (React app)
│   ├── public/               # Static assets (images, icons, etc.)
│   ├── src/                  # React app source code
│   │   ├── components/       # Reusable components (buttons, forms, etc.)
│   │   ├── pages/            # Page components (Home, Dashboard, etc.)
│   │   ├── App.js            # Main app component
│   │   ├── index.js          # Entry point for the React app
│   │   └── ...               # Other React-related files
│   ├── package.json          # Frontend package dependencies and scripts
│   └── .env                  # Environment variables for the frontend
│
├── README.md                 # Project documentation
└── package.json              # Root package.json with project metadata


## API Documentation

## Design
1. GET /api/designs
Description: Retrieve all design records.
Response:
[
    {
        "_id": "design_id",
        "name": "Design Name",
        "city": "City Name",
        "facades": [
            {
                "facadeDirection": "north",
                "height": 10,
                "width": 5,
                "wwr": 0.6,
                "shgc": 0.3,
                "duration": 8
            }
        ],
        "analysis": [
            {
                "facadeDirection": "north",
                "Q": 15,
                "coolingCost": 200
            }
        ],
        "createdAt": "2025-03-07T12:00:00Z",
        "updatedAt": "2025-03-07T12:00:00Z"
    }
]
2. POST /api/designs
Description: Add a new design record to the system.
Request Body:

{
    "name": "Design Name",
    "city": "Bangalore",
    "facades": [
        {
            "facadeDirection": "north",
            "height": 10,
            "width": 5,
            "wwr": 0.6,
            "shgc": 0.3,
            "duration": 8
        }
    ]
}
Response:
{
    "_id": "new_design_id",
    "name": "Design Name",
    "city": "Bangalore",
    "facades": [
        {
            "facadeDirection": "north",
            "height": 10,
            "width": 5,
            "wwr": 0.6,
            "shgc": 0.3,
            "duration": 8
        }
    ],
    "analysis": [],
    "createdAt": "2025-03-07T12:00:00Z",
    "updatedAt": "2025-03-07T12:00:00Z"
}
3. PUT /api/designs/:id
Description: Update an existing design by ID.
Request Params:
id: The ID of the design to update.
Request Body:

{
    "name": "Updated Design Name",
}
Response:
{
    "_id": "design_id",
    "name": "Updated Design Name",
    "city": "Delhi",
    "facades": [
        {
            "facadeDirection": "south",
            "height": 12,
            "width": 6,
            "wwr": 0.5,
            "shgc": 0.4,
            "duration": 10
        }
    ],
    "analysis": [],
    "createdAt": "2025-03-07T12:00:00Z",
    "updatedAt": "2025-03-07T12:00:00Z"
}

4. DELETE /api/designs/:id
Description: Delete a design by ID.
Request Params:
id: The ID of the design to delete.

{
    "message": "Design deleted successfully"
}


## Analysis
1. POST /api/analysis/calculate

Request Body:

{
    "designId": "design-id",
    "facades": [
        {
            "facadeDirection": "north",
            "height": 15,
            "width": 7,
            "wwr": 0.65,
            "shgc": 0.35,
            "duration": 10
        },
        {
            "facadeDirection": "east",
            "height": 12,
            "width": 8,
            "wwr": 0.70,
            "shgc": 0.30,
            "duration": 12
        }
    ]
}
Response:

{
    "message": "Analysis calculated successfully",
    "analysis": [
        {
            "facadeDirection": "north",
            "Q": 50,
            "coolingCost": 200
        },
        {
            "facadeDirection": "east",
            "Q": 40,
            "coolingCost": 150
        }
    ]
}

2. GET /api/analysis/compare
Request:

GET /api/analysis/compare?designIds=12345abc,67890xyz

Response:
[
        {
            "designId": "12345abc",
            "name": "Modern Residential Design",
            "analysis": [
                {
                    "facadeDirection": "north",
                    "Q": 50,
                    "coolingCost": 200
                },
                {
                    "facadeDirection": "east",
                    "Q": 40,
                    "coolingCost": 150
                }
            ]
        },
        {
            "designId": "67890xyz",
            "name": "Eco-Friendly Design",
            "analysis": [
                {
                    "facadeDirection": "north",
                    "Q": 45,
                    "coolingCost": 180
                },
                {
                    "facadeDirection": "east",
                    "Q": 35,
                    "coolingCost": 120
                }
            ]
        }
    ]

3. GET /api/analysis/cities
This endpoint provides the city-wise rankings based on the analysis results for designs.

Response:


{
    "citiesRanking": [
        {
            "city": "Bangalore",
            "averageCoolingCost": 150
        },
        {
            "city": "Mumbai",
            "averageCoolingCost": 180
        },
        {
            "city": "Kolkata",
            "averageCoolingCost": 160
        },
        {
            "city": "Delhi",
            "averageCoolingCost": 170
        }
    ]
}

## Error Handling
400 Bad Request:
{
    "error": "Invalid data"
}

404 Not Found:
{
    "error": "Resource not found"
}

500 Internal Server Error:
{
    "error": "Something went wrong"
}