import React, { useEffect, useState } from 'react';
import BlogLayout from '../../components/blog-layout';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { getAllPosts } from '../../lib/posts';
import { useAuth } from '../../context/UserContext';

export default function personalBlogs() {
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadBlogs = async (userDetails: any) => {
      try {
        if (userDetails) {
          const allPostsData = await getAllPosts(userDetails.userName);
          setBlogData(allPostsData);
        }
      } catch (error) {
        console.log('error catched is ', error);
      }
      setShowLoadingIndicator(false);
    };
    loadBlogs(user);
  }, [user]);
  return (
    <>
      <BlogLayout>
        <Card>
          <Typography variant="h5" component="h2">
            Personal Space
          </Typography>
          <CardContent>
            <Typography variant="h6" component="h6">
              {showLoadingIndicator && <p>Blog Posts Loading</p>}
              {!showLoadingIndicator && (
                <ul className={utilStyles.list}>
                  {blogData.map(({ id, date, name }) => (
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
              )}
            </Typography>
          </CardContent>
        </Card>
      </BlogLayout>
    </>
  );
}
