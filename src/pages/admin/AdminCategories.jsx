import React, { useContext, useState } from 'react';
import { Plus } from 'lucide-react';
import { useCategories } from '../../hooks/useCategories';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../../components/Loader/Loader';
import CategoryAdminCard from '../../components/Cards/CategoryAdminCard';
import { CategoryModal } from '../../components/Modals/CategoryModal';

const AdminCategories = () => {
    const { token } = useContext(AuthContext)
    const { categories, loading, createCategory, updateCategory, deleteCategory } = useCategories()

    const [isOpen, setIsOpen] = useState(false)
    const [editData, setEditData] = useState(null)

    if (loading) return <Loader />
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="font-serif text-2xl italic">Gallery Categories</h3>
                <button
                    onClick={() => {
                        setEditData(null)
                        setIsOpen(true)
                    }}
                    className="bg-art-navy-100 dark:bg-art-gold-100 text-white dark:text-art-navy-100 px-6 py-2 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-90">
                    <Plus size={14} /> Add Category
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    categories.map((c) =>
                        <CategoryAdminCard key={c.id}
                            category={c}
                            onEdit={() => {
                                setEditData(c)
                                setIsOpen(true)
                            }} 
                             onDelete={() => deleteCategory(c.id)}/>)
                }
            </div>
            <CategoryModal
                isOpen={isOpen}
                initialData={editData}
                onClose={() => setIsOpen(false)}
                onSubmit={(data) => {
                    if (editData) {
                        updateCategory(editData.id, data)
                    } else {
                        createCategory(data)
                    }
                    setIsOpen(false)
                }}
            />
        </div>
    );
};

export default AdminCategories;