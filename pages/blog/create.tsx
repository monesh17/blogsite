import React, { useState } from 'react';
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Head from 'next/head';
import ContentLayout from '../../components/content-layout';
import styles from './create.module.css';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';
const Editor: any = dynamic(
  () => {
    return import('react-draft-wysiwyg').then((mod) => mod.Editor);
  },
  { loading: () => null, ssr: false }
);

export default function create() {
  const [disableCreateButton, setDisableCreateButton] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromText('Enter Blog Content')
    )
  );
  const [title, setTitle] = useState('');
  const router = useRouter();
  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  const classes = useStyles();

  const saveBlog = async () => {
    await fetch(' https://blogservice-001.herokuapp.com/api/v1/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: uuidv4(),
        name: title,
        userName: 'Monesh',
        createdAt: '2021-07-25T17:30:00Z',
        content: convertToRaw(editorState.getCurrentContent()),
      }),
    });
    router.push('/');
  };
  return (
    <>
      <ContentLayout>
        <Head>
          <title>Create Blog</title>
        </Head>
        <FormControl>
          <InputLabel htmlFor="component-simple">Enter Blog Title</InputLabel>
          <Input id="component-simple" value={title} onChange={handleChange} />
        </FormControl>
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Blog Content
            </Typography>
            <Typography variant="body2" component="p">
              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName={styles.wrapperClass}
                editorClassName={styles.editorClass}
                toolbarClassName={styles.toolbarClass}
              />
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained">Cancel</Button>
            <Button
              onClick={saveBlog}
              disabled={disableCreateButton}
              variant="contained"
              color="primary"
            >
              Create
            </Button>
          </CardActions>
        </Card>
      </ContentLayout>
    </>
  );
}
