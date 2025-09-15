// app.js

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
const blogIdToUpdate = 1;
const blogIdToDelete = 1;
const updatedData = { title: 'Updated Blog', body: 'This blog has been updated.' };


const blog = {
  title: 'New Blog',
  body: 'This is the content of the new blog.',
  userId: 1,
};

const addBlog = async () => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(blog),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();
  console.log('New Blog added:', json);
};

const fetchBlogs = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log('All Blogs:', data);
};


const fetchBlog = async (id) => {
  const response = await fetch(`${apiUrl}/${id}`);
  const data = await response.json();
  console.log('Single Blog:', data);
};

const updateBlog = async (blogId, updatedData) => {
  const response = await fetch(`${apiUrl}/${blogId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  const updatedBlog = await response.json();
  console.log('Blog updated:', updatedBlog);
};

const deleteBlog = async (blogId) => {
  await fetch(`${apiUrl}/${blogId}`, {
    method: 'DELETE',
  });

  console.log('Blog deleted successfully');
};





deleteBlog(blogIdToDelete);
