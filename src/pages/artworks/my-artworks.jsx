import React, { useState, useEffect, useContext } from 'react';
import { getMyArtworksApi, getArtworkByIdApi } from '../../api/artwork.api.js'
import { AuthContext } from "../../context/AuthContext.jsx";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader/Loader.jsx';
import ArtworkCard from '../../components/Cards/ArtworkCard.jsx';
import { set } from 'react-hook-form';

const MyArtworks = () => {
    const { token } = useContext(AuthContext);
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const BASE_URL = "http://localhost:5000/api";

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getMyArtworksApi(token);
            setArtworks(data || []);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load your masterpieces.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [token]);

    if (loading) {
        return (
            <Loader />
        );
    }

    return (

        <div className="min-h-screen bg-[#FBFBFB] dark:bg-art-navy-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-art-gold-20 pb-8">
                    <div>
                        <h1 className="font-serif text-4xl italic text-art-navy-100 dark:text-art-gold-100">My Collection</h1>
                        <p className="text-art-navy-60 dark:text-art-navy-40 text-sm tracking-widest uppercase mt-2">Private Curated Artworks</p>
                    </div>
                    <Link
                        to="/upload-artwork"
                        className="mt-6 md:mt-0 px-8 py-3 bg-art-navy-100 dark:bg-art-gold-100 text-white dark:text-art-navy-100 font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform"
                    >
                        Submit New Piece
                    </Link>
                </div>

                {artworks.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-art-gold-20">
                        <p className="text-art-navy-40 italic">Your gallery is currently empty.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {artworks.map((art) => (
                            <ArtworkCard key={art.artworkId} art={art} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyArtworks;