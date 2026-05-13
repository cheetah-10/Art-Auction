import { X } from "lucide-react"
import { useState, useEffect } from "react"

const initialFormState = {
    name: "",
    description: "",
    imageUrl: "",
    image: ""
}

export const CategoryModal = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [form, setForm] = useState(initialFormState)

    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name || "",
                description: initialData.description || "",
                imageUrl: initialData.imageUrl || "",
                image: ""
            })
        } else {
            setForm(initialFormState)
        }
    }, [initialData])

    if (!isOpen) return null

    const handleChange = (e) => {
        const { name, value, files } = e.target

        if (name === "imageFile") {
            setForm({ ...form, imageUrl: files[0] })
        } else {
            setForm({ ...form, [name]: value })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(form)
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white dark:bg-art-navy-80 p-10 w-100 relative">

                <button onClick={onClose} className="absolute top-3 right-3 text-art-gold-100 ">
                    <X />
                </button>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full border p-2"
                    />

                    <input
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full border p-2"
                    />


                    {!initialData && (
                        <>
                            <input
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                placeholder="Image string"
                                className="w-full border p-2"
                            />

                            <input
                                type="file"
                                name="imageFile"
                                onChange={handleChange}
                                className="w-full bg-art-navy-80 p-2 text-art-gold-100"
                            />
                        </>
                    )}

                    <button className="bg-art-gold-100 text-art-navy-100 w-full py-2 font-bold">
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}