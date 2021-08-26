import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router';
import { useAuth } from '../auth/UserContext';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function LoginDialog() {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleClose = () => {
    router.push('/');
  };

  const handleLogin = async () => {
    login(name, password);
    return router.push('/');
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            To Get Admin Access Kindly Login
          </Typography>
          <Typography variant="body2" component="p">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="User Name"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="text"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              fullWidth
            />
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleLogin} color="primary">
            Login
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
