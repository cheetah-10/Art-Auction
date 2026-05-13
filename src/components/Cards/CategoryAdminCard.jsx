import { Edit, Trash2 } from 'lucide-react'
import React from 'react'

export default function CategoryAdminCard({ category, onEdit, onDelete }) {
    return (
        <div className="bg-white dark:bg-art-navy-90 p-6 border border-gray-100 dark:border-art-navy-80 group">
            <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-art-gold-10 dark:bg-art-navy-80 flex items-center justify-center text-art-gold-100 font-serif text-xl">{category.name?.[0] || 'C'}</div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={onEdit}
                         className="p-1.5 text-art-navy-40 hover:text-blue-500"><Edit size={16} /></button>
                    <button className="p-1.5 text-art-navy-40 hover:text-art-terracotta-100"
                        onClick={onDelete}><Trash2 size={16} /></button>
                </div>
            </div>
            <h4 className="font-bold text-lg">{category.name}</h4>
            <p className="text-xs text-art-navy-40 mt-2 line-clamp-2 italic">{category.description || 'Premium timepieces from historical eras and modern collections.'}</p>
        </div>
    )
}
