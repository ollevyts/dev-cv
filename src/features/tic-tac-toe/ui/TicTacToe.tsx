'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { ScreenSetup } from './ScreenSetup';
import { ScreenGame } from './ScreenGame';
import { GameModal } from './GameModal';
import { useTicTacToe } from '../model/useTicTacToe';

export const TicTacToe = () => {
    const {
        screen,
        setScreen,
        difficulty,
        board,
        isXNext,
        scores,
        modalWinner,
        handleSetDifficulty,
        handleCellClick,
        handleResetBoard,
        handleStartGame
    } = useTicTacToe();

    return (
        <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center min-h-[420px] p-1">
            <AnimatePresence mode="wait">
                {screen === 'setup' ? (
                    <ScreenSetup
                        key="setup"
                        difficulty={difficulty}
                        setDifficulty={handleSetDifficulty}
                        onStart={handleStartGame}
                    />
                ) : (
                    <ScreenGame
                        key="game"
                        board={board}
                        isXNext={isXNext}
                        scores={scores}
                        onCellClick={handleCellClick}
                        onReset={handleResetBoard}
                        onBack={() => setScreen('setup')}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {modalWinner && (
                    <GameModal
                        isOpen={!!modalWinner}
                        winner={modalWinner}
                        onRestart={handleResetBoard}
                        onExit={() => {
                            handleResetBoard();
                            setScreen('setup');
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
