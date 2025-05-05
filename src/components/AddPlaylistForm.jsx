import React, { useState } from "react";

const AddPlaylistForm = ({ onSubmit, onCancel }) => {
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onSubmit(name);
            setName("");
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-[#121212] text-white p-6 rounded-lg w-[90%] max-w-md">
                <h2 className="text-xl font-bold mb-4">Tạo danh sách phát</h2>
                <input
                    type="text"
                    placeholder="Nhập tên playlist"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mb-4 bg-[#1f1f1f] border border-gray-600 rounded"
                    required
                />
                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onCancel} className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500">
                        Hủy
                    </button>
                    <button type="submit" className="px-4 py-2 rounded bg-green-600 hover:bg-green-500">
                        Xác nhận
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPlaylistForm;
