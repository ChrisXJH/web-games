import React, {
  memo, useCallback, useEffect, useMemo
} from 'react';
import {
  Box,
  Container, Grid, makeStyles, Typography
} from '@material-ui/core';
import { Redirect, useParams } from 'react-router-dom';
import { last } from 'lodash';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type { GomokuGameAction, GomokuSnapshot } from '../../common/types';
import GomokuBoard from './board';
import { selectGameById } from '../../store/game/selectors';
import { joinGame, requestGamePlay } from '../../store/game/thunks';
import Players from './players';
import { selectUser } from '../../store/user/selectors';
import { HOME_PATH } from '../../common/constants';
import WinnerBanner from './winner-banner';

type GomokuParams = {
  id: string;
};

const COLORS = ['B', 'W'];

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4)
  },
  boardContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

const Gomoku = memo(() => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { id: gameId } = useParams() as GomokuParams;
  const game = useAppSelector(selectGameById(gameId)) as GomokuSnapshot;
  const user = useAppSelector(selectUser);

  const userRegistered = Boolean(user.displayName);

  useEffect(() => {
    if (userRegistered) dispatch(joinGame(gameId));
  }, [dispatch, gameId, userRegistered]);

  const handleCellClick = useCallback(
    (x: number, y: number) => {
      const action: GomokuGameAction = { x, y };

      dispatch(requestGamePlay({ gameId, action }));
    },
    [dispatch, gameId]
  );

  const {
    dimensions, actions = [], players = [], ended, winner: winnerId
  } = game ?? {};

  const colorMap = useMemo(
    () => players.reduce(
      (result, player, index) => {
        result[player.id] = COLORS[index];
        return result;
      },
      {} as { [key: string]: string }
    ),
    [players]
  );

  const gameGrid = useMemo(() => {
    if (!dimensions) return [];

    const grid = new Array(dimensions[0]).fill(null).map(
      () => new Array(dimensions[1]).fill('U')
    );

    actions.forEach(({ playerId, x, y }) => {
      grid[x][y] = colorMap[playerId as string] ?? null;
    });

    return grid;
  }, [dimensions, colorMap, actions]);

  const winner = useMemo(
    () => players.find((p) => p.id === winnerId) ?? null,
    [players, winnerId]
  );

  if (!userRegistered) return <Redirect to={`${HOME_PATH}?join=${gameId}`} />;

  if (!game) return <Typography>Loading...</Typography>;

  if (ended) return <Typography>The game has ended</Typography>;

  const { x: focusedX = null, y: focusedY = null } = last(actions) ?? {};

  return (
    <Container className={classes.container}>
      <Grid container>
        <Grid item md={6} className={classes.boardContainer}>
          <Box display="flex" flexDirection="column">
            <WinnerBanner winner={winner} />
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
          </Box>
        </Grid>
        <Grid item md={6}>
          <Players players={players} />
        </Grid>
      </Grid>
    </Container>
  );
});

export default Gomoku;
