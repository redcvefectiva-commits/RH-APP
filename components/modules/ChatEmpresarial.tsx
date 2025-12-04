
import React, { useState, useRef, useEffect } from 'react';
import { generateChatData } from '../../services/chatMockData';
import { employees as allEmployees } from '../../services/mockData';
import { AllConversations, ChatMessage, Conversation } from '../../types';
// FIX: Replaced DocumentIcon with DocumentTextIcon and added other missing icon imports.
import { SearchIcon, PaperClipIcon, PhotographIcon, VideoCameraIcon, DocumentTextIcon, DotsVerticalIcon } from '../ui/Icons';
import Button from '../ui/Button';
import CreateGroupModal from './chat/CreateGroupModal';

const CURRENT_USER_ID = 1; // Assuming Isabella Lopez is the current user

const ChatEmpresarial: React.FC = () => {
  const [conversations, setConversations] = useState<AllConversations>(() => generateChatData(allEmployees, CURRENT_USER_ID));
  const [activeConversationId, setActiveConversationId] = useState<string | null>(Object.keys(conversations)[0] || null);
  const [messageText, setMessageText] = useState('');
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = activeConversationId ? conversations[activeConversationId] : null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [activeConversation]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !activeConversationId) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      senderId: CURRENT_USER_ID,
      senderName: allEmployees.find(e => e.id === CURRENT_USER_ID)?.name || 'Yo',
      text: messageText,
      timestamp: Date.now(),
      read: true,
    };
    
    // FIX: Explicitly type `prev` state and add guards for undefined conversation to resolve type errors.
    setConversations((prev: AllConversations) => {
      const currentConversation = prev[activeConversationId!];
      if (!currentConversation) {
        return prev;
      }
      return {
        ...prev,
        [activeConversationId!]: {
          ...currentConversation,
          messages: [...currentConversation.messages, newMessage],
        },
      };
    });
    setMessageText('');
  };

  const handleCreateGroup = (groupName: string, memberIds: string[]) => {
      const members = allEmployees.filter(e => memberIds.includes(String(e.id)));
      const currentUser = allEmployees.find(e => e.id === CURRENT_USER_ID);
      if (currentUser && !members.find(m => m.id === CURRENT_USER_ID)) {
          members.push(currentUser);
      }
      
      const newGroupId = `group_${Date.now()}`;
      const newGroup: Conversation = {
          id: newGroupId,
          name: groupName,
          type: 'group',
          members,
          messages: [],
      };
      setConversations(prev => ({ ...prev, [newGroupId]: newGroup }));
      setActiveConversationId(newGroupId);
      setIsGroupModalOpen(false);
  };
  
  // FIX: Cast Object.values to Conversation[] to fix type inference issues.
  const sortedConversations = (Object.values(conversations) as Conversation[]).sort((a,b) => {
      const lastMsgA = a.messages[a.messages.length - 1]?.timestamp || 0;
      const lastMsgB = b.messages[b.messages.length - 1]?.timestamp || 0;
      return lastMsgB - lastMsgA;
  });

  return (
    <div className="flex h-[calc(100vh-100px)] bg-white rounded-xl shadow-md overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-dark">Chats</h2>
                <Button variant="ghost" onClick={() => setIsGroupModalOpen(true)}>Crear Grupo</Button>
            </div>
            <div className="relative mt-4">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="text" placeholder="Buscar chat..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
            </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {sortedConversations.map(convo => {
            const lastMessage = convo.messages[convo.messages.length - 1];
            return (
              <div key={convo.id} onClick={() => setActiveConversationId(convo.id)} className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${activeConversationId === convo.id ? 'bg-orange-50' : ''}`}>
                <img src={convo.avatar || `https://ui-avatars.com/api/?name=${convo.name.replace(/\s/g, '+')}&background=random`} alt={convo.name} className="h-12 w-12 rounded-full object-cover" />
                <div className="ml-3 flex-1">
                  <p className="font-semibold text-dark">{convo.name}</p>
                  <p className="text-sm text-gray-500 truncate">{lastMessage?.text || 'No hay mensajes'}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="w-2/3 flex flex-col">
        {activeConversation ? (
          <>
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center">
                 <img src={activeConversation.avatar || `https://ui-avatars.com/api/?name=${activeConversation.name.replace(/\s/g, '+')}&background=random`} alt={activeConversation.name} className="h-10 w-10 rounded-full object-cover" />
                 <h3 className="text-lg font-semibold ml-3">{activeConversation.name}</h3>
              </div>
               <Button variant="ghost"><DotsVerticalIcon className="h-5 w-5" /></Button>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto bg-gray-soft">
              {activeConversation.messages.map(msg => (
                <div key={msg.id} className={`flex mb-4 ${msg.senderId === CURRENT_USER_ID ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md p-3 rounded-xl ${msg.senderId === CURRENT_USER_ID ? 'bg-primary text-white' : 'bg-white shadow-sm'}`}>
                    {msg.senderId !== CURRENT_USER_ID && <p className="text-xs font-bold text-secondary mb-1">{msg.senderName}</p>}
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.senderId === CURRENT_USER_ID ? 'text-orange-200' : 'text-gray-400'}`}>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 bg-white border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <input type="text" value={messageText} onChange={e => setMessageText(e.target.value)} placeholder="Escribe un mensaje..." className="flex-1 px-4 py-2 border rounded-full focus:ring-primary focus:border-primary" />
                <div className="flex items-center ml-2">
                    <Button type="button" variant="ghost" className="p-2 rounded-full"><PaperClipIcon className="h-5 w-5"/></Button>
                    <Button type="submit" variant="primary" className="ml-2 rounded-full px-5">Enviar</Button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Selecciona una conversación para empezar a chatear.</p>
          </div>
        )}
      </div>

      <CreateGroupModal 
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
        allEmployees={allEmployees.filter(e => e.id !== CURRENT_USER_ID)}
        onCreate={handleCreateGroup}
      />
    </div>
  );
};

export default ChatEmpresarial;