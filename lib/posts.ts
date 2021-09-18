export async function getAllPosts(userName: string) {
  console.log('username for reqeust is ',userName);
  const response = await fetch(' https://blogservice-001.herokuapp.com/api/v1/blog', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'userName': userName
    },
  });
  const blogs = await response.json();
  return blogs.blogResponses.map(blog => {
    return {
      id: blog.id,
      name: blog.name,
      date: blog.createdAt
    }
  })
}

export async function getBlogData(id: string) {
  const response = await fetch(` https://blogservice-001.herokuapp.com/api/v1/blog/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const blog = await response.json();
  console.log('blog recieved is ', blog);
  return {
    id: blog.id,
    name: blog.name,
    date: blog.createdAt,
    tags: blog.tags,
    content: blog.content
  }
}