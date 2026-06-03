import React, { useState, useEffect, useContext } from 'react';
import { Palette, Check, X, MoreVertical, Clock, DollarSign, Tag, Gavel, Image as ImageIcon, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { getArtworkByIdApi} from '../../api/artwork.api';
import { useArtworks } from '../../hooks/useArtworks';
import Loader from '../../components/Loader/Loader';
const AdminArtworks = () => {
    const { token } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('all'); 
    const [modalLoading, setModalLoading] = useState(false);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const {artworks, loading, pendingArtworks, rejectedArtworks, handleApprove, handleReject} = useArtworks();

    const getDisplayedArtworks = () => {
        switch (activeTab) {
            case 'pending':
                return pendingArtworks;
            case 'rejected':
                return rejectedArtworks;
            case 'all':
            default:
                return artworks;
        }
    };

    const displayedArtworks = getDisplayedArtworks();

    const handleRowClick = async (artworkId) => {
        setModalLoading(true);
        setSelectedArtwork({ id: 'loading' });
        try {
            const data = await getArtworkByIdApi(artworkId);
            setSelectedArtwork(data);
        } catch (error) {
            console.error('Failed to load artwork details:', error);
            toast.error("Failed to load artwork details");
            setSelectedArtwork(null);
        } finally {
            setModalLoading(false);
        }
    };
    
    const getAuctionStatusStyle = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-50 text-green-700 border-green-200';
            case 'NotStarted': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'Sold': return 'bg-art-gold-10 text-art-gold-100 border-art-gold-100';
            case 'Ended': return 'bg-gray-100 text-gray-700 border-gray-300';
            default: return 'bg-gray-50 text-gray-700';
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    const renderImage = (imgUrl) => {
        if (!imgUrl) return <div className="w-full h-full bg-gray-100 dark:bg-art-navy-80 flex items-center justify-center text-gray-400"><ImageIcon size={20} /></div>;
        const imagePath = imgUrl.startsWith('http') ? imgUrl : `http://localhost:5000${imgUrl}`;
        return <img src={imagePath} alt="Artwork" className="w-full h-full object-cover" />;
    };

    return (
        <div className="space-y-6 relative">
            {/* Header Actions */}
            <div className="flex justify-between items-center">
                <h3 className="font-serif text-3xl italic text-art-navy-100 dark:text-white">Artwork Governance</h3>
                <button className="bg-art-navy-100 dark:bg-art-gold-100 text-white dark:text-art-navy-100 px-6 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-all">
                    <Palette size={16} /> Manage Gallery
                </button>
            </div>

            {/* Tabs Filter */}
            <div className="flex gap-6 border-b border-gray-200 dark:border-art-navy-80 pb-2">
                {['all', 'pending', 'rejected'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-xs font-bold uppercase tracking-[0.1em] pb-2 border-b-2 transition-all 
                            ${activeTab === tab
                            ? 'border-art-gold-100 text-art-gold-100'
                            : 'border-transparent text-art-navy-40 hover:text-art-navy-100 dark:hover:text-white'
                            }`}
                    >
                        {tab} Submissions
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-art-navy-90 border border-gray-200 dark:border-art-navy-80 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="py-20"><Loader /></div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-art-navy-100 border-b border-gray-200 dark:border-art-navy-80 text-[10px] uppercase tracking-[0.2em] font-bold text-art-navy-40">
                            <tr>
                                <th className="px-6 py-4 text-left">Masterpiece</th>
                                <th className="px-6 py-4 text-left">Artist & Category</th>
                                <th className="px-6 py-4 text-left">Pricing</th>
                                <th className="px-6 py-4 text-left">Auction Status</th>
                                <th className="px-6 py-4 text-right">Review</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-art-navy-80">
                            {displayedArtworks.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-art-navy-40 italic font-serif">
                                        No artworks found in this category.
                                    </td>
                                </tr>
                            ) : (
                                displayedArtworks.map((artwork) => (
                                    <tr
                                        key={artwork.artworkId}
                                        onClick={() => handleRowClick(artwork.artworkId)}
                                        className="hover:bg-gray-50 dark:hover:bg-art-navy-80/50 transition-colors cursor-pointer group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded overflow-hidden shrink-0 border border-gray-200 dark:border-art-navy-80">
                                                    {renderImage(artwork.artworkImage)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-art-navy-100 dark:text-white truncate max-w-[200px]" title={artwork.title}>
                                                        {artwork.title}
                                                    </p>
                                                    <p className="text-[11px] text-art-navy-40 font-mono mt-0.5">ID: {artwork.artworkId}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold dark:text-white">{artwork.artistName}</p>
                                            <span className="inline-block mt-1 text-[9px] px-2 py-0.5 bg-gray-100 dark:bg-art-navy-80 text-art-navy-60 dark:text-gray-300 font-bold uppercase rounded-sm">
                                                {artwork.categoryName}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-art-gold-100">{formatCurrency(artwork.currentPrice)}</p>
                                            <p className="text-[10px] text-art-navy-40 mt-0.5">Start: {formatCurrency(artwork.initialPrice)}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[9px] px-2.5 py-1 font-bold uppercase border rounded-sm ${getAuctionStatusStyle(artwork.auctionStatus)}`}>
                                                {artwork.auctionStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            {activeTab === 'pending' && (
                                                <>
                                                    <button onClick={(e) => handleApprove(e, artwork.artworkId)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                                                        <Check size={18} />
                                                    </button>
                                                    <button onClick={(e) => handleReject(e, artwork.artworkId)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                                                        <X size={18} />
                                                    </button>
                                                </>
                                            )}
                                            <button className="p-2 text-art-navy-20 hover:text-art-navy-100 dark:hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                                                <MoreVertical size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Artwork Details Modal */}
            {selectedArtwork && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-art-navy-100/60 backdrop-blur-md" onClick={() => setSelectedArtwork(null)}>
                    <div
                        className="bg-white dark:bg-art-navy-90 w-full max-w-4xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-art-gold-100/20 transform transition-all max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {modalLoading || selectedArtwork.id === 'loading' ? (
                            <div className="w-full p-20 flex justify-center"><Loader /></div>
                        ) : (
                            <>
                                {/* Left Side: Image */}
                                <div className="w-full md:w-2/5 bg-gray-50 dark:bg-art-navy-100 relative">
                                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                        <span className={`text-[10px] px-2.5 py-1 font-bold uppercase border shadow-sm ${getAuctionStatusStyle(selectedArtwork.auctionStatus)}`}>
                                            {selectedArtwork.auctionStatus}
                                        </span>
                                    </div>
                                    <div className="h-64 md:h-full w-full">
                                        {renderImage(selectedArtwork.image || selectedArtwork.artworkImage)}
                                    </div>
                                </div>

                                {/* Right Side: Details */}
                                <div className="w-full md:w-3/5 p-8 overflow-y-auto flex flex-col">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h2 className="font-serif text-3xl italic text-art-navy-100 dark:text-white mb-2">{selectedArtwork.title}</h2>
                                            <p className="text-sm text-art-gold-100 font-bold uppercase tracking-widest">By {selectedArtwork.artistName}</p>
                                        </div>
                                        <button onClick={() => setSelectedArtwork(null)} className="text-art-navy-40 hover:text-art-terracotta-100 transition-colors">
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <p className="text-sm text-art-navy-60 dark:text-gray-300 mb-8 leading-relaxed">
                                        {selectedArtwork.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-6 mb-8">
                                        <div className="bg-gray-50 dark:bg-art-navy-100 p-4 rounded-sm border border-gray-100 dark:border-art-navy-80">
                                            <div className="flex items-center gap-2 text-art-navy-40 text-[10px] uppercase font-bold tracking-widest mb-2"><DollarSign size={14} /> Pricing</div>
                                            <p className="text-2xl font-serif italic text-art-navy-100 dark:text-white">{formatCurrency(selectedArtwork.currentPrice)}</p>
                                            <p className="text-[10px] text-art-navy-40 mt-1">Buy Now: {formatCurrency(selectedArtwork.buyNowPrice)}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-art-navy-100 p-4 rounded-sm border border-gray-100 dark:border-art-navy-80">
                                            <div className="flex items-center gap-2 text-art-navy-40 text-[10px] uppercase font-bold tracking-widest mb-2"><Gavel size={14} /> Engagement</div>
                                            <p className="text-2xl font-serif italic text-art-navy-100 dark:text-white">{selectedArtwork.totalBids || 0} Bids</p>
                                            <p className="text-[10px] text-art-navy-40 mt-1">Category: {selectedArtwork.categoryName}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-start gap-3">
                                            <Clock size={16} className="text-art-navy-40 mt-0.5" />
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-art-navy-40 tracking-widest">Auction Timeline</p>
                                                <p className="text-xs dark:text-white mt-1"><span className="font-bold">Starts:</span> {formatDate(selectedArtwork.auctionStartTime)}</p>
                                                <p className="text-xs dark:text-white mt-0.5"><span className="font-bold">Ends:</span> {formatDate(selectedArtwork.auctionEndTime)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Tag size={16} className="text-art-navy-40 mt-0.5" />
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-art-navy-40 tracking-widest mb-1.5">Tags</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedArtwork.tags?.map((tag, idx) => (
                                                        <span key={idx} className="text-[10px] bg-art-navy-10 dark:bg-art-navy-80 px-2 py-1 text-art-navy-100 dark:text-white rounded-sm">#{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons inside Modal for Pending artworks */}
                                    {activeTab === 'pending' && (
                                        <div className="mt-auto pt-6 border-t border-gray-100 dark:border-art-navy-80 flex gap-4">
                                            <button
                                                onClick={(e) => handleApprove(e, selectedArtwork.artworkId)}
                                                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 text-xs font-bold uppercase tracking-widest transition-colors flex justify-center items-center gap-2"
                                            >
                                                <Check size={16} /> Approve Piece
                                            </button>
                                            <button
                                                onClick={(e) => handleReject(e, selectedArtwork.artworkId)}
                                                className="flex-1 border border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 py-3 text-xs font-bold uppercase tracking-widest transition-colors flex justify-center items-center gap-2"
                                            >
                                                <X size={16} /> Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminArtworks;