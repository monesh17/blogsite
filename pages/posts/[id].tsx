import { getBlogData } from '../../lib/posts';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ContentLayout from '../../components/content-layout';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import utilStyles from '../../styles/utils.module.css';
import { useRouter } from 'next/router';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

const Editor: any = dynamic(
  () => {
    return import('react-draft-wysiwyg').then((mod) => mod.Editor);
  },
  { loading: () => null, ssr: false }
);
export default function Post({
  postData,
}: {
  postData: {
    id: string;
    name: string;
    date: string;
    tags: string[];
    content: string;
  };
}) {
  console.log('postData is ', postData);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(convertFromRaw(postData.content))
  );
  const [tags, setTags] = useState(postData.tags);
  const router = useRouter();
  const updateBlog = async () => {
    await fetch(' https://blogservice-001.herokuapp.com/api/v1/blog', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: postData.id,
        tags: tags,
        content: convertToRaw(editorState.getCurrentContent()),
      }),
    });
    alert('Content has been updated');
  };
  const deleteBlog = async () => {
    await fetch(
      ` https://blogservice-001.herokuapp.com/api/v1/blog/${postData.id}`,
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
  return (
    <ContentLayout>
      <Card className={utilStyles.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {postData.name}
          </Typography>
          <Typography variant="h5" component="h2">
            <Autocomplete
              multiple
              id="tags-filled"
              options={['']}
              freeSolo
              defaultValue={postData.tags}
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
       {/*  <CardActions>
          <Button variant="contained">Cancel</Button>
          <Button onClick={updateBlog} variant="contained" color="primary">
            Update
          </Button>
          <Button onClick={deleteBlog} variant="contained" color="secondary">
            Delete
          </Button>
        </CardActions> */}
      </Card>
    </ContentLayout>
  );
}

/* export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string)
  return {
    props: {
      postData
    }
  }
} */

export async function getServerSideProps({ params }) {
  const postData = await getBlogData(params.id as string);
  return {
    props: {
      postData,
    },
  };
}
