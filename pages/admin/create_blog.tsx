import React, { useState } from 'react';
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Head from 'next/head';
import ContentLayout from '../../components/blog-layout';
import styles from './create_blog.module.css';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import utilStyles from '../../styles/utils.module.css';
import { useAuth } from '../../context/UserContext';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import dynamic from 'next/dynamic';
const Editor: any = dynamic(
  () => {
    return import('react-draft-wysiwyg').then((mod) => mod.Editor);
  },
  { loading: () => null, ssr: false }
);

export default function createBlog() {
  const [disableCreateButton, setDisableCreateButton] = useState(false);
  const [tags, setTags] = useState([]);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(''))
  );
  const [title, setTitle] = useState('');
  const router = useRouter();
  const { user } = useAuth();
  const [secured, setSecured] = React.useState('true');

  const handleSecuredChange = (event) => {
    setSecured(event.target.value);
  };
  const cancelClick = () => {
    router.push('/admin/personal_blogs');
  };
  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const saveBlog = async () => {
    setDisableCreateButton(true);
    await fetch(' https://blogservice-001.herokuapp.com/api/v1/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: uuidv4(),
        name: title,
        userName: user.userName,
        isSecured: secured,
        createdAt: '2021-07-25T17:30:00Z',
        tags: tags,
        content: convertToRaw(editorState.getCurrentContent()),
      }),
    });
    router.push('/');
  };
  const onTagsChange = (event, values) => {
    setTags(values);
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
        <Card className={utilStyles.root}>
          <Typography variant="h5" component="h2">
            <Autocomplete
              multiple
              id="tags-filled"
              options={['']}
              freeSolo
              onChange={onTagsChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="Enter Tags"
                  placeholder="Press Enter after typing a tag"
                />
              )}
            />
          </Typography>
          <Typography variant="h5" component="h2">
            <InputLabel id="Secured Label">Secured</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={secured}
              onChange={handleSecuredChange}
              autoWidth
              label="Secured"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'true'}>True</MenuItem>
              <MenuItem value={'false'}>False</MenuItem>
            </Select>
          </Typography>
          <CardContent>
            <Typography
              className={utilStyles.title}
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
            <Button onClick={cancelClick} variant="contained">
              Cancel
            </Button>
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
