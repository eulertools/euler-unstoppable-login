import React, { FC } from 'react';
import Alert, { AlertProps } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface IAlertProps extends AlertProps {
  message: string | React.ReactNode;
  customIcon?: boolean;
}

export const CustomAlert: FC<IAlertProps> = ({ severity, message, customIcon = false }) => {
  const icon = React.useMemo(() => {
    if (severity === 'error') {
      return <CloseOutlinedIcon />;
    }

    if (severity === 'info') {
      return <AnnouncementOutlinedIcon />;
    }

    return null;
  }, [severity]);

  return (
    <Box>
      {customIcon ? (
        <Alert icon={icon} severity={severity}>
          {message}
        </Alert>
      ) : (
        <Alert severity={severity}>{message}</Alert>
      )}
    </Box>
  );
};
