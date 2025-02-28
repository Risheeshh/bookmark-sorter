import { useState, useEffect } from "react";


const AddBookmark = ({ onAdd }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({ name: "", url: "", category: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        
    };
    useEffect(() => {
            if (isSuccess) {
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                setTimeout(() => {
                    document.getElementById("target-section")?.scrollIntoView({ behavior: "smooth" });
                }, 4000);
            }
        }, [isSuccess]);
    const handleSubmit = async (e) => {
        setIsSuccess(true);
        
        e.preventDefault();
        const { name, url, category } = formData;
        if (!name || !url || !category) return;

        const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${new URL(url).hostname}`;
        const newBookmark = {
            id: Date.now(),
            name,
            logo: faviconUrl,
            description: url,
            category,
        };

        try {
            const response = await fetch("http://localhost:5000/bookmarks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newBookmark),
            });

            const data = await response.json();//awaiting response from the backend
            if (response.ok) {
                onAdd((prev) => [...prev, newBookmark]); // Update UI
                setIsSuccess(true);

                setTimeout(() => {
                    setIsSuccess(false);
                    setIsOpen(false);
                    setFormData({ name: "", url: "", category: "" });
                    window.location.reload();
                }, 2000); // Close modal after 2s
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error adding bookmark:", error);
        }
        
    };

    return (
        <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => setIsOpen(true)}>
                + Add Bookmark
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
                        {/* Show success message when isSuccess is true */}
                        {isSuccess ? (
                            <div className="flex flex-col items-center">
                                <div className="text-green-500 text-4xl">✔</div>
                                <p className="mt-2 text-gray-700">Successfully added!</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Bookmark Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="border p-2 rounded-md text-black font-bold"
                                    required
                                />
                                <input
                                    type="url"
                                    name="url"
                                    placeholder="Bookmark URL"
                                    value={formData.url}
                                    onChange={handleChange}
                                    className="border p-2 rounded-md text-black font-bold"
                                    required
                                />
                                <input
                                    type="text"
                                    name="category"
                                    placeholder="Category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="border p-2 rounded-md text-black font-bold"
                                    required
                                />
                                <button type="submit" className="bg-green-500 text-white p-2 rounded-md">
                                    Add
                                </button>
                            </form>
                        )}

                        {/* Close button should always be visible */}
                        <button
                            type="button"
                            className="absolute top-2 right-2 text-gray-500"
                            onClick={() => setIsOpen(false)}
                        >
                            ✖
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


export default AddBookmark;
