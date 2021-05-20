import React, { useCallback, useEffect } from 'react';
import {
  Button, Container, Box, TextField, Paper, makeStyles, Typography
} from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/user/selectors';
import {
  getUser, setDisplayName, updateUsernameAndJoinGame, updateUsernameAndStartGame
} from '../../store/user/actions';
import particlesOptions from './particles-options';

const useStyles = makeStyles((theme) => ({
  paper: {
    zIndex: theme.zIndex.speedDial
  },
  goButton: {
    marginTop: theme.spacing(1)
  }
}));

const WelcomeScreen = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const joinId = searchParams.get('join');

  const handleNameChange = useCallback((e) => dispatch(setDisplayName(e.target.value)), [dispatch]);
  const onGo = useCallback(() => {
    if (joinId) dispatch(updateUsernameAndJoinGame(joinId));
    else dispatch(updateUsernameAndStartGame(null));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUser(null));
  }, [dispatch]);

  return (
    <Container>
      <Box position="fixed" top={0} left={0}>
        <Particles options={particlesOptions} />
      </Box>
      <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
        <Paper variant="outlined" className={classes.paper}>
          <Box px={6} py={4}>
            <Typography paragraph>Please choose a name (.^◡^.)</Typography>
            <TextField
              fullWidth
              name="Name"
              size="small"
              placeholder="Name"
              value={user.displayName ?? ''}
              variant="outlined"
              onChange={handleNameChange}
            />
            <Button fullWidth variant="contained" color="primary" className={classes.goButton} onClick={onGo}>Go</Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default WelcomeScreen;
