# Multiplayer Grid Application

A real-time multiplayer application where players interact with a 10x10 grid. Players can select a block, add a Unicode character, and view a history of updates. The grid state and player count are updated in real-time for all connected users.

## Features

- **Real-Time Grid Updates**: The grid is shared among all players and updated in real-time.
- **Player Count**: Displays the number of players currently online.
- **Update History**: View the history of updates made to the grid, including row, column, character, and timestamp.
- **Grouped Updates**: Batches updates made within 1 second and broadcasts them to all players.
- **1-Minute Restriction**: Players cannot update the grid for 1 minute after making a move.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **WebSocket Communication**: Socket.IO
- **Styling**: CSS

## Prerequisites

Ensure the following are installed on your system:

- Node.js
- npm or yarn

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/Dibyendu-13/multiplayer-grid-app.git
cd multiplayer-grid-app
```

### Backend Setup

1. Navigate to the backend folder or create a `server.js` file in the root directory.
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   node server.js
   ```
   The server will run on [http://localhost:4000](http://localhost:4000).

### Frontend Setup

1. Navigate to the frontend folder or ensure the `Grid.js` component is in place.
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   The app will run on [http://localhost:3000](http://localhost:3000).

## How to Play

1. Open the application in your browser.
2. View the number of online players.
3. Click a grid block to add a Unicode character.
   - You will be prompted to enter a Unicode character.
4. View the real-time updates and history.

## Project Structure

```
multiplayer-grid-app/
│
├── backend/
│   └── server.js       # Node.js server with Socket.IO
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Grid.js  # React component for the grid
│   │   └── index.js     # React entry point
│   ├── public/
│   └── package.json     # Frontend dependencies
│
└── README.md            # Project documentation
```

## Scripts

### Backend

- `node server.js`: Starts the backend server.

### Frontend

- `npm start`: Runs the frontend in development mode.
- `npm build`: Builds the app for production.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Contact

- **Name**: Dibyendu
- **Email**: [dibyendubar13702@gmail.com](mailto:dibyendubar13702@gmail.com)
- **GitHub**: [Dibyendu's GitHub](https://github.com/Dibyendu-13)
