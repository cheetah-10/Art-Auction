import React from 'react';
import { DollarSign, Clock, Users, TrendingUp } from 'lucide-react';
import { useArtworks } from '../../hooks/useArtworks';
import { useUsers } from '../../hooks/useUsers';
import { useNavigate } from 'react-router-dom';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from 'recharts';



const AdminOverview = () => {
    const { artworks, pendingArtworks } = useArtworks()
    const { users, pendingUsers, rejectedUsers } = useUsers()
    const chartData = [
    {
        name: 'Pending users',
        value: pendingUsers?.length || 0
    },
    {
        name: 'All users',
        value: users?.length || 0
    },
    {
        name: 'Rejected users',
        value: rejectedUsers?.length || 0
    }
];
    const navigate = useNavigate()
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard onClick={() => navigate('/admin/artworks')} title="Pending Art Submissions" value={pendingArtworks.length} icon={<Clock className="text-orange-500" />} trend="Requires Action" highlight />
                <StatCard title="Active Users" value={users.length} icon={<Users className="text-blue-500" />} trend="+5.4%" />
                <StatCard onClick={() => navigate('/admin/users')} title="Pending Artists" value={pendingUsers.length} icon={<Users className="text-blue-500" />} trend="Requires Action" />
                <StatCard title="Art Submissions" value={artworks.length} icon={<Clock className="text-orange-500" />} trend="+12.1%" highlight />

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 bg-white dark:bg-art-navy-90 p-8 border border-gray-100 dark:border-art-navy-80">
                    <h3 className="font-serif text-xl italic mb-6">User Analysis</h3>
                    <div className="h-64 bg-gray-50 dark:bg-art-navy-100 rounded flex items-center justify-center text-art-navy-40 italic">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        dataKey="value"
                                        outerRadius={90}
                                        label
                                    >
                                        <Cell fill="#D4A373" />
                                        <Cell fill="#2A3B4C" />
                                        <Cell fill="#B85C38" />
                                    </Pie>

                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                    </div>
                </div>
                <div className="lg:col-span-4 bg-white dark:bg-art-navy-90 p-8 border border-gray-100 dark:border-art-navy-80">
                    <h3 className="font-serif text-xl italic mb-6">Recent Logins</h3>
                    {/* List of recent activities */}
                    {users
                        .slice(-4)
                        .reverse()
                        .map((user, index) => (
                            <div
                                key={user.id}
                                className={`flex justify-between items-center p-3 m-3 rounded-md
            ${index % 2 === 0
                                        ? 'bg-art-gold-40 dark:bg-art-navy-80'
                                        : 'bg-art-navy-80 dark:bg-art-navy-90'
                                    }`}
                            >
                                <div>
                                    <p className={`font-semibold text-sm 
                                     ${index % 2 === 0
                                            ? 'text-art-navy-80'
                                            : 'text-art-gold-100'}
                                `}>{user.name}</p>
                                    <p className="text-xs text-art-navy-40">{user.role}</p>
                                </div>

                                <span className="text-[10px] text-art-navy-40">
                                    ID: {user.id}
                                </span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, trend, highlight }) => (
    <div className={`p-6 bg-white dark:bg-art-navy-90 border border-gray-100 dark:border-art-navy-80 ${highlight ? 'ring-1 ring-art-gold-100 shadow-lg' : ''}`}>
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-gray-50 dark:bg-art-navy-80 rounded-lg">{icon}</div>
            <span className="text-[9px] font-bold px-2 py-1 bg-gray-100 dark:bg-art-navy-80 rounded-full">{trend}</span>
        </div>
        <h4 className="text-art-navy-40 text-[10px] uppercase font-bold tracking-widest">{title}</h4>
        <p className="text-3xl font-serif italic mt-1">{value}</p>
    </div>
);

export default AdminOverview;