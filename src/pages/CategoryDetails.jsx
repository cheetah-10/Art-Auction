import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryByIdApi } from '../api/category.api';
import { ArrowLeft, Sparkles, ShoppingBag, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '../components/Loader/Loader';

const CategoryDetails = () => {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const BaseURL = 'http://localhost:5000'

    const defaultHero = "https://pbs.twimg.com/media/B9Wa-KTCYAAVX9W.jpg";

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const data = await getCategoryByIdApi( id);
                setCategory(data);
            } catch (err) {
                toast.error("Category details not found");
                navigate('/categories');
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchCategory();
    }, [id, navigate]);

    if (loading) return <Loader />;
    if (!category) return null;

    return (
        <div className="min-h-screen bg-[#FDFDFD] dark:bg-art-navy-100">
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <img 
                    src={`${BaseURL}/${category.image}` || defaultHero} 
                    alt={category.name}
                    className="w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-art-navy-100/60 via-art-navy-100/40 to-[#FDFDFD] dark:to-art-navy-100"></div>
                
                <button 
                    onClick={() => navigate(-1)}
                    className="absolute top-32 left-6 md:left-12 flex items-center gap-2 text-white/80 hover:text-art-gold-100 transition-colors uppercase text-[10px] font-bold tracking-[0.2em]"
                >
                    <ArrowLeft size={16} /> Back to Collections
                </button>

                {/* Title inside Hero */}
                <div className="absolute bottom-10 left-6 md:left-12 max-w-4xl">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="w-12 h-[1px] bg-art-gold-100"></span>
                        <span className="text-art-gold-100 text-xs font-bold uppercase tracking-[0.4em]">Curated Category</span>
                    </div>
                    <h1 className="font-serif text-6xl md:text-8xl italic text-white capitalize drop-shadow-2xl">
                        {category.name}
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* Left: Description */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="flex items-start gap-4 p-8 bg-white dark:bg-art-navy-90 border border-art-gold-10 shadow-sm relative overflow-hidden">
                            <Info className="text-art-gold-100 flex-shrink-0" size={24} />
                            <div>
                                <h3 className="font-serif text-2xl text-art-navy-100 dark:text-white mb-4 italic">About this Collection</h3>
                                <p className="text-art-navy-60 dark:text-art-navy-40 leading-relaxed text-lg first-letter:text-4xl first-letter:font-serif first-letter:text-art-gold-100">
                                    {category.description || "In this exclusive gallery, we showcase a meticulously curated selection of items that embody craftsmanship and historical significance. Each piece is vetted by our experts to ensure it meets the highest standards of luxury and authenticity."}
                                </p>
                            </div>
                            {/* Decorative Sparkle */}
                            <Sparkles className="absolute -right-4 -top-4 text-art-gold-10/20" size={100} />
                        </div>

                        {/* Call to Action - Browse Auctions */}
                        <div className="pt-8">
                            <button 
                                onClick={() => navigate(`/auctions?category=${category.id}`)}
                                className="group flex items-center gap-6 bg-art-navy-100 dark:bg-art-gold-100 text-white dark:text-art-navy-100 px-10 py-5 rounded-none hover:bg-art-gold-100 dark:hover:bg-white transition-all duration-500"
                            >
                                <ShoppingBag size={20} />
                                <span className="font-bold uppercase tracking-[0.2em] text-sm">Browse Live Auctions</span>
                                <div className="w-8 h-[1px] bg-white dark:bg-art-navy-100 group-hover:w-12 transition-all"></div>
                            </button>
                        </div>
                    </div>

                    {/* Right: Stats or Details (Sidebar style) */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32 space-y-6">
                            <div className="border-l-4 border-art-gold-100 pl-6 py-4">
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-art-navy-40 mb-2">Category Reference</h4>
                                <p className="font-serif text-xl text-art-navy-100 dark:text-white">REF-00{category.id}-ART</p>
                            </div>
                            
                            <div className="bg-art-navy-10 dark:bg-art-navy-90/50 p-8">
                                <h4 className="font-serif text-lg italic text-art-navy-100 dark:text-white mb-4 text-center">Collector's Note</h4>
                                <p className="text-sm text-center text-art-navy-60 dark:text-art-navy-40 italic leading-relaxed italic">
                                    "Art is the only way to run away without leaving home. This collection represents the pinnacle of human expression."
                                </p>
                                <div className="mt-6 flex justify-center">
                                    <div className="h-[1px] w-20 bg-art-gold-20"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Section - ممكن تحطي فيه حاجة زي "Recommended categories" */}
        </div>
    );
};

export default CategoryDetails;