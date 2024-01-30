import axios from './axios';

export async function registerUser(name, email, password) {
  const response = await axios.post('/api/users/register', { name, email, password });
  return response.data;
}

export async function loginUser(email, password) {
  const response = await axios.post('/api/users/login', { email, password });
  return response.data;
}

export async function createBook(formData) {
  const response = await axios.post('/api/books', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export async function getAllBooks() {
  const response = await axios.get('/api/books');
  return response.data;
}

export async function editBook(id, title, author, publisher, year, pages) {
  const response = await axios.put(`/api/books/${id}`, {
    title,
    author,
    publisher,
    year,
    pages,
  });
  return response.data;
}

export async function deleteBook(id) {
  const response = await axios.delete(`/api/books/${id}`);
  return response.data;
}

export async function getBookDetailById(id) {
  const response = await axios.get(`/api/books/${id}`);
  return response.data;
}
