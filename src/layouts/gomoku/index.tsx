import React, { useCallback, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { requestGamePlay, joinGame } from '../../store/game/actions';
import { selectGame } from '../../store/game';
import { GomokuSnapshot } from '../../common/types';
import GomokuBoard from './board';

type GomokuParams = {
    id: string;
};

const Gomoku = () => {
    const dispatch = useAppDispatch();
    const game = useAppSelector(selectGame);
    
    const { id : gameId } = useParams() as GomokuParams;

    useEffect(() => {
        dispatch(joinGame(gameId));
    }, [dispatch, gameId])

    const { dimensions, grid = [], players = [] } = game.snapshot as GomokuSnapshot;

    const handleCellClick = useCallback(
        (x, y) => dispatch(requestGamePlay({ gameId, action: { x, y }})),
        [dispatch, gameId]
    );

    if (!dimensions) return <Typography>Loading...</Typography>;

    const colorMap = {
        [players[0]?.id]: 'B',
        [players[1]?.id]: 'W'
    };

    const [m, n] = dimensions;

    const gameGrid = new Array(m).fill(null).map(
        () => new Array(n).fill('U')
    );

    grid.forEach(([playerId, x, y]) => {
        gameGrid[x][y] = colorMap[playerId] ?? null;
    });

    return (
        <Container>
            <GomokuBoard grid={gameGrid} onCellClick={handleCellClick} />
        </Container>
    )
};

export default Gomoku;
