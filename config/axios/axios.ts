import { userLogin } from '@/datatype/userType';
import axios from 'axios';
import axiosInstance from './interceptorAxios';
import { ex } from '@fullcalendar/core/internal-common';
import { getUser } from '@/helper/checkuser';

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

export const managementAPI = {
    getUsers: async () => {
        return await axiosInstance.get(`/api/user/users`);
    },
};
