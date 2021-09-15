import React, { useState } from 'react';
import BlogLayout from '../../components/blog-layout';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { getAllPosts } from '../../lib/posts';
import { useAuth } from '../../context/UserContext';



export default function personalBlogs({
  allPostsData,
}: {
  allPostsData: {
    id: string;
    name: string;
    date: string;
  }[];
}) {
  return (
    <>
      <BlogLayout>
        <Card>
          <Typography variant="h5" component="h2">
            Personal Space
          </Typography>
          <CardContent>
            <Typography variant="h6" component="h6">
              <ul className={utilStyles.list}>
                {allPostsData.map(({ id, date, name }) => (
                  <li className={utilStyles.listItem} key={id}>
                    <Link href={`/admin/update/${id}`}>
                      <a>{name}</a>
                    </Link>
                    <br />
                    <small className={utilStyles.lightText}>
                      <Date dateString={date} />
                    </small>
                  </li>
                ))}
              </ul>
            </Typography>
          </CardContent>
        </Card>
      </BlogLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const allPostsData = await getAllPosts('monesh');
  return {
    props: {
      allPostsData,
    },
  };
}
