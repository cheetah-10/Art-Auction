import { useState } from "react";
import { X } from "lucide-react";

export default function TagModal({ isOpen, onClose, onSubmit }) {

    const [name, setName] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({ name });

        setName("");
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white dark:bg-art-navy-90 w-[400px] p-6 relative rounded-md">

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3"
                >
                    <X />
                </button>

                <h2 className="text-xl font-bold mb-5">
                    Create Tag
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        placeholder="Tag name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border p-3 rounded"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-art-navy-100 text-white py-3 rounded"
                    >
                        Create
                    </button>

                </form>
            </div>
        </div>
    );
}