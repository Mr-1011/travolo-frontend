
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

type RefinePreferencesStepProps = {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
};

const RefinePreferencesStep: React.FC<RefinePreferencesStepProps> = ({ 
  messages, 
  isLoading,
  onSendMessage 
}) => {
  const [message, setMessage] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2">Refine My Preferences</h2>
      <p className="text-gray-600 mb-6">Let's review your choices and refine anything that needs clarity.</p>
      
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-3">
        <div className="h-[300px] overflow-y-auto mb-4 px-2">
          {messages.map(msg => (
            <div 
              key={msg.id}
              className={`mb-3 ${msg.sender === 'user' ? 'text-right' : ''}`}
            >
              <div 
                className={`inline-block max-w-[80%] p-3 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'bg-[#3c83f6] text-white rounded-tr-none' 
                    : 'bg-white border border-gray-200 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex space-x-2 p-3">
              <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
              <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]"></div>
              <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]"></div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !message.trim()}>
            <Send size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RefinePreferencesStep;
