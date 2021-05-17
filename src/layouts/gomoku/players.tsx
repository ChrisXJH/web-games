import React from 'react';
import {
  List, ListItem, ListItemIcon, ListItemText, Typography
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { User } from '../../common/types';

type PlayersProps = {
  players: User[]
};

const Players = (props: PlayersProps) => {
  const { players } = props;

  const list = players.map((player) => (
    <ListItem key={player.id}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText>
        {player.displayName}
      </ListItemText>
    </ListItem>
  ));

  return (
    <List dense subheader={<Typography variant="subtitle1">Players</Typography>}>
      {list}
    </List>
  );
};

export default Players;
