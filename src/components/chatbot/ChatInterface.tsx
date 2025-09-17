'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { aiChatbotPersonalizedCopingTips, AIChatbotPersonalizedCopingTipsInput } from '@/ai/flows/ai-chatbot-personalized-coping-tips';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your wellness companion. How are you feeling today? Feel free to share what's on your mind.",
    },
  ]);
  const [input, setInput] = useState('');
  const [mood, setMood] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const aiInput: AIChatbotPersonalizedCopingTipsInput = {
            userInput: input,
            mood: mood,
        };
        const result = await aiChatbotPersonalizedCopingTips(aiInput);
        const assistantMessage: Message = { role: 'assistant', content: result.copingTips };
        setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
        console.error("Error calling AI:", error);
        const errorMessage: Message = { role: 'assistant', content: "I'm having a little trouble connecting right now. Please try again in a moment." };
        setMessages((prev) => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Card className="flex h-[70vh] flex-col">
      <CardHeader>
        <p className="text-sm text-muted-foreground">Your conversation is private and secure.</p>
      </CardHeader>
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <CardContent className="space-y-6 p-6">
          {messages.map((message, index) => (
            <div key={index} className={cn("flex items-start gap-4", message.role === 'user' ? "justify-end" : "justify-start")}>
               {message.role === 'assistant' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
               )}
              <div
                className={cn(
                  'max-w-[75%] rounded-2xl p-3 text-sm',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-secondary text-secondary-foreground rounded-bl-none'
                )}
              >
                {message.content}
              </div>
              {message.role === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-4 justify-start">
                 <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className='bg-secondary rounded-2xl p-3 text-sm rounded-bl-none'>
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
            </div>
          )}
        </CardContent>
      </ScrollArea>
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="mood-slider" className="text-sm text-muted-foreground">
                How are you feeling right now? (1: Low - 5: High)
            </Label>
             <Slider
                id="mood-slider"
                min={1}
                max={5}
                step={1}
                value={[mood]}
                onValueChange={(value) => setMood(value[0])}
                className="w-full"
                disabled={isLoading}
             />
          </div>
          <div className="flex w-full items-center space-x-2">
            <Input
              id="message"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              autoComplete="off"
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
