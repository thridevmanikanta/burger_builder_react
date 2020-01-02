import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://burger-builder-3dev.firebaseio.com/'
});

export default axiosInstance;