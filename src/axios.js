import axios from 'redaxios';

const baseURL = "http://localhost:3000";
const USERID = "123";

const axiosClient = axios.create({
  baseURL,
  headers: {
    "x-user-id": USERID,
  },
});

export default axiosClient;
