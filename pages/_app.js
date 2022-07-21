import '../styles/globals.css';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { GameProvider } from '../context/GameContext';

function Game({ Component, pageProps }) {
  return (
    <GameProvider>
      <Component {...pageProps} />
    </GameProvider>
  )
}

export default Game;
