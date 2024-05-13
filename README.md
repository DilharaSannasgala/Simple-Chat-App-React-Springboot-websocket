# Simple Chat App (React + Spring Boot WebSocket)

This project is a simple real-time chat application using Spring Boot WebSocket for the backend and React for the frontend.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js and npm](https://nodejs.org/)
- [Java JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Maven](https://maven.apache.org/download.cgi)

## Getting Started

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd path/to/backend
   ```

2. **Build and run the Spring Boot application:**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   The backend server will start on `http://localhost:8080`.

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd path/to/frontend
   ```

2. **Install the necessary packages:**
   ```bash
   npm install
   npm install sockjs-client stompjs @mui/material @emotion/react @emotion/styled
   ```

3. **Start the React application:**
   ```bash
   npm start
   ```

   The React app will be available at `http://localhost:3000`.

## Features

- Real-time messaging using WebSocket.
- Simple user interface to send and receive messages.
- Connection management and display of connection status.
