import axios from 'axios';
const instance = axios. create({
    baseURL: 'https://pinggu-backend.fly.dev',
    withCredentials: true
});
export default instance;