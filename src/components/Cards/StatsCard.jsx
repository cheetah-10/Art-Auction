const StatCard = ({ icon, label, value, sub }) => (

    <div className="bg-white dark:bg-art-navy-80 p-6 border border-art-gold-20 shadow-sm">
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-art-navy-20/5 dark:bg-white/5">{icon}</div>
        </div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-art-navy-40 mb-1">{label}</p>
        <p className="text-2xl font-bold dark:text-white">{value}</p>
        <p className="text-[10px] text-art-navy-60 dark:text-art-navy-40 italic mt-1">{sub}</p>
    </div>
    
);
export default StatCard;