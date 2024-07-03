import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/users';

const getToken = () => localStorage.getItem('token');

export const createUser = async (data) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },
        };

        const res = await axios.post(`${BASE_URL}/`, data, config);
        return res.data;
    } catch (error) {
        return error.response ? error.response.data : error.message;
    }
};

export const createUserByAdmin = async (data) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },
        };

        const res = await axios.post(`${BASE_URL}/new`, data, config);
        return res.data;
    } catch (error) {
        return error.response ? error.response.data : error.message;
    }
};

export const updateUser = async (id, data) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },
        };

        const res = await axios.put(`${BASE_URL}/${id}`, data, config);
        return res.data;
    } catch (error) {
        return error.response ? error.response.data : error.message;
    }
};

export const updateUserByAdmin = async (id, data) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },
        };

        const res = await axios.put(`${BASE_URL}/admin/${id}`, data, config);
        return res.data;
    } catch (error) {
        return error.response ? error.response.data : error.message;
    }
};

export const login = async (data) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },
        };

        const res = await axios.post(`${BASE_URL}/login`, data, config);
        return res.data;
    } catch (error) {
        return error.response ? error.response.data : error.message;
    }
};

export const getUsers = async () => {
    try {
        const token = getToken();
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const res = await axios.get(BASE_URL, config);
        return res.data;
    } catch (error) {
        return error.response ? error.response.data : error.message;
    }
};

export const deleteUser = async (id) => {
    try {
        const token = getToken();
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const res = await axios.delete(`${BASE_URL}/${id}`, config);
        return res.data;
    } catch (error) {
        return error.response ? error.response.data : error.message;
    }
};
