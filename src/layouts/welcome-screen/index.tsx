import React, { useCallback, useEffect } from 'react';
import { Button, Container, TextField } from '@material-ui/core';
import { getUser, selectUser, setDisplayName, updateUsernameAndStartGame } from '../../store/user';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const WelcomeScreen = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

    const handleNameChange = useCallback(e => dispatch(setDisplayName(e.target.value)), [dispatch]);
    const onGo = useCallback(() => dispatch(updateUsernameAndStartGame(null)), [dispatch]);

    useEffect(() => {
        dispatch(getUser(null));
    }, [dispatch]);

    return (
        <Container>
            <TextField
                name="Name"
                placeholder="Please enter your name"
                value={user.displayName ?? ''}
                onChange={handleNameChange}
            />
            <Button onClick={onGo}>Go</Button>
        </Container>
    )
};

export default WelcomeScreen;
