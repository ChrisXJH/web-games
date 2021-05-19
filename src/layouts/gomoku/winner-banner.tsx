import { Box, Collapse, Typography } from '@material-ui/core';
import React, { memo } from 'react';
import { User } from '../../common/types';

type WinnerBannerProps = {
  winner: User | null;
};

const WinnerBanner = memo((props: WinnerBannerProps) => {
  const { winner } = props;
  const { displayName } = winner ?? {};

  return (
    <Collapse in={Boolean(winner)}>
      <Box padding={2} justifyContent="center">
        <Typography variant="h5" align="center">
          {displayName}
          {' '}
          has won!
        </Typography>
      </Box>
    </Collapse>
  );
});

export default WinnerBanner;
