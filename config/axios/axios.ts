import { userLogin } from '@/datatype/userType';
import axios from 'axios';
const baseUrl = 'https://api.flocalbrand.site';

export const authAPI = {
    login: async (user: userLogin) => {
        return await axios.post(`${baseUrl}/api/auth/login`, user);
    },
    register: async (username: string, password: string) => {
        return await axios.post(`${baseUrl}/auth/register`, { username, password });
    },
    logout: async () => {
        return await axios.post(`${baseUrl}/auth/logout`);
    },
};
