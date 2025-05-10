import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle } from 'lucide-react'; // Icon đẹp
import { API_URL } from "../App";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);

  // Tham chiếu đến container chat để auto-scroll
  const chatEndRef = useRef(null);

  // Auto scroll xuống cuối mỗi khi có tin nhắn mới
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatLog]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message };
    const updatedChatLog = [...chatLog, userMessage];
    setChatLog(updatedChatLog);
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch(API_URL+'api/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      const aiReply = {
        role: 'assistant',
        content: data.reply,
      };

      setChatLog([...updatedChatLog, aiReply]);
    } catch (error) {
      console.error('Lỗi gửi tin nhắn', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Icon Chat ở góc phải */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-30 left-6  bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-700"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-30 left-6 w-105 bg-white border border-neutral-500 rounded-lg shadow-lg flex flex-col overflow-hidden z-50 transition-all">
          {/* Header */}
          <div className="bg-green-500 text-black p-3 flex justify-between items-center">
            <h2 className="text-lg font-semibold">🎵 Chat cùng Spotify AI</h2>
            <button onClick={() => setIsOpen(false)} className="text-white text-xl">
              ✖
            </button>
          </div>

          {/* Nội dung Chat - Cố định chiều cao */}
          <div className="flex-1 p-3 overflow-y-auto bg-[#242424] max-h-[400px]">
            {chatLog.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
              >
                <span className={msg.role === 'user' ? 'text-blue-600' : 'text-green-800'}>
                  {msg.role === 'user' ? 'Bạn: ' : ' AI: '}
                </span>
                <span className="text-white">{msg.content}</span>
              </div>
            ))}
            {loading && (
              <div className="text-left text-green-600 italic">AI đang trả lời...</div>
            )}
            {/* Auto-scroll to the latest message */}
            <div ref={chatEndRef}></div>
          </div>

          {/* Ô nhập tin nhắn */}
          <div className="flex border-t">
            <input
              type="text"
              className="flex-1 p-2 outline-none text-black"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập tin nhắn..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage();
              }}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 hover:bg-blue-600"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
