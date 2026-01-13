# Travel Guide REST API

A comprehensive REST API built with Node.js, Express.js, and TypeScript for managing flight and attraction data from Booking.com.

##  Assignment Overview

This project is part of the **W3 Engineers Ltd** assignment to build a travel guide solution with the following core functionalities:

1. **Flight Search**: Search for flights between locations (Covered only Mumbai , Dhaka , Kolkata) in this project
2. **Attraction Search**: Search for attractions within specific locations

##  Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Architecture**: MVC (Model-View-Controller)

##  Project Structure

```
.
├── src/                    # TypeScript source files
│   ├── controllers/        # Request handlers
│   ├── models/            # Database models (Prisma)
│   ├── routes/            # API routes
│   ├── middlewares/       # Custom middleware
│   └── index.ts           # Application entry point
├── dist/                  # Transpiled JavaScript files
├── prisma/
│   └── schema.prisma      # Database schema
├── .env                   # Environment variables
├── package.json
└── tsconfig.json
```

##  Database Schema

### City Model
```prisma
model City {
  id          Int          @id @default(autoincrement())
  name        String
  country     String
  flights     Flight[]
  attractions Attraction[]
  createdAt   DateTime     @default(now())
}
```

### Flight Model
```prisma
model Flight {
  id               Int      @id @default(autoincrement())
  flightName       String
  arrivalAirport   String
  departureAirport String
  arrivalTime      DateTime
  departureTime    DateTime
  flightLogo       String
  fare             Float
  cityId           Int
  city             City     @relation(fields: [cityId], references: [id], onDelete: Cascade)
  createdAt        DateTime @default(now())
}
```

### Attraction Model
```prisma
model Attraction {
  id                 Int      @id @default(autoincrement())
  attractionName     String
  attractionSlug     String   @unique
  additionalInfo     String?
  cancellationPolicy String?
  images             String
  price              Float
  whatsIncludes      String?
  country            String
  cityName           String
  cityId             Int
  city               City     @relation(fields: [cityId], references: [id], onDelete: Cascade)
  createdAt          DateTime @default(now())
}
```

##  Installation & Setup

### Prerequisites

- Node.js 
- PostgreSQL 
- npm 

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd travel-guide-api
```

### Step 2: Install Dependencies

```bash
npm install
```


### Step 3: Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

```

### Step 4: Build & Run

```bash
# Development mode with hot reload
npm run dev

# Build TypeScript
npm run build

# Production mode
npm start
```

##  API Endpoints

### 1. Search Endpoint

**GET** `/search/:locationname`

Retrieves flight and attraction information for a specific location.

**Example Request:**
```bash
GET /search/delhi
```

**Response Pattern:**
```json
{
  "GeoInfo": {
    "name": "Delhi",
    "country": "India",
    "id": 1
  },
  "Flights": [
    {
      "id": 1,
      "flightName": "Air India",
      "arrivalAirport": "DEL",
      "departureAirport": "BOM",
      "arrivalTime": "2024-01-15T10:00:00.000Z",
      "departureTime": "2024-01-15T08:00:00.000Z",
      "flightLogo": "logo-url",
      "fare": 5000
    }
  ],
  "Attractions": [
    {
      "id": 1,
      "attractionName": "Red Fort",
      "attractionSlug": "red-fort-delhi",
      "price": 500,
      "images": "image-url"
    }
  ]
}
```

### 2. Details Endpoint

**GET** `/details/:id?searchtype=flight` or `/details/:id?searchtype=attraction`

Retrieves detailed information about a specific flight or attraction.

**Example Request (Flight):**
```bash
GET /details/1?searchtype=flight
```

**Response Pattern (Flight):**
```json
{
  "GeoInfo": {
    "name": "Delhi",
    "country": "India",
    "countryCode": "IN"
  },
  "Flight": {
    "id": 1,
    "flightName": "Air India",
    "arrivalAirport": "DEL",
    "departureAirport": "BOM",
    "arrivalTime": "2024-01-15T10:00:00.000Z",
    "departureTime": "2024-01-15T08:00:00.000Z",
    "flightLogo": "logo-url",
    "fare": 5000
  }
}
```

**Example Request (Attraction):**
```bash
GET /details/1?searchtype=attraction
```

**Response Pattern (Attraction):**
```json
{
  "GeoInfo": {
    "name": "Delhi",
    "country": "India",
    "countryCode": "IN"
  },
  "Attraction": {
    "id": 1,
    "attractionName": "Red Fort",
    "attractionSlug": "red-fort-delhi",
    "additionalInfo": "Historic fort complex",
    "cancellationPolicy": "Free cancellation up to 24 hours",
    "images": "image-url",
    "price": 500,
    "whatsIncludes": "Entry ticket, Audio guide"
  }
}
```

##  Data Retrieval Process

### Flight Data Retrieval

1. Search flight location and retrieve airport ID
2. Fetch flights using the airport ID and retrieve flight token
3. Fetch flight details using the token and save to database

**Endpoint:** `GET /save/save-flight?fromId=BOM.AIRPORT&toId=DEL.AIRPORT&departDate=2026-01-15`

### Attraction Data Retrieval

1. Search location and retrieve slug lists
2. Fetch attraction details using slug lists
3. Store attraction data in database

**Endpoint:** `GET /save/save-attraction?cityName=Mumbai&country=India`

##  Features Implemented

### Core Features
-  RESTful API design
-  Flight search and retrieval
-  Attraction search and retrieval
-  Data persistence with PostgreSQL
-  MVC architecture pattern

### Bonus Features
-  TypeScript for type safety
-  Input validation
-  Database relationship management

##  Testing the API

```bash
# Search for a location
curl http://localhost:3000/search/mumbai

# Get flight details
curl http://localhost:3000/details/1?searchtype=flight

# Get attraction details
curl http://localhost:3000/details/1?searchtype=attraction
```

### Using Postman

1. Import the API collection
2. Set base URL to `http://localhost:3000`
3. Test each endpoint with sample data

##  Code Quality

- **MVC Pattern**: Strict separation of concerns
- **TypeScript**: Full type safety and interfaces
- **Comments**: Comprehensive function documentation
- **Error Handling**: Proper try-catch blocks and error middleware
- **Validation**: Input validation for all endpoints

##  Error Handling

The API includes comprehensive error handling:

- 400: Bad Request (missing parameters)
- 404: Not Found (resource doesn't exist)
- 500: Internal Server Error (server-side issues)



```bash

# using Prisma
npx prisma db pull
```




### Build for Production

```bash
npm run build
npm start
```

**Date**: January 2026
