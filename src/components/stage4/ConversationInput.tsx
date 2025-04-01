
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

type ConversationInputProps = {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
};

const ConversationInput: React.FC<ConversationInputProps> = ({ 
  messages, 
  onSendMessage,
  isLoading 
}) => {
  const [input, setInput] = useState('');
  
  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-2">Tell us more about your travel preferences</h3>
      <p className="text-gray-600 mb-6">Chat with our AI to help us understand what you're looking for</p>
      
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user' 
                      ? 'bg-travel-teal text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p className="text-center">
                Our AI assistant will ask you questions about your travel preferences.
                <br />
                Start by saying hello!
              </p>
            </div>
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-200 p-3">
          <div className="flex items-center">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={isLoading}
            />
            <Button 
              size="icon"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="ml-2 bg-travel-teal hover:bg-travel-teal/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationInput;
