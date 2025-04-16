import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Play } from 'lucide-react';
import { UserPreferences } from '@/types';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

type RefinePreferencesStepProps = {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  preferences?: UserPreferences;
};

const RefinePreferencesStep: React.FC<RefinePreferencesStepProps> = ({
  messages,
  isLoading,
  onSendMessage,
  preferences = {} as UserPreferences
}) => {
  const [message, setMessage] = React.useState('');

  // Use localStorage to persist chatStarted state
  const [chatStarted, setChatStarted] = React.useState<boolean>(() => {
    const stored = localStorage.getItem('travel_app_chat_started');
    return stored ? JSON.parse(stored) : false;
  });

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleStartChat = () => {
    // Log the current user preferences
    console.log("Starting chat with user preferences:", preferences);

    // Set chat as started and persist in localStorage
    setChatStarted(true);
    localStorage.setItem('travel_app_chat_started', JSON.stringify(true));

    // Send initial system message with preferences
    // Generate the list of selected themes dynamically
    const allThemeKeys: (keyof Pick<UserPreferences, 'culture' | 'adventure' | 'nature' | 'beaches' | 'nightlife' | 'cuisine' | 'wellness' | 'urban' | 'seclusion'>)[] = [
      'culture', 'adventure', 'nature', 'beaches', 'nightlife', 'cuisine', 'wellness', 'urban', 'seclusion'
    ];
    const selectedThemes = allThemeKeys
      .filter(key => preferences[key] === 5)
      .map(key => key.charAt(0).toUpperCase() + key.slice(1)) // Capitalize for display
      .join(', ');

    const systemPrompt = `I've analyzed your preferences: 
    Themes: ${selectedThemes || 'None selected'}
    Temperature: ${preferences.temperatureRange?.[0] ?? '-5'}°C to ${preferences.temperatureRange?.[1] ?? '30'}°C
    When: ${preferences.travelMonths?.join(', ') || 'Any time'}
    Duration: ${preferences.travelDuration || 'Not specified'}
    Regions: ${preferences.preferredRegions?.join(', ') || 'Anywhere'}
    Budget: ${preferences.travelBudget || 'Not specified'}
    
    What else would you like me to know about your ideal trip?`;

    onSendMessage(systemPrompt);
  };

  // Check if the URL has a step parameter, and update chatStarted if needed
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stepParam = params.get('step');

    // Check if we're on step 9 (refine-preferences)
    if (stepParam === '9' && messages.length === 0) {
      // Reset chat started state if we're navigating directly to this step with no messages
      setChatStarted(false);
      localStorage.setItem('travel_app_chat_started', JSON.stringify(false));
    }
  }, [messages.length]);

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Reset chat button if there are no messages
  React.useEffect(() => {
    if (messages.length === 0 && chatStarted) {
      setChatStarted(false);
      localStorage.setItem('travel_app_chat_started', JSON.stringify(false));
    }
  }, [messages.length, chatStarted]);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2">Refine My Preferences</h2>
      <p className="text-gray-600 mb-6">Let's review your choices and refine anything that needs clarity.</p>

      {/* Chat container with relative positioning */}
      <div className="relative">
        {/* Start chat button positioned on top with z-index */}
        {!chatStarted && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-50/60 backdrop-blur-sm rounded-lg">
            <Button
              onClick={handleStartChat}
              className="px-6 py-6 bg-[#3c83f6] hover:bg-blue-600 transition-colors text-lg shadow-lg"
              size="lg"
            >
              <Play className="mr-2 h-5 w-5" /> Start Conversation
            </Button>
          </div>
        )}

        {/* Chat interface with filter when inactive */}
        <div className={`bg-gray-50 rounded-lg border border-gray-200 p-3 ${!chatStarted ? 'opacity-40 pointer-events-none' : ''}`}>
          <div className="h-[50vh] overflow-y-auto mb-4 px-2">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`mb-3 ${msg.sender === 'user' ? 'text-right' : ''}`}
              >
                <div
                  className={`inline-block max-w-[80%] p-3 rounded-lg ${msg.sender === 'user'
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
            <Button
              type="submit"
              disabled={isLoading || !message.trim()}
            >
              <Send size={16} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RefinePreferencesStep;
