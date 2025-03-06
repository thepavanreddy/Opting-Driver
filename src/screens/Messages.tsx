import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Send, ArrowLeft, Phone, Info } from 'lucide-react';

interface MessagesProps {
  userType: 'driver' | 'user';
}

const Messages: React.FC<MessagesProps> = ({ userType }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Array<{id: number, text: string, sender: 'user' | 'driver' | 'system', timestamp: Date}>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [chats, setChats] = useState<Array<{id: number, name: string, lastMessage: string, unread: number, timestamp: Date}>>([]);
  
  // Mock data for chats
  useEffect(() => {
    if (userType === 'driver') {
      setChats([
        {
          id: 1,
          name: 'Rahul Sharma',
          lastMessage: 'I need a driver for tomorrow morning',
          unread: 2,
          timestamp: new Date(Date.now() - 1000 * 60 * 5)
        },
        {
          id: 2,
          name: 'Priya Patel',
          lastMessage: 'Are you available for airport drop?',
          unread: 0,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
        },
        {
          id: 3,
          name: 'Amit Kumar',
          lastMessage: 'Thanks for the ride yesterday',
          unread: 0,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)
        }
      ]);
    } else {
      setChats([
        {
          id: 1,
          name: 'Rajesh (Driver)',
          lastMessage: 'I will be there at 9 AM',
          unread: 1,
          timestamp: new Date(Date.now() - 1000 * 60 * 10)
        },
        {
          id: 2,
          name: 'Suresh (Driver)',
          lastMessage: 'Your booking is confirmed',
          unread: 0,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3)
        }
      ]);
    }
  }, [userType]);

  // Mock data for messages when a chat is selected
  useEffect(() => {
    if (selectedChat) {
      const mockMessages = [
        {
          id: 1,
          text: userType === 'driver' 
            ? 'Hello, I need a driver for tomorrow morning at 8 AM' 
            : 'Hello, I am available to drive tomorrow',
          sender: userType === 'driver' ? 'user' : 'driver',
          timestamp: new Date(Date.now() - 1000 * 60 * 60)
        },
        {
          id: 2,
          text: 'Where do you need to go?',
          sender: 'driver',
          timestamp: new Date(Date.now() - 1000 * 60 * 55)
        },
        {
          id: 3,
          text: 'I need to go to the airport',
          sender: 'user',
          timestamp: new Date(Date.now() - 1000 * 60 * 50)
        },
        {
          id: 4,
          text: 'Sure, I can help with that. What time do you need me?',
          sender: 'driver',
          timestamp: new Date(Date.now() - 1000 * 60 * 45)
        },
        {
          id: 5,
          text: 'Around 8 AM, is that okay?',
          sender: 'user',
          timestamp: new Date(Date.now() - 1000 * 60 * 40)
        },
        {
          id: 6,
          text: 'Yes, that works for me. I will be there at 7:45 AM to be safe.',
          sender: 'driver',
          timestamp: new Date(Date.now() - 1000 * 60 * 35)
        },
        {
          id: 7,
          text: 'Great, thank you!',
          sender: 'user',
          timestamp: new Date(Date.now() - 1000 * 60 * 30)
        },
        {
          id: 8,
          text: 'Your booking has been confirmed.',
          sender: 'system',
          timestamp: new Date(Date.now() - 1000 * 60 * 25)
        }
      ];
      
      setMessages(mockMessages);
      
      // Update the unread count for the selected chat
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === selectedChat ? { ...chat, unread: 0 } : chat
        )
      );
    }
  }, [selectedChat, userType]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: userType as 'user' | 'driver',
        timestamp: new Date()
      };
      
      setMessages([...messages, newMsg]);
      setNewMessage('');
      
      // Update last message in chat list
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === selectedChat 
            ? { ...chat, lastMessage: newMessage, timestamp: new Date() } 
            : chat
        )
      );
      
      // Simulate reply after 1 second
      setTimeout(() => {
        const replyMsg = {
          id: messages.length + 2,
          text: userType === 'driver' 
            ? 'Thanks for the information. I will be waiting for you.' 
            : 'I will be there on time. See you soon!',
          sender: userType === 'driver' ? 'user' : 'driver',
          timestamp: new Date()
        };
        
        setMessages(prevMessages => [...prevMessages, replyMsg]);
        
        // Update last message in chat list
        setChats(prevChats => 
          prevChats.map(chat => 
            chat.id === selectedChat 
              ? { ...chat, lastMessage: replyMsg.text, timestamp: new Date() } 
              : chat
          )
        );
      }, 1000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return formatTime(date);
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Layout title="Messages" showSteps={false}>
      <div className="h-[calc(100vh-120px)] flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
        {selectedChat ? (
          // Chat view
          <div className="flex flex-col h-full">
            <div className="flex items-center p-4 border-b">
              <button 
                onClick={() => setSelectedChat(null)} 
                className="p-2 mr-2 rounded-full hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex-1">
                <h2 className="font-medium">
                  {chats.find(chat => chat.id === selectedChat)?.name}
                </h2>
              </div>
              <div className="flex">
                <button className="p-2 rounded-full hover:bg-gray-100 mr-1">
                  <Phone className="h-5 w-5 text-blue-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Info className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === userType ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[75%] rounded-lg px-4 py-2 ${
                      message.sender === 'system' 
                        ? 'bg-gray-100 text-gray-600 text-center mx-auto' 
                        : message.sender === userType 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === userType ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-3 border-t">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className={`p-2 rounded-full ${
                    newMessage.trim() ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Chat list view
          <div className="h-full overflow-y-auto">
            {chats.length > 0 ? (
              chats.map(chat => (
                <div 
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-50"
                >
                  <div className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-medium mr-3">
                    {chat.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                        {formatDate(chat.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="ml-2 bg-blue-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                      {chat.unread}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                  <Send className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No messages yet</h3>
                <p className="text-gray-600">
                  {userType === 'driver' 
                    ? 'Your conversations with users will appear here' 
                    : 'Your conversations with drivers will appear here'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Messages;
