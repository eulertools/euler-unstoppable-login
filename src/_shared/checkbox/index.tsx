import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

export const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  // Now set to default Gray color when not checked
  // color: ((theme as unknown) as ExtendedTheme).eulerActionGreen,
  '&$checked': {
    color: theme.palette.success.main,
  },
}));

CustomCheckbox.defaultProps = {
  color: 'default',
};
