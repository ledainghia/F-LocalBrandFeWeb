import { Category } from '@/datatype/manageType';
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

export const managementAPI = {
    getUsers: async () => {
        return await axiosInstance.get(`/api/user/users`);
    },
    getCustomers: async (filter: string) => {
        return await axiosInstance.get(`/api/customers/filter?${filter}`);
    },
    // Start of CRUD for Collection
    getCollections: async (filter: string) => {
        return await axiosInstance.get(`/api/collections/filter?${filter}`);
    },
    putCollection: async (data: any) => {
        return await axiosInstance.put(`/api/collection`, data);
    },
    postCollection: async (data: any) => {
        return await axiosInstance.post(`/api/collection`, data);
    },
    deleteCollection: async (id: string) => {
        return await axiosInstance.delete(`/api/collection/${id}`);
    },
    getCollectionById: async (id: string) => {
        return await axiosInstance.get(`/api/collection/${id}`);
    },
    // End of CRUD for Collection

    // Start of CRUD for Campaign
    getCampaigns: async (filter: string) => {
        return await axiosInstance.get(`/api/campaigns/filter?${filter}`);
    },
    getCampaignById: async (id: string, filter: string) => {
        return await axiosInstance.get(`/api/campaigns/${id}?${filter}`);
    },
    putCampaign: async (data: any) => {
        return await axiosInstance.put(`/api/campaign`, data);
    },
    postCampaign: async (data: any) => {
        return await axiosInstance.post(`/api/campaign`, data);
    },
    deleteCampaign: async (id: string) => {
        return await axiosInstance.delete(`/api/campaign/${id}`);
    },
    // End of CRUD for Campaign

    // Start of CRUD for Order
    getOrders: async (filter: string) => {
        return await axiosInstance.get(`/api/orders/filter?${filter}`);
    },
    // End of CRUD for Order

    // Start of CRUD for Product
    getProducts: async (filter: string) => {
        return await axiosInstance.get(`/api/products/filter?${filter}`);
    },
    getProductById: async (id: string) => {
        return await axiosInstance.get(`/api/products/${id}`);
    },
    // End of CRUD for Product

    // Start of CRUD for Category
    getCategories: async (filter: string) => {
        return await axiosInstance.get(`/api/categories/filter?${filter}`);
    },
    postCategory: async (data: FormData) => {
        return await axiosInstance.post(`/api/category`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    putCategory: async (data: Category) => {
        return await axiosInstance.put(`/api/categorie`, data);
    },
    deleteCategory: async (id: string) => {
        return await axiosInstance.delete(`/api/category/${id}`);
    },
    putCategoryStatus: async (id: string, status: string) => {
        return await axiosInstance.put(`/api/categorie/${id}/status`, {
            status: status,
        });
    },
    // End of CRUD for Category
};
