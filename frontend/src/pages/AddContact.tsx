import { RootState } from "@/store/store";
import { axiosInstance } from "@/utils/axiosInstance";
import { useState } from "react";
import { useSelector } from "react-redux";

const CreateChat = ({ onClose }: { onClose: () => void }) => {
    const [participantId, setParticipantId] = useState("");
    const userId = useSelector((state: RootState) => state.user._id)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCreateChat = async () => {
        if (!participantId.trim()) {
            return alert("Please enter a valid participant ID.");
        }

        setLoading(true);
        setError("");

        try {
            const response = await axiosInstance.post("/chat", {
                participants: [userId, participantId],
                isGroup: false
            });
            console.log(response)
            console.log("Chat created successfully!");
            setParticipantId("");
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed z-20 inset-0 flex items-center justify-center bg-black/20 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold text-gray-800">Create Chat</h2>
                <p className="text-gray-500 text-sm mb-4">Enter the participant ID to start a chat.</p>

                <input
                    type="text"
                    placeholder="Enter participant ID"
                    value={participantId}
                    onChange={(e) => setParticipantId(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <div className="mt-4 flex justify-end gap-2">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={handleCreateChat}
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateChat;
