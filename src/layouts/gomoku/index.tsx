import React, { useCallback, useEffect } from 'react';
import {
  Container, Grid, makeStyles, Typography
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { last } from 'lodash';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type { GomokuGameAction, GomokuSnapshot } from '../../common/types';
import GomokuBoard from './board';
import { selectGame } from '../../store/game/selectors';
import { joinGame, requestGamePlay } from '../../store/game/thunks';
import Players from './players';

type GomokuParams = {
  id: string;
};

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4)
  },
  boardContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

const Gomoku = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const game = useAppSelector(selectGame);

  const { id: gameId } = useParams() as GomokuParams;

  useEffect(() => {
    dispatch(joinGame(gameId));
  }, [dispatch, gameId]);

  const { dimensions, actions = [], players = [] } = game.snapshot as GomokuSnapshot;

  const handleCellClick = useCallback(
    (x: number, y: number) => {
      const action: GomokuGameAction = { x, y };

      dispatch(requestGamePlay({ gameId, action }));
    },
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

  actions.forEach(({ playerId, x, y }) => {
    gameGrid[x][y] = colorMap[playerId as string] ?? null;
  });

  const { x: focusedX = null, y: focusedY = null } = last(actions) ?? {};

  return (
    <Container className={classes.container}>
      <Grid container>
        <Grid item md={6} className={classes.boardContainer}>
          {
            players.length < 2
              ? <Typography>Waiting for another player to join</Typography>
              : (
                <GomokuBoard
                  grid={gameGrid}
                  focused={[focusedX, focusedY]}
                  onCellClick={handleCellClick}
                />
              )
          }
        </Grid>
        <Grid item md={6}>
          <Players players={players} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Gomoku;
