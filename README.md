# CyberType – Elegant Co-op Cyber Typing Game

CyberType is a premium, minimal, and immersive 2D multiplayer typing game inspired by ZType. Players command spacecraft, typing descending words to fire laser beams and obliterate incoming hostiles.

## 🌟 Key Features

*   **Cyber-Minimalist Aesthetics**: Procedural, glowing vector-based graphics on a dark nebula space background, complete with parallax side scenery (ruined space towers, asteroids, planets) that drifts past without blocking the gameplay arena.
*   **Up to 3-Player Co-op (Team Match)**:
    *   Join lobbies using a **4-character Room Code**.
    *   Lobbies automatically lock once 3 players enter.
    *   Players select unique ship colors (**Red**, **Blue**, or **Green**).
    *   **Positioning**: Host is center, Player 2 is right, Player 3 is left.
    *   **Co-op Typing**: Enemy words are color-coded. You can *only* target and type words matching your ship's color.
*   **Real-time Online Leaderboard**: Tracks active online players' scores and waves. The leaderboard automatically refreshes for all online players and resets/clears active sessions when browser tabs are closed.
*   **Intense Boss Battles (Wave 5, 10, 15...)**:
    *   Dreadnought launches letter-bullets and colored minions.
    *   **Color-Cycling Shield Words**: Boss shield words cycle color states (Red ➔ Blue ➔ Green). Players must coordinate and take turns typing during their active color phase.
    *   **Single-Letter Bullets**: Fired by bosses and generals. White color (typed by *anyone*). If a letter-bullet reaches the bottom threshold, it causes an instant **Game Over** for the squad.
*   **Sound System**: Features original ZType audio assets (plasma blasts, lock-on targets, explosion sounds, and background music).

---

## 🛠️ Local Development Setup

To run the game locally on your machine:

### 1. Install Dependencies
Run the package installation:
```bash
npm install
```

### 2. Build the Client
Compile the Vite React frontend:
```bash
npm run build
```

### 3. Start the Server
Run the Express + WebSocket server:
```bash
node server.js
```
The application will launch on [http://localhost:3001](http://localhost:3001). Open multiple browser tabs to test multiplayer lobbies and the real-time leaderboard!

*Note: For hot-reloaded frontend development, you can run `npm run dev` alongside the backend server.*

---

## 🚀 Online Deployment Guide

The workspace is configured as a unified full-stack application (the Express server hosts the WebSocket broker and serves the production React build from the `dist` directory). This makes online deployment extremely simple.

### Hosting on **Render** (Recommended)
1.  Push the codebase to a GitHub repository.
2.  Create a new **Web Service** on Render.
3.  Configure the service with:
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install && npm run dev && npm run build` (or simply `npm install && npm run build`)
    *   **Start Command**: `node server.js`
4.  Render will deploy the service and provide an `https://...` URL. The React client automatically detects this environment and upgrades its WebSockets to `wss://` on the same URL!

---

## 🎮 How to Play

1.  **Select Profile**: Enter your pilot name, choose a ship color, and save.
2.  **Solo Mode**: Type words descending from space. Earn score multipliers by maintaining typing streaks.
3.  **Team Mode**:
    *   Create a room and share the 4-letter code.
    *   Select your color (**Red**, **Blue**, or **Green**).
    *   When 3 players enter, the host clicks **Start**.
    *   **Only type words of your color!**
    *   **Watch for white letter-bullets!** Anyone must type the letter on the bullet to cancel it before it hits a player ship, which would result in immediate defeat.
