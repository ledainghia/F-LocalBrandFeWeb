import { userLogin } from '@/datatype/userType';
import axios from 'axios';
import axiosInstance from './interceptorAxios';

const baseUrl = 'https://api.flocalbrand.site';

export const authAPI = {
    login: async (user: userLogin) => {
        return await axios.post(`${baseUrl}/api/auth/login`, user);
    },
};

export const userAPI = {
    getUser: async () => {
        return await axiosInstance.get(`/api/auth/user-info`);
    },
};
