import { useState, useEffect, useContext } from "react";
import { createCategoryApi, deleteCategoryApi, editCategoryApi, getAllCategoriesApi } from "../api/category.api";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useContext(AuthContext)

     const fetchCategories = async () => {
            try {
                const data = await getAllCategoriesApi();
                setCategories(data);
            } catch (err) {
                console.error("Error fetching categories:", err);
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchCategories();
    }, [token]);

    const deleteCategory = async (id) => {
        try {
            await deleteCategoryApi(token, id)
            fetchCategories()
            toast.success('Category Deleted Successfully')
        }
        catch (err) {
            toast.error('Failed to remove category: ', err)
        }

    }
    const createCategory = async (data) => {
        try {
            await createCategoryApi(token, data)
            fetchCategories()
            toast.success('Category Created Successfully')

        }
        catch (err) {
            toast.error('Failed to create category: ', err)
        }

    }
   const updateCategory = async (id, data) => {
    try {
        await editCategoryApi(token, id, data)
        await fetchCategories()
        toast.success('Category Updated Successfully')
    } catch (err) {
        console.error('Update category failed:', err.response?.data || err)
        toast.error('Failed to update category')
    }
}


    return { categories, loading, deleteCategory, createCategory, updateCategory };
};