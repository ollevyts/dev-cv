'use client';

import { useState, useEffect } from "react";
import { useAvatar } from "@/features/avatar-speech/model/AvatarContext";
import { useTranslation } from "@/shared/i18n/useTranslation";

const checkWinner = (currentBoard: (string | null)[]): string | null => {
    const WINNING_LINES = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    for (const [a, b, c] of WINNING_LINES) {
        if (
            currentBoard[a] !== null &&
            currentBoard[a] === currentBoard[b] &&
            currentBoard[a] === currentBoard[c]
        ) {
            return currentBoard[a];
        }
    }
    return null;
};

export const useTicTacToe = () => {
    const { say, clearSpeech } = useAvatar();
    const { t } = useTranslation();

    const [modalWinner, setModalWinner] = useState<string | null>(null);
    const [screen, setScreen] = useState<'setup' | 'playing'>('setup');
    const [difficulty, setDifficulty] = useState<'easy' | 'hard'>('easy');
    const [board, setBoard] = useState<('X' | 'O' | null)[]>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState<boolean>(true);
    const [scores, setScores] = useState({ human: 0, ai: 0 });

    const getRandomMove = (currentBoard: ('X' | 'O' | null)[]): number => {
        const availMoves: number[] = [];
        currentBoard.forEach((cell, idx) => {
            if (cell === null) availMoves.push(idx);
        });
        return availMoves[Math.floor(Math.random() * availMoves.length)];
    };

    const getSmartMove = (currentBoard: ('X' | 'O' | null)[]): number => {
        const WINNING_LINES = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        for (const [a, b, c] of WINNING_LINES) {
            const line = [currentBoard[a], currentBoard[b], currentBoard[c]];
            if (line.filter(cell => cell === 'O').length === 2 && line.includes(null)) {
                return [a, b, c].find(idx => currentBoard[idx] === null)!;
            }
        }

        for (const [a, b, c] of WINNING_LINES) {
            const line = [currentBoard[a], currentBoard[b], currentBoard[c]];
            if (line.filter(cell => cell === 'X').length === 2 && line.includes(null)) {
                return [a, b, c].find(idx => currentBoard[idx] === null)!;
            }
        }

        const center = 4;
        if (currentBoard[center] === null) return center;

        const corners = [0, 2, 6, 8];
        const availCorners = corners.filter(idx => currentBoard[idx] === null);
        if (availCorners.length > 0) {
            return availCorners[Math.floor(Math.random() * availCorners.length)];
        }

        return getRandomMove(currentBoard);
    };

    useEffect(() => {
        if (screen === 'setup') {
            say(t('avatar.ticTacToeSetup'));
        }
        return () => clearSpeech();
    }, [screen]);

    useEffect(() => {
        if (isXNext || checkWinner(board) !== null) return;

        if (!board.includes(null)) {
            say(t('avatar.ticTacToeDraw'));
            return;
        }

        const timer = setTimeout(() => {
            const aiMove = difficulty === 'easy' ? getRandomMove(board) : getSmartMove(board);
            const newBoard = [...board];
            newBoard[aiMove] = 'O';
            setBoard(newBoard);

            const winner = checkWinner(newBoard);
            if (winner === 'O') {
                setScores(prev => ({ ...prev, ai: prev.ai + 1 }));
                say(t('avatar.ticTacToeAiWin'));
                setModalWinner('O');
            } else if (!newBoard.includes(null)) {
                say(t('avatar.ticTacToeDraw'));
                setModalWinner('Draw');
            } else {
                setIsXNext(true);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [isXNext, board, difficulty]);

    const handleSetDifficulty = (mode: 'easy' | 'hard') => {
        setDifficulty(mode);
        say(mode === 'easy' ? t('avatar.ticTacToeEasy') : t('avatar.ticTacToeHard'));
    };

    const handleCellClick = (index: number) => {
        if (board[index] !== null || checkWinner(board) !== null || !isXNext) return;

        const newBoard = [...board];
        newBoard[index] = "X";
        setBoard(newBoard);

        const winner = checkWinner(newBoard);
        if (winner === 'X') {
            setScores(prev => ({ ...prev, human: prev.human + 1 }));
            say(t('avatar.ticTacToeHumanWin'));
            setModalWinner('X');
        } else if (!newBoard.includes(null)) {
            say(t('avatar.ticTacToeDraw'));
            setModalWinner('Draw');
        } else {
            setIsXNext(false);
        }
    };

    const handleResetBoard = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setModalWinner(null);
    };

    const handleStartGame = () => {
        handleResetBoard();
        setScreen('playing');
        say(difficulty === 'hard' ? t('avatar.ticTacToeStartHard') : t('avatar.ticTacToeStartEasy'));
    };

    return {
        screen,
        setScreen,
        difficulty,
        board,
        isXNext,
        scores,
        handleSetDifficulty,
        handleCellClick,
        handleResetBoard,
        handleStartGame,
        modalWinner,
        setModalWinner
    };
};
