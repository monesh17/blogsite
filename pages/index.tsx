import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Layout from '../components/blog-layout';
import utilStyles from '../styles/utils.module.css';
import { getAllPostsForGeneral } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';

export default function Home() {
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const allPostsData = await getAllPostsForGeneral();
        setBlogData(allPostsData);
      } catch (error) {}

      setShowLoadingIndicator(false);
    };

    loadBlogs();
  }, []);

  return (
    <Layout>
      <Head>
        <title>{'Monesh Blog Site'}</title>
      </Head>
      {showLoadingIndicator && (
        <h2 className={utilStyles.headingLg}>Blog Posts Loading</h2>
      )}
      {!showLoadingIndicator && (
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {blogData.map(({ id, date, name }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{name}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Layout>
  );
}

/* export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
} */

/* export async function getServerSideProps(context) {
  const allPostsData = await getAllPosts('monesh');
  return {
    props: {
      allPostsData,
    },
  };
}
 */
