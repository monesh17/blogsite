import React, { useState } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Head from 'next/head';
import Layout from '../../components/layout';
import styles from './create.module.css';

export default function create() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromText('Enter Blog Content')
    )
  );
  return (
    <>
      <Layout>
        <Head>
          <title>Create Blog</title>
        </Head>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName={styles.wrapperClass}
          editorClassName={styles.editorClass}
          toolbarClassName={styles.toolbarClass}
        />
      </Layout>
    </>
  );
}
