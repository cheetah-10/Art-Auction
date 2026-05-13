import React, { useState, useEffect, useContext } from 'react';
import { createArtworkApi, editArtworkApi, getArtworkByIdApi } from '../../api/artwork.api.js';
import { getAllCategoriesApi } from '../../api/category.api.js';
import { getAllTagsApi } from "../../api/tag.api.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
const ArtworkForm = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        Title: '',
        Description: '',
        InitialPrice: '',
        BuyNowPrice: '',
        AuctionStartTime: '',
        AuctionEndTime: '',
        CategoryId: '',
        TagIds: [],
        ArtworkImageURL: null
    });

    useEffect(() => {

        const fetchData = async () => {
            try {
                const [catRes, tagRes] = await Promise.all([
                    getAllCategoriesApi(token),
                    getAllTagsApi(token)
                ]);
                setCategories(catRes.data || catRes);
                setTags(tagRes.data || tagRes);
            } catch (err) {
                console.error("Error fetching setup data:", err);
            }
        };
        fetchData();
    }, [token]);

    useEffect(() => {
        if (isEdit && tags.length > 0) { 
            getArtworkByIdApi(id)
                .then(data => {
                    const existingTagIds = data.tags.map(tagName => {
                        const found = tags.find(t => t.name === tagName || t.tagId === tagName.tagId);
                        return found ? found.tagId : null;
                    }).filter(id => id !== null);

                    setFormData({
                        Title: data.title,
                        Description: data.description,
                        InitialPrice: data.initialPrice,
                        BuyNowPrice: data.buyNowPrice || '',
                        AuctionStartTime: data.auctionStartTime?.slice(0, 16),
                        AuctionEndTime: data.auctionEndTime?.slice(0, 16),
                        CategoryId: data.categoryId,
                        TagIds: existingTagIds,
                        ArtworkImageURL: null
                    });

                    if (data.image) {
                        setImagePreview(`https://i.pinimg.com/736x/b6/10/f1/b610f182a716fdab9b9e50d742243b62.jpg`);
                    }
                })
                .catch(err => console.error(err));
        }
    }, [id, token, tags]); 
 


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTagChange = (tagId) => {
        setFormData(prev => {
            const currentTags = [...prev.TagIds];
            if (currentTags.includes(tagId)) {
                return { ...prev, TagIds: currentTags.filter(id => id !== tagId) };
            } else {
                return { ...prev, TagIds: [...currentTags, tagId] };
            }
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, ArtworkImageURL: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Validation
        if (!formData.CategoryId) return toast.error("Please select a category");
        if (formData.TagIds.length === 0) return toast.error("Please select at least one tag");

        setLoading(true);
        const data = new FormData();

        // 2. collect data with proper formatting before sending to API
        Object.keys(formData).forEach(key => {
            if (key === 'TagIds') {
                // just append each tag ID separately since it's an array
                formData.TagIds.forEach(id => {
                    if (id) data.append('TagIds', Number(id));
                });
            } else if (key === 'ArtworkImageURL') {
                if (formData.ArtworkImageURL instanceof File) {
                    data.append('ArtworkImageURL', formData.ArtworkImageURL);
                }
            } else if (key === 'InitialPrice' || key === 'BuyNowPrice' || key === 'CategoryId') {
                const val = formData[key];
                if (val !== '' && val !== null) {
                    data.append(key, Number(val));
                }
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            if (isEdit) {
                await editArtworkApi(token, id, data);
                toast.success("Masterpiece updated successfully!");
            } else {
                await createArtworkApi(token, data); 
                toast.success("Masterpiece listed successfully!");
            }
            navigate('/my-artworks');
        } catch (err) {
            const serverError = err.response?.data?.errors || err.response?.data || "Unexpected error";
            console.error("Full Server Error:", serverError);
            toast.error("Failed to save: " + JSON.stringify(serverError));
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-[#FBFBFB] dark:bg-art-navy-100 py-12 px-4">
            <div className="max-w-5xl mx-auto bg-white dark:bg-art-navy-80 shadow-2xl border border-art-gold-20">

                <div className="bg-art-navy-100 p-8 border-b-4 border-art-gold-100 text-center">
                    <h1 className="font-serif text-3xl italic text-art-gold-100">{isEdit ? "Edit" : "Submit"} Masterpiece</h1>
                    <p className="text-art-navy-40 text-xs uppercase tracking-[0.3em] mt-2">Auction Registration</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 lg:p-12 space-y-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Image Upload */}
                        <div className="space-y-6">
                            <label className="text-xs uppercase tracking-widest font-bold text-art-navy-100 dark:text-art-gold-40">Artwork Visual</label>
                            <div className="relative border-2 border-dashed border-art-gold-20 aspect-[4/5] flex items-center justify-center bg-art-navy-20/5">
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <button type="button" onClick={() => setImagePreview(null)} className="absolute top-4 right-4 bg-art-terracotta-100 text-white p-2 rounded-full">✕</button>
                                    </>
                                ) : (
                                    <div className="text-center">
                                        <span className="text-4xl block mb-2">🖼️</span>
                                        <p className="text-sm italic dark:text-art-navy-40">Upload Masterpiece</p>
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" required={!isEdit}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-art-navy-60 dark:text-art-gold-40">Title</label>
                                <input type="text" name="Title" value={formData.Title} onChange={handleInputChange} required className="w-full border-b border-art-gold-20 py-2 bg-transparent dark:text-white outline-none font-serif italic text-lg" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-art-navy-60 dark:text-art-gold-40">Description</label>
                                <textarea name="Description" rows="3" value={formData.Description} onChange={handleInputChange} required className="w-full border border-art-gold-20 p-3 bg-transparent dark:text-white text-sm outline-none focus:border-art-gold-100"></textarea>
                            </div>

                            {/* Category Select */}
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-art-navy-60 dark:text-art-gold-40">Category</label>
                                <select name="CategoryId" value={formData.CategoryId} onChange={handleInputChange} required className="w-full border-b border-art-gold-20 py-2 bg-transparent dark:text-white outline-none">
                                    <option value="" className="text-art-navy-100">Select Category</option>
                                    {categories.map(cat => <option key={cat.id} value={cat.id} className="text-art-navy-100">{cat.name}</option>)}
                                </select>
                            </div>

                            {/* Tags Selection (Multi-select style) */}
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase font-bold text-art-navy-60 dark:text-art-gold-40 block">Tags (Style & Era)</label>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <button
                                            key={tag.tagId}
                                            type="button"
                                            onClick={() => handleTagChange(tag.tagId)}
                                            className={`px-3 py-1 text-[11px] uppercase tracking-tighter border transition-all ${formData.TagIds.includes(tag.tagId)
                                                ? 'bg-art-gold-100 border-art-gold-100 text-art-navy-100'
                                                : 'border-art-gold-20 text-art-navy-60 dark:text-art-gold-40 hover:border-art-gold-100'
                                                }`}
                                        >
                                            {tag.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Timing */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-10 border-t border-art-gold-20">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-art-navy-60 dark:text-art-gold-40">Start Price ($)</label>
                            <input type="number" name="InitialPrice" value={formData.InitialPrice} onChange={handleInputChange} required className="w-full border-b border-art-gold-20 py-2 bg-transparent dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-art-navy-60 dark:text-art-gold-40">Buy Now ($)</label>
                            <input type="number" name="BuyNowPrice" value={formData.BuyNowPrice} onChange={handleInputChange} className="w-full border-b border-art-gold-20 py-2 bg-transparent text-art-gold-100 font-bold" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-art-navy-60 dark:text-art-gold-40">Start Date</label>
                            <input type="datetime-local" name="AuctionStartTime" value={formData.AuctionStartTime} onChange={handleInputChange} required className="w-full border-b border-art-gold-20 py-2 bg-transparent dark:text-white text-xs" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-art-navy-60 dark:text-art-gold-40">End Date</label>
                            <input type="datetime-local" name="AuctionEndTime" value={formData.AuctionEndTime} onChange={handleInputChange} required className="w-full border-b border-art-gold-20 py-2 bg-transparent dark:text-white text-xs" />
                        </div>
                    </div>

                    <div className="flex justify-center pt-8">
                        <button type="submit" disabled={loading} className="px-16 py-4 bg-art-navy-100 dark:bg-art-gold-100 text-white dark:text-art-navy-100 font-bold uppercase tracking-[0.3em] hover:opacity-90 disabled:opacity-50">
                            {loading ? "Processing..." : isEdit ? "Update Artwork" : "List Artwork"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ArtworkForm;