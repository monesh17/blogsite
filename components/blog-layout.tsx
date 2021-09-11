import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import styles from './blog-layout.module.css';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router';
import { useAuth } from '../context/UserContext';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <p>( Under Development - more to come soon )</p>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const { user } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  const handleDialogOpen = () => {
    router.push('/auth/login');
  };

  const validateAdminUser = (userDetails: any) => {
    if (userDetails && userDetails.userName) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar className={styles.toolbar}>
          {validateAdminUser(user) && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={styles.toolbarTitle}
          >
            Monesh Blog
          </Typography>
          <nav>
            <Link
              variant="button"
              color="textPrimary"
              href="/about"
              className={styles.link}
            >
              About
            </Link>
          </nav>
          {!validateAdminUser(user) && (
            <Button
              color="primary"
              variant="outlined"
              onClick={handleDialogOpen}
              className={styles.link}
            >
              Login
            </Button>
          )}
          {validateAdminUser(user) && (
            <Link
              variant="button"
              color="textPrimary"
              href="/"
              className={styles.link}
            >
              Back To Home
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        className={styles.drawer}
      >
        <div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Personal Blogs', 'Create Blog', 'About Author'].map(
            (text, index) => (
              <Link href={`/admin/${text.toLowerCase().replace(/ /g, '_')}`}>
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            )
          )}
        </List>
        <Divider />
      </Drawer>
      {/* Main Content */}
      <main className={styles.main}>{children}</main>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={styles.footer}>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
}
