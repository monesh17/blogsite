import React, { useState } from 'react';
import { EditorState, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Head from 'next/head';
import Layout from '../../components/layout';
import styles from './create.module.css';

import dynamic from "next/dynamic";
const Editor: any = dynamic(
  () => {
      return import("react-draft-wysiwyg")
         .then((mod) =>mod.Editor);
   },{ loading: () => null, ssr: false }
);

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
