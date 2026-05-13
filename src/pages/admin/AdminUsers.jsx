import React, { useState, useEffect, useContext } from 'react';
import { UserPlus, Check, X, MoreVertical, Trash2, Mail, Calendar, Shield, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { 
    getAllUsersApi, 
    getPendingUsersApi, 
    getRejectedUsersApi, 
    approveUserApi, 
    rejectUserApi, 
    deleteAccountApi 
} from '../../api/auth.api'; 
import Loader from '../../components/Loader/Loader';

const AdminUsers = () => {
    const { token } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null); 

    const fetchUsers = async () => {
        setLoading(true);
        try {
            let data = [];
            if (activeTab === 'all') {
                data = await getAllUsersApi(token);
            } else if (activeTab === 'pending') {
                data = await getPendingUsersApi(token);
            } else if (activeTab === 'rejected') {
                data = await getRejectedUsersApi(token);
            }
            setUsers(data);
        } catch (error) {
            toast.error("Failed to load users data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchUsers();
    }, [token, activeTab]);

    const handleApprove = async (e, userId) => {
        e.stopPropagation();
        try {
            await approveUserApi(token, userId);
            toast.success("User approved successfully");
            fetchUsers(); 
        } catch (error) {
            toast.error("Failed to approve user");
        }
    };

    const handleReject = async (e, userId) => {
        e.stopPropagation();
        try {
            await rejectUserApi(token, userId);
            toast.success("User rejected successfully");
            fetchUsers();
        } catch (error) {
            toast.error("Failed to reject user");
        }
    };

    const handleDelete = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
        
        try {
            await deleteAccountApi(token, userId);
            toast.success("User account deleted permanently");
            setSelectedUser(null); 
            fetchUsers();
        } catch (error) {
            toast.error("Failed to delete user");
        }
    };

    const getStatusStyle = (status) => {
        switch(status) {
            case 'Approved': return 'bg-green-50 text-green-700 border-green-200';
            case 'Pending': return 'bg-orange-50 text-orange-700 border-orange-200';
            case 'Rejected': return 'bg-red-50 text-red-700 border-red-200';
            default: return 'bg-gray-50 text-gray-700';
        }
    };

    const getRoleStyle = (role) => {
        switch(role) {
            case 'Admin': return 'bg-art-gold-10 text-art-gold-100 border-art-gold-100';
            case 'Artist': return 'bg-purple-50 text-purple-700 border-purple-200';
            case 'Buyer': return 'bg-blue-50 text-blue-700 border-blue-200';
            default: return 'bg-gray-50 text-gray-700';
        }
    };

    return (
        <div className="space-y-6 relative">
            {/* Header Actions */}
            <div className="flex justify-between items-center">
                <h3 className="font-serif text-3xl italic text-art-navy-100 dark:text-white">Directory</h3>
                <button className="bg-art-navy-100 dark:bg-art-gold-100 text-white dark:text-art-navy-100 px-6 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-all">
                    <UserPlus size={16} /> Add Member
                </button>
            </div>

            {/* Tabs Filter */}
            <div className="flex gap-6 border-b border-gray-200 dark:border-art-navy-80 pb-2">
                {['all', 'pending', 'rejected'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-xs font-bold uppercase tracking-[0.1em] pb-2 border-b-2 transition-all ${
                            activeTab === tab 
                            ? 'border-art-gold-100 text-art-gold-100' 
                            : 'border-transparent text-art-navy-40 hover:text-art-navy-100 dark:hover:text-white'
                        }`}
                    >
                        {tab} Users
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
                                <th className="px-6 py-4 text-left">Identity</th>
                                <th className="px-6 py-4 text-left">Role</th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-left">Joined</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-art-navy-80">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-art-navy-40 italic font-serif">
                                        No users found in this category.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr 
                                        key={user.id} 
                                        onClick={() => setSelectedUser(user)}
                                        className="hover:bg-gray-50 dark:hover:bg-art-navy-80/50 transition-colors cursor-pointer group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 bg-art-navy-10 dark:bg-art-navy-80 rounded-full flex items-center justify-center text-art-navy-100 dark:text-white font-bold text-xs uppercase">
                                                    {user.name.substring(0, 2)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-art-navy-100 dark:text-white">{user.name}</p>
                                                    <p className="text-[11px] text-art-navy-40">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[9px] px-2.5 py-1 font-bold uppercase border rounded-sm ${getRoleStyle(user.role)}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {user.status === 'Pending' && <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>}
                                                <span className={`text-[10px] font-bold uppercase tracking-wide ${user.status === 'Pending' ? 'text-orange-600' : user.status === 'Approved' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {user.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-art-navy-60 dark:text-art-navy-40 font-mono">
                                            {new Date(user.registrationDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            {user.status === 'Pending' && (
                                                <>
                                                    <button onClick={(e) => handleApprove(e, user.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                                                        <Check size={18} />
                                                    </button>
                                                    <button onClick={(e) => handleReject(e, user.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
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

            {/* User Details Modal (Pop Out) */}
            {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-art-navy-100/40 backdrop-blur-sm" onClick={() => setSelectedUser(null)}>
                    <div 
                        className="bg-white dark:bg-art-navy-90 w-full max-w-lg shadow-2xl overflow-hidden border border-art-gold-100/20 transform transition-all"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        {/* Modal Header */}
                        <div className="bg-gray-50 dark:bg-art-navy-100 p-6 border-b border-gray-100 dark:border-art-navy-80 flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-art-gold-10 border border-art-gold-100/30 rounded-full flex items-center justify-center text-art-gold-100 font-serif text-2xl uppercase">
                                    {selectedUser.name.substring(0, 2)}
                                </div>
                                <div>
                                    <h2 className="font-serif text-2xl italic text-art-navy-100 dark:text-white">{selectedUser.name}</h2>
                                    <p className="text-xs text-art-navy-40 font-mono mt-1">ID: REF-{selectedUser.id}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedUser(null)} className="text-art-navy-40 hover:text-art-terracotta-100 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-art-navy-40 text-[10px] uppercase font-bold tracking-widest"><Mail size={12}/> Email</div>
                                    <p className="text-sm dark:text-white truncate" title={selectedUser.email}>{selectedUser.email}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-art-navy-40 text-[10px] uppercase font-bold tracking-widest"><Shield size={12}/> Role</div>
                                    <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 font-bold uppercase border rounded-sm ${getRoleStyle(selectedUser.role)}`}>{selectedUser.role}</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-art-navy-40 text-[10px] uppercase font-bold tracking-widest"><Calendar size={12}/> Registration Date</div>
                                    <p className="text-sm dark:text-white font-mono">{new Date(selectedUser.registrationDate).toLocaleString()}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-art-navy-40 text-[10px] uppercase font-bold tracking-widest"><ExternalLink size={12}/> Portfolio</div>
                                    {selectedUser.portfolio ? (
                                        <a href={selectedUser.portfolio} target="_blank" rel="noreferrer" className="text-sm text-art-gold-100 hover:underline">View Portfolio</a>
                                    ) : (
                                        <p className="text-sm text-art-navy-40 italic">Not provided</p>
                                    )}
                                </div>
                            </div>

                            {/* Danger Zone */}
                            <div className="mt-8 pt-6 border-t border-red-100 dark:border-red-900/30">
                                <h4 className="text-red-600 text-[10px] font-bold uppercase tracking-widest mb-4">Danger Zone</h4>
                                <button 
                                    onClick={() => handleDelete(selectedUser.id)}
                                    className="w-full flex justify-center items-center gap-2 bg-white dark:bg-art-navy-80 border border-red-200 dark:border-red-900/50 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 py-3 text-sm font-bold transition-colors"
                                >
                                    <Trash2 size={18} /> Permanently Delete Account
                                </button>
                                <p className="text-[10px] text-art-navy-40 text-center mt-3">
                                    This action will remove all user data and cannot be reversed.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;