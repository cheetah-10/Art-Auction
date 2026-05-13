import axios from "axios";
const BASE_URL = "http://localhost:5000/api/Category";

const buildCategoryPayload = (data) => {
    const formData = new FormData();
    formData.append('name', data.name || '');
    formData.append('description', data.description || '');

    if (data.image instanceof File) {
        formData.append('image', data.image);
    }

    if (data.imageUrl) {
        formData.append('imageUrl', data.imageUrl);
    }

    return formData;
};

// Create Category
export const createCategoryApi = async (token, data) => {
    const payload = buildCategoryPayload(data);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const res = await axios.post(`${BASE_URL}`, payload, config);
    return res.data;
};

// Get All Categories
export const getAllCategoriesApi = async () => {
    const res = await axios.get(`${BASE_URL}`);
    return res.data;
};

// get category by id
export const getCategoryByIdApi = async ( id) => {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
}

//edit category
export const editCategoryApi = async (token, id, data) => {

    const payload = {
        name: data.name,
        description: data.description,
        image: data.image || "",
    }

    const res = await axios.put(`${BASE_URL}/${id}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    return res.data;
}

// delete category
export const deleteCategoryApi = async (token, id) => {
    const res = await axios.delete(`${BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}
