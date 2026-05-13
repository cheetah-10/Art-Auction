import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Palette, Layers, Tag, LogOut } from 'lucide-react';

const AdminSidebar = () => {
    const { pathname } = useLocation();
    const [isOpen, setIsOpen] = React.useState(false);
    const menuItems = [
        { path: '/admin', label: 'Overview', icon: <LayoutDashboard size={20} /> },
        { path: '/admin/users', label: 'Users', icon: <Users size={20} /> },
        { path: '/admin/artworks', label: 'Artworks', icon: <Palette size={20} /> },
        { path: '/admin/categories', label: 'Categories', icon: <Layers size={20} /> },
        { path: '/admin/tags', label: 'Tags', icon: <Tag size={20} /> },
    ];

    return (
        <aside className={`${isOpen ? 'w-64' : 'w-21'} bg-white dark:bg-art-navy-90 border-r left-0  border-gray-200 dark:border-art-navy-80 flex flex-col max-h-screen  z-30 transition-width duration-300`}>
            <div className="p-8">
                <div className="flex justify-between" onClick={() => setIsOpen(!isOpen)}>

                   {isOpen && <h1 className="font-serif text-2xl italic text-art-gold-100">ArtHouse</h1>}
                    <svg className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                    </svg>
                </div>

               {isOpen && <p className="text-[9px] uppercase tracking-[0.3em] text-art-navy-40 mt-1 font-bold">Admin Terminal</p>}

            </div>


            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-4 px-4 py-3 text-sm font-medium transition-all duration-200 ${pathname === item.path
                            ? 'bg-art-gold-100/10 text-art-gold-100 border-r-4 border-art-gold-100'
                            : 'text-art-navy-40 hover:bg-gray-50 dark:hover:bg-art-navy-80 hover:text-art-navy-100 dark:hover:text-white'
                            }`}
                    >
                        {item.icon}
                        {isOpen  && item.label}
                    </Link>
                ))}
            </nav>

            <div className="p-6 border-t border-gray-100 dark:border-art-navy-80">
                <button className="flex items-center gap-4 text-art-terracotta-100 text-[10px] font-bold uppercase tracking-widest hover:opacity-70 transition-all">
                    <LogOut size={16} /> {isOpen && 'Terminate Session'}
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;