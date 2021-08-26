import Head from 'next/head';
import Layout from '../components/blog-layout';
import utilStyles from '../styles/utils.module.css';
import { getAllPosts, getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import { useAuth } from '../pages/auth/UserContext';

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    id: string;
    name: string;
    date: string;
  }[];
}) {
  return (
    <Layout>
      <Head>
        <title>{'Monesh Blog Site'}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, name }) => (
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

export async function getServerSideProps(context) {
  const allPostsData = await getAllPosts('monesh');
  return {
    props: {
      allPostsData,
    },
  };
}
