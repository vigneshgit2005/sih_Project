import ChatInterface from '@/components/chatbot/ChatInterface';

export default function ChatbotPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="text-center mb-8">
            <h1 className="font-headline text-4xl font-bold">AI Wellness Companion</h1>
            <p className="text-muted-foreground mt-2">
                Chat with our AI to get coping tips, explore your feelings, or just talk. It's private and here for you 24/7.
            </p>
        </div>
        <ChatInterface />
    </div>
  );
}
