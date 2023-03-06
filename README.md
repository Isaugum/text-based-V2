# Text Based RPG Project

This is a fun project built using ReactJS, typescript and Redux.

## What is it and what can you do?

So far, the game is in development and there  is no content included in this project - it is mostly a barebones, unfinished engine for the game.
The plan is to make it an engine that you can feed appropriate JSON files into and would therefore support plenty of different games with different content.
So far, the only locations are a room and halway. Inside the room, there is a table you can inspect, and on it, a letter you can pick up.
In the hallways, there is a soldier you can talk to, whose dialogue will change if you have the letter with you.

## Dependencies and installation

Use Node Package Manager [npm](https://www.npmjs.com/) to install dependencies.

```
npm install react react-dom
npm install redux react-redux
npm install typescript
```
all at once:
```
npm install react react-dom typescript redux react-redux
```

## Project Structure
- **"public/index.html"** and coresponding **"src/index.tsx"** are the entry points into the project.
    - in index.tsx, store is imported from "./src/state" folder, and a Provider for Redux state is setup.

- **"./src/state"** folder stores everything related to Redux states. This involves types (typescript interfaces), reducers(initialStates and slices) and store initialization.

- **"./src/views"** contains component related to full screen views - traditionally called pages, but this is meant to be a single page application.

- **"./src/components"** contains all the components that views use.
    - LocationInfo uses locationSlice to retrive and render data about player's current location.

    - PlayerInfo uses playerSlice to retrive and render data about player's essential stats

    - InputBar is the universal interface for communication with the game. It includes a function "input_chewer" that processes user input and uses useDispatch to trigger appropriate reducer functions.

- **"./src/App.tsx"** is used to render the appropriate view according to gameState.
