import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1';

const api = axios.create({
    baseURL: API_URL,
});

export const getPosts = () => api.get('/posts');
export const createPost = (postData) => api.post('/posts/create', postData);
export const deletePost = (postId) => api.delete(`/posts/${postId}`);
export const likePost = (postId) => api.post('/likes/like', { post: postId, user: "NeoUser" });
export const createComment = (commentData) => api.post('/comments/create', { ...commentData, user: commentData.user || "NeoUser" });

export default api;
