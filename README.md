# WhatsDown - Social Media App

![WhatsDown Logo](path_to_logo_image)

WhatsDown is a social media application built with React and JavaScript for the frontend, and Express, MongoDB, and Node.js for the backend. It also includes real-time chat functionality powered by Socket.io.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

WhatsDown is a comprehensive social media platform that allows users to add posts, add friends, view friends' posts, and engage in real-time chat. It aims to provide a seamless and interactive social experience.

## Features

- **Add Posts**: Users can create and share posts with their friends.
- **Add Friends**: Users can add other users as friends to build their social network.
- **View Friends' Posts**: Users can view posts created by their friends.
- **Real-Time Chat**: Users can engage in real-time conversations with their friends using the integrated chat feature.

## Tech Stack

### Frontend

- **Framework**: React
- **Language**: JavaScript

### Backend

- **Framework**: Express
- **Database**: MongoDB
- **Runtime**: Node.js
- **Real-Time Communication**: Socket.io

## Installation

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn (v1.x or later)
- MongoDB

### Frontend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your_username/whatsdown-frontend.git
   ```
2. Navigate to the frontend directory:
   ```sh
   cd whatsdown-frontend
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your_username/whatsdown-backend.git
   ```
2. Navigate to the backend directory:
   ```sh
   cd whatsdown-backend
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```
4. Create a `.env` file in the backend directory and add the following environment variables:
   ```env
   MONGODB_CONNECTION=your_mongodb_uri
   PORT=5000
   JWTKEY=KEY
   ```

## Usage

### Starting the Frontend

1. Navigate to the frontend directory:
   ```sh
   cd whatsdown-frontend
   ```
2. Start the frontend development server:
   ```sh
   npm start
   ```
   or
   ```sh
   yarn start
   ```

### Starting the Backend

1. Navigate to the backend directory:
   ```sh
   cd whatsdown-backend
   ```
2. Start the backend server:
   ```sh
   npm start
   ```
   or
   ```sh
   yarn start
   ```

### Running Both Frontend and Backend

Ensure that both the frontend and backend servers are running simultaneously. Open [http://localhost:3000](http://localhost:3000) in your browser to use the application.

## Contributing

Contributions are what make the open-source community such an amazing place to be, learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Stephanie C. Okpo-Mfon - [@stephaniecrispin](https://www.instagram.com/stephaniecrispin/) - stephaniemfon@gmail.com

Project Link: [https://github.com/StephanieCrispin/WhatsDown.git](https://github.com/StephanieCrispin/WhatsDown.git)
