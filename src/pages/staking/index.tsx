import React, { FC } from 'react';
import StakingContent from 'components/Staking/Content';
import { pageview } from 'lib/gtag';
import Box from '@mui/material/Box';

const StakingPage: FC = () => {
  React.useEffect(() => {
    pageview('/staking');
  }, []);

  return (
    <Box p={4}>
      <StakingContent />
    </Box>
  );
};

export default StakingPage;
