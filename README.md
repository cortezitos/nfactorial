Below is a suggested README file for your project. This document provides an overview of the system, setup instructions, and usage details.

---

# Event Booking System

This project is an Event Booking System that allows users to browse events, view detailed information about each event, and book seats. The system is built using React for the frontend and Node.js with Express for the backend, with a MySQL database managing the data.

## Features

- Browse upcoming events in a grid layout.
- View detailed information about each event, including date, description, and venue.
- Book specific seats for events.
- View the number of available seats for each event in real-time.

## Requirements

- Node.js
- MySQL
- React

## Setup Instructions

### Database Setup

1. **MySQL Database:**
   - Install MySQL if not already installed.
   - Create a new database schema by running the following SQL commands:

```sql
CREATE SCHEMA factorial;
USE factorial;

CREATE TABLE EVENT(
    eventID int primary key auto_increment,
    eventName varchar(50) not null,
    eventDate date not null,
    descript varchar(200) not null,
    place varchar(50) not null
);

CREATE TABLE BOOKING(
    bookID INT PRIMARY KEY AUTO_INCREMENT,
    eventID INT NOT NULL,
    bookRow INT NOT NULL,
    bookColumn INT NOT NULL,
    FOREIGN KEY (eventID) REFERENCES EVENT(eventID)
);

INSERT INTO EVENT (eventName, eventDate, descript, place) 
VALUES ('Music Concert', '2024-05-10', 'An evening of live music', 'Concert Hall');

INSERT INTO EVENT (eventName, eventDate, descript, place) 
VALUES ('Art Exhibition', '2024-06-15', 'Discover stunning artworks', 'Art Gallery');
```

### Backend Setup

1. **Node.js Environment:**
   - Navigate to the `server` directory.
   - Run `npm install` to install dependencies.
   - Start the server using `npm start`.

### Frontend Setup

1. **React Setup:**
   - Navigate to the `client` directory.
   - Run `npm install` to install dependencies.
   - Start the React development server using `npm start`.
   - Access the application at `http://localhost:3000`.

## API Endpoints

- **GET /api/events**: Fetch all events.
- **GET /api/events/:eventId**: Fetch details of a specific event.
- **POST /api/events/:eventId/book**: Book a seat for an event.
- **GET /api/events/:eventId/booked-seats**: Get all booked seats for a specific event.
- **GET /api/events/:eventId/booked-seats-count**: Get the count of booked seats for a specific event.

## Usage

Once the application is running, you can use the web interface to browse and book events. Each event's detail page provides information and the ability to select and book seats directly.

For any issues or contributions, please refer to the repository's issues section or submit a pull request.
