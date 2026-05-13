import React, { useState, useEffect, useContext } from 'react';
import { getAllArtworksApi } from '../../api/artwork.api';
import { AuthContext } from '../../context/AuthContext';
import AuctionCard from '../../components/Cards/AuctionCard';
import { Loader2 } from 'lucide-react';
import { getAllCategoriesApi } from '../../api/category.api';
import { getAllTagsApi } from '../../api/tag.api';
import AuctionFilters from '../../components/Filters/AuctionFilters';
import { useAuctions } from '../../hooks/useAuctions';
import { useCategories } from '../../hooks/useCategories';
import { useTags } from '../../hooks/useTags';

const AuctionsPage = () => {
    const { token } = useContext(AuthContext);

    const { categories } = useCategories(token);
    const { tags } = useTags(token);
    const initialFilters = {
        SearchTerm: "",
        ArtistName: "",
        CategoryId: "",
        TagIds: [],
        MinPrice: "",
        MaxPrice: "",
    };

    const [formData, setFormData] = useState(initialFilters);
    const [filters, setFilters] = useState(initialFilters);
    const { artworks, loading } = useAuctions( filters);


    return (
        <div className="min-h-screen bg-[#FDFDFD] dark:bg-art-navy-100 pt-24 pb-12 px-6">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <h1 className="font-serif text-5xl italic text-art-navy-100 dark:text-white mb-4">
                    The Auction <span className="text-art-gold-100">Gallery</span>
                </h1>
                <div className="h-1 w-24 bg-art-gold-100 mx-auto mb-6"></div>
                <p className="text-art-navy-60 dark:text-art-navy-40 uppercase tracking-[0.3em] text-xs">
                    Live Bidding & Upcoming Masterpieces
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-art-gold-100"></div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto">
                    <AuctionFilters
                        formData={formData}
                        setFormData={setFormData}
                        categories={categories}
                        tags={tags}
                        onApply={() => {
                            setFilters({
                                ...formData,
                                MinPrice: formData.MinPrice ? Number(formData.MinPrice) : "",
                                MaxPrice: formData.MaxPrice ? Number(formData.MaxPrice) : "",
                            });
                        }}
                        onReset={() => {
                            const reset = {
                                SearchTerm: "",
                                ArtistName: "",
                                CategoryId: "",
                                TagIds: [],
                                MinPrice: "",
                                MaxPrice: "",
                            };
                            setFormData(reset);
                            setFilters(reset);
                        }}
                    />
                    {artworks.length > 0 ? (<>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {artworks.map(art => (
                                <AuctionCard key={art.artworkId} artwork={art} />
                            ))}
                        </div>
                    </>

                    ) : (
                        <div className="text-center py-20 border border-dashed border-art-gold-20">
                            <p className="font-serif italic text-2xl text-art-navy-40">No active auctions at the moment.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AuctionsPage;