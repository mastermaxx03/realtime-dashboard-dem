import React, { useState } from 'react';
import './Chatbot.css'; // We will create this CSS file next

// This is where your context-aware logic will go later
// For now, it will just be a placeholder
const ChatbotContainer = () => {
  return (
    <div style={{ padding: '20px', background: '#fff', height: '100%' }}>
      <p>Hello! I am your chatbot.</p>
    </div>
  );
};

// A simple chat icon
const ChatIcon = () => <>💬</>;

const MasterChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      {/* The main chat window, which shows only when 'isOpen' is true */}
      {isOpen && (
        <div className="chat-window">
          <ChatbotContainer />
        </div>
      )}

      {/* The launcher button that is always visible */}
      <div className="chatbot-launcher" onClick={toggleChat}>
        {isOpen ? '✖️' : <ChatIcon />}
      </div>
    </div>
  );
};

export default MasterChatbot;
