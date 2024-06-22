import axios from 'axios';
const baseURL = 'https://cl.englivia.com/api-v2.php';

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: '*/*',
    'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
  },
});

export default instance;
