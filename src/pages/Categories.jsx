import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCategoriesApi } from '../api/category.api';
import { ArrowRight, Box } from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '../components/Loader/Loader';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const placeholders = {
        watches: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80",
        vases: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80",
        default: "https://images.unsplash.com/photo-1490312278390-ab6414f81c81?auto=format&fit=crop&q=80"
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategoriesApi();
                setCategories(data);
            } catch (err) {
                toast.error("Failed to showcase categories");
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-[#F9F9F9] dark:bg-art-navy-100 pt-28 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                
                {/* Section Header */}
                <div className="mb-16 text-center md:text-left">
                    <h1 className="font-serif text-5xl md:text-6xl italic text-art-navy-100 dark:text-white mb-4">
                        The Collections
                    </h1>
                    <div className="w-24 h-1 bg-art-gold-100 mx-auto md:mx-0"></div>
                    <p className="mt-6 text-art-navy-60 dark:text-art-navy-40 max-w-lg uppercase tracking-widest text-[10px] font-bold">
                        Browse our curated categories of rare artifacts and timeless masterpieces.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {categories.map((cat) => (
                        <div 
                            key={cat.id}
                            onClick={() => navigate(`/category/${cat.id}`)}
                            className="group relative h-[500px] overflow-hidden cursor-pointer bg-art-navy-10"
                        >
                            {/* Background Image */}
                            <img 
                                src={cat.image || placeholders[cat.name.toLowerCase()] || placeholders.default}
                                alt={cat.name}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-art-navy-100/90 via-art-navy-100/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <span className="text-art-gold-100 text-xs font-bold uppercase tracking-[0.3em] mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    Explore Gallery
                                </span>
                                <h2 className="font-serif text-4xl text-white italic mb-3 capitalize">
                                    {cat.name}
                                </h2>
                                <p className="text-art-navy-20 text-sm line-clamp-2 mb-6 max-w-xs transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                                    {cat.description || "Discover the finest selection of handpicked treasures in this category."}
                                </p>
                                
                                <div className="flex items-center justify-between border-t border-white/20 pt-4">
                                    <span className="text-white text-[10px] uppercase tracking-widest font-bold">View Items</span>
                                    <div className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white group-hover:bg-art-gold-100 group-hover:border-art-gold-100 transition-all duration-300">
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Frame on Hover */}
                            <div className="absolute inset-4 border border-art-gold-100/0 group-hover:border-art-gold-100/30 transition-all duration-700 pointer-events-none"></div>
                        </div>
                    ))}
                </div>

                {categories.length === 0 && (
                    <div className="text-center py-40">
                        <Box className="mx-auto text-art-navy-20 mb-4" size={48} />
                        <p className="text-art-navy-40 font-serif italic">No collections available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Categories;