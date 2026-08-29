import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

export interface EmailSubscription {
  email: string;
  updated: number;
}

export interface SubscriptionListProps {
  subscriptions: EmailSubscription[];
}

export const SubscriptionList: React.FC<SubscriptionListProps> = ({ subscriptions }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align='right'>Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscriptions.map(row => (
            <TableRow key={row.email}>
              <TableCell component='th' scope='row'>
                {row.email}
              </TableCell>
              <TableCell align='right'>{new Date(row.updated).toISOString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
