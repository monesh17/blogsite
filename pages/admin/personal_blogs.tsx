import React, { useState } from 'react';
import BlogLayout from '../../components/blog-layout';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
export default function personalBlogs() {
  return (
    <>
      <BlogLayout>
        <Card>
          <Typography variant="h5" component="h2">
            Personal Space
          </Typography>
          <CardContent>
            <Typography variant="body2" component="p">
              Blogs created by logged in user will be displayed here soon
            </Typography>
          </CardContent>
        </Card>
      </BlogLayout>
    </>
  );
}
