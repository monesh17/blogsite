import { getBlogData } from '../../../lib/posts';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ContentLayout from '../../../components/blog-layout';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  ContentState,
} from 'draft-js';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import utilStyles from '../../../styles/utils.module.css';
import { useRouter } from 'next/router';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const Editor: any = dynamic(
  () => {
    return import('react-draft-wysiwyg').then((mod) => mod.Editor);
  },
  { loading: () => null, ssr: false }
);
export default function Post({ id }) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(''))
  );
  const [tags, setTags] = useState();
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);
  const [secured, setSecured] = React.useState('');
  const [blogName, setBlogName] = React.useState('');
  const [blogId, setBlogId] = React.useState('');
  const router = useRouter();
  const cancelClick = () => {
    router.push('/admin/personal_blogs');
  };
  const updateBlog = async () => {
    await fetch(' https://blogservice-001.herokuapp.com/api/v1/blog', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        tags: tags,
        content: convertToRaw(editorState.getCurrentContent()),
        isSecured: secured,
      }),
    });
    alert('Content has been updated');
  };
  const deleteBlog = async () => {
    await fetch(
      ` https://blogservice-001.herokuapp.com/api/v1/blog/${blogId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    router.push('/');
  };
  const onTagsChange = (event, values) => {
    setTags(values);
  };
  const handleSecuredChange = (event) => {
    setSecured(event.target.value);
  };

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const data = await getBlogData(id as string);
        console.log('data is ', data);
        setEditorState(
          EditorState.createWithContent(convertFromRaw(data.content))
        );
        setTags(data.tags);
        setSecured(data.isSecured);
        setBlogName(data.name);
        setBlogId(data.id);
      } catch (error) {
        console.log('error catched is ', error);
      }
      setShowLoadingIndicator(false);
    };
    loadBlog();
  }, []);

  return (
    <ContentLayout>
      {showLoadingIndicator && <p>Blog Data Is Loading</p>}
      {!showLoadingIndicator && (
        <Card className={utilStyles.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {blogName}
            </Typography>
            <Typography variant="h5" component="h2">
              <Autocomplete
                multiple
                id="tags-filled"
                options={['']}
                freeSolo
                defaultValue={tags}
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
                  <em>{secured}</em>
                </MenuItem>
                <MenuItem value={'true'}>True</MenuItem>
                <MenuItem value={'false'}>False</MenuItem>
              </Select>
            </Typography>
            <Typography
              className={utilStyles.title}
              color="textSecondary"
              gutterBottom
            >
              Blog Content
            </Typography>
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperClassName={utilStyles.wrapperClass}
              editorClassName={utilStyles.editorClass}
              toolbarClassName={utilStyles.toolbarClass}
            />
          </CardContent>
          <CardActions>
            <Button onClick={cancelClick} variant="contained">
              Cancel
            </Button>
            <Button onClick={updateBlog} variant="contained" color="primary">
              Update
            </Button>
            <Button onClick={deleteBlog} variant="contained" color="secondary">
              Delete
            </Button>
          </CardActions>
        </Card>
      )}
    </ContentLayout>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.id;
  return {
    props: {
      id,
    },
  };
}
