import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Palette, Layers, Tag, LogOut, Bell } from 'lucide-react';
import AdminSidebar from '../../components/Sidebar/AdminSidebar';
import Navbar from '../../components/Navbar/Navbar';
const AdminLayout = () => {
    const { pathname } = useLocation();

    const menuItems = [
        { path: '/admin', label: 'Overview', icon: <LayoutDashboard size={20} /> },
        { path: '/admin/users', label: 'Users', icon: <Users size={20} /> },
        { path: '/admin/artworks', label: 'Artworks', icon: <Palette size={20} /> },
        { path: '/admin/categories', label: 'Categories', icon: <Layers size={20} /> },
        { path: '/admin/tags', label: 'Tags', icon: <Tag size={20} /> },
    ];

    return (<>

        <div className="flex min-h-screen bg-[#F8F9FA] dark:bg-art-navy-100 text-art-navy-100 dark:text-white">
            <AdminSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">

        <Navbar />


                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    </>
    );
};

export default AdminLayout;