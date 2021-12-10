import React, { FC } from 'react';
import StakingContentWrapper from 'components/Staking/Content';
import { pageview } from 'lib/gtag';

const StakingPage: FC = () => {
  React.useEffect(() => {
    pageview('/staking');
  }, []);

  return <StakingContentWrapper />;
};

export default StakingPage;
