import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DisplayPlayer, DisplayLocation, GameInput } from './components';
import { GameView, InspectionView } from './views';

function App() {

  const gameState = useSelector((state: any) => state.gameState);

  return (
    <>
      {
        gameState.screen === "game-state" && < GameView />
      }
    </>
  )
}

export default App
