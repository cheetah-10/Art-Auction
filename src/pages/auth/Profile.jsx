import React, { useEffect, useState } from 'react';
import { getProfileApi } from '../../api/auth.api';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from 'react-router-dom';
import { deleteAccountApi } from '../../api/auth.api';

const Profile = () => {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfileApi(token); // This should ideally be fetched using useEffect and stored in state
                setUserData(data);
            }
            catch (error) {
                console.error("Failed to fetch profile data:", error);
            }
        }
        if (token) {
            fetchProfile();
        }
    }, [token]);

    // const handleDeleteAccount = async () => {
    //     if (!userData?.id) return;
    //     if (!window.confirm("Are you sure you want to delete your account?")) return;

    //     try {
    //         await deleteAccountApi(token, userData.id);
    //         console.log("DELETE RESPONSE:", res);

    //         logout(); // Log out the user after deleting their account
    //         navigate('/')
    //     } catch (error) {
    //         console.error("Failed to delete account:", error);
    //     }
    // };
    const handleLogout = () => {
        logout();
        navigate('/login');
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-[#FBFBFB] dark:bg-art-navy-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">

                {/* Header Section / Cover */}
                <div className="relative bg-art-navy-100 dark:bg-art-navy-80 h-48 rounded-t-sm border-b-4 border-art-gold-100 overflow-hidden">

                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-art-gold-100 via-transparent to-transparent"></div>
                    </div>
                </div>

                {/* Profile Card Content */}
                <div className="bg-white dark:bg-art-navy-80 shadow-xl px-8 pb-12 relative border border-art-gold-20">

                    {/* Avatar Area */}
                    <div className="relative -top-16 flex flex-col items-center md:items-start md:flex-row md:gap-8">
                        <div className="w-32 h-32 rounded-full border-4 border-white dark:border-art-navy-100 bg-art-gold-20 flex items-center justify-center text-art-gold-100 text-4xl font-serif font-bold shadow-lg">
                            {userData?.name?.charAt(0)}
                        </div>

                        <div className="mt-20 md:mt-16 text-center md:text-left flex-1">
                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                                <h1 className="text-3xl font-serif italic text-art-navy-100 dark:text-white font-bold">
                                    {userData?.name}
                                </h1>
                                <span className={`px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold self-center 
                  ${userData?.status === 'Approved' ? 'bg-art-sage-60/20 text-art-sage-100' : 'bg-art-gold-20 text-art-gold-100'}`}>
                                    {userData?.status}
                                </span>
                            </div>
                            <p className="text-art-gold-100 font-medium uppercase tracking-[0.2em] text-xs mt-2">
                                {userData?.role} • Member Since {formatDate(userData?.registrationDate)}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-20 md:mt-16 flex gap-3">
                            <button onClick={handleLogout}
                                className="px-6 py-2 border border-art-gold-100 text-art-gold-100 text-xs font-bold uppercase tracking-widest hover:bg-art-gold-100 hover:text-white transition-all">
                                Logout
                            </button>

                        </div>
                    </div>
                    {userData?.role === 'Buyer' && (

                        <div className="flex gap-2">
                            <button onClick={() => navigate('/my-wins')}
                                className="px-6 py-2 border border-art-gold-100 text-art-gold-100 text-xs font-bold uppercase tracking-widest hover:bg-art-gold-100 hover:text-white transition-all">
                                My Wins
                            </button>
                            <button onClick={() => navigate('/my-bids')}
                                className="px-6 py-2 border border-art-gold-100 text-art-gold-100 text-xs font-bold uppercase tracking-widest hover:bg-art-gold-100 hover:text-white transition-all">
                                My Bids
                            </button>
                        </div>)}

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 border-t border-art-gold-20 pt-10">

                        {/* Info Item */}
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-art-navy-40 block">Email Address</label>
                            <p className="text-art-navy-100 dark:text-white font-medium">{userData?.email}</p>
                        </div>

                        {/* Info Item */}
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-art-navy-40 block">Account ID</label>
                            <p className="text-art-navy-100 dark:text-white font-medium">#000{userData?.id}</p>
                        </div>

                        {/* Portfolio Section */}
                        {userData?.role === 'Artist' && (

                            <div className="md:col-span-2 space-y-3 pt-4">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-art-navy-40 block">Portfolio / Artworks</label>
                                {
                                    <div className="bg-art-navy-20/10 dark:bg-art-navy-100/50 p-6 rounded-sm border border-dashed border-art-navy-20 flex flex-col items-center justify-center">
                                        <p className='text-5xl decoration-dashed font-light text-art-navy-40'>+</p>
                                        <button onClick={() => navigate('/upload-artwork')} className="mt-4 text-xs text-art-gold-100 font-bold uppercase underline">Upload new piece</button>


                                    </div>
                                }
                            </div>
                        )}

                    </div>
                    {/* Special Message for Admin Role */}
                    {userData?.role === 'Admin' && (
                        <div className="mt-12 bg-art-navy-100 p-6 rounded-sm flex items-center justify-between">
                            <div>
                                <p className="text-art-gold-100 text-sm font-bold uppercase tracking-widest">Admin Dashboard Access</p>
                                <p className="text-art-navy-40 text-xs mt-1">You have full control over auctions and user management.</p>
                            </div>
                            <button className="bg-art-gold-100 text-art-navy-100 px-4 py-2 text-[10px] font-bold uppercase tracking-tighter hover:bg-white transition-all">
                                Go to Dashboard
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Profile;