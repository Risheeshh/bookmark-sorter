import { useState, useEffect } from "react";

const AddBookmark = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", url: "", category: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, url, category } = formData;
    if (!name || !url || !category) return;

    // const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${new URL(url).hostname}`;
    const faviconUrl = new URL(url).hostname 
  ? `https://www.google.com/s2/favicons?sz=64&domain=${new URL(url).hostname}` 
  : "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";
    const newBookmark = {
      id: Date.now(),
      name,
      logo: faviconUrl,
      description: url,
      category,
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch("http://localhost:5000/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBookmark),
      });

      const data = await response.json();
      if (response.ok) {
        // ✅ Update frontend immediately
        onAdd((prev) => [...prev, newBookmark]);

        setIsSuccess(true);

        // ✅ After 2 seconds: close modal, reset form
        setTimeout(() => {
          setIsSuccess(false);
          setIsOpen(false);
          setFormData({ name: "", url: "", category: "" });
        }, 2000);

        // ✅ Optionally scroll into view
        setTimeout(() => {
          document.getElementById("target-section")?.scrollIntoView({ behavior: "smooth" });
        }, 2500);
      } else {
        alert(data.error || "Failed to add bookmark.");
      }
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => setIsOpen(true)}
      >
        + Add Bookmark
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
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
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border p-2 rounded-md text-black font-bold"
                    required
                    >
                    <option value="" disabled>Select a category</option>
                    <option value="Search">Search</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Development">Development</option>
                    <option value="Social">Social</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Design">Design</option>
                    <option value="News">News</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Gaming">Gaming</option>
                </select>
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded-md"
                >
                  Add
                </button>
              </form>
            )}

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
