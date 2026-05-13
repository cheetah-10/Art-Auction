import React, { useContext, useState } from 'react';
import { Plus } from 'lucide-react';

import Loader from '../../components/Loader/Loader';
import TagModal from '../../components/Modals/TagModal';

import { AuthContext } from '../../context/AuthContext';
import { useTags } from '../../hooks/useTags';

const AdminTags = () => {

    const { token } = useContext(AuthContext);

    const { tags, loading, createTag } = useTags(token);

    const [isOpen, setIsOpen] = useState(false);

    if (loading) return <Loader />;

    return (
        <div className="space-y-6">

            <div className="flex justify-between items-center">

                <h3 className="font-serif text-2xl italic">
                    Artwork Tags
                </h3>

                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-art-navy-100 dark:bg-art-gold-100 text-white dark:text-art-navy-100 px-6 py-2 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-90"
                >
                    <Plus size={14} />
                    Add Tag
                </button>

            </div>

            <div className="flex flex-wrap gap-3">

                {tags.map((tag) => (
                    <div
                        key={tag.tagId}
                        className="px-4 py-2 bg-white dark:bg-art-navy-90 border border-art-gold-20 rounded-full text-sm"
                    >
                        #{tag.name}
                    </div>
                ))}

            </div>

            <TagModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSubmit={async (data) => {
                    await createTag(data);
                    setIsOpen(false);
                }}
            />

        </div>
    );
};

export default AdminTags;