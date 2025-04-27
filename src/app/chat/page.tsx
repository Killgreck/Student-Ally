'use client';

import React, {useState, useEffect, useCallback} from 'react';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Separator} from '@/components/ui/separator';
import {offerEmotionalSupport, OfferEmotionalSupportInput, OfferEmotionalSupportOutput} from '@/ai/flows/offer-emotional-support';
import { CalendarIcon, MessageSquare, BarChart3, Settings, LogOut } from "lucide-react";
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar";

const studentId = 'student123'; // Replace with dynamic student ID when auth is implemented

interface ChatMessage {
  role: 'ai' | 'user';
  content: string;
}

const AIChatPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  // Function to send user message and receive AI response
  const sendMessage = useCallback(
    async (messageContent: string) => {
      if (!messageContent.trim()) return;

      setIsLoading(true);

      // Add user message to chat history immediately
      setChatHistory(prevHistory => [...prevHistory, {role: 'user', content: messageContent}]);
      setMessage(''); // Clear the input field

      try {
        // Call the AI flow to get a response
        const input: OfferEmotionalSupportInput = {
          studentId: studentId,
          message: messageContent,
        };

        // Await the AI response
        const aiResponse: OfferEmotionalSupportOutput = await offerEmotionalSupport(input);
        // Add AI response to chat history
        setChatHistory(prevHistory => [
          ...prevHistory,
          {role: 'ai', content: aiResponse.response},
        ]);

        setSuggestion(aiResponse.response);
      } catch (error) {
        console.error('Error processing AI response:', error);
        // Handle error appropriately (e.g., display an error message in the chat)
        setChatHistory(prevHistory => [
          ...prevHistory,
          {role: 'ai', content: 'Sorry, I encountered an error. Please try again.'},
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [studentId]
  );

  // useEffect to scroll to bottom on new messages
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatHistory]);

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <SidebarProvider>
      <SidebarInset className="md:pl-[--sidebar-width]">
    <div className="container relative flex h-screen antialiased">
      <div className="mx-auto flex w-full max-w-md flex-col rounded-md border bg-secondary shadow-xl">
        <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2 pt-6 text-center">
          <CardTitle className="text-2xl font-semibold">AI Chat</CardTitle>
        </CardHeader>

        <CardContent className="flex h-[calc(60vh-100px)] flex-col p-4">
            <div id="chat-container" className="flex flex-col space-y-4 p-4">
              {chatHistory.map((chatMessage, index) => (
                <div key={index} className="flex items-start">
                  {chatMessage.role === 'ai' ? (
                    <>
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="https://picsum.photos/50/50" alt="AI Avatar" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className="rounded-md border bg-background p-3 text-sm w-fit max-w-[70%]">
                        {chatMessage.content}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="rounded-md border bg-accent p-3 text-sm w-fit ml-auto max-w-[70%]">
                        {chatMessage.content}
                      </div>
                      <Avatar className="h-8 w-8 ml-2">
                        <AvatarImage src="https://picsum.photos/51/51" alt="User Avatar" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="https://picsum.photos/50/50" alt="AI Avatar" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="rounded-md border bg-background p-3 text-sm w-fit">
                    Thinking...
                  </div>
                </div>
              )}
            </div>
          <Separator className="my-4" />
          <div className="pb-2">
            <Textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="mb-2 resize-none"
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault(); // Prevent newline in textarea
                  sendMessage(message);
                }
              }}
            />
            <Button onClick={() => sendMessage(message)} disabled={isLoading} className="w-full">
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </CardContent>
      </div>
    </div>
    </SidebarInset>
      <Sidebar collapsible="icon">
        <SidebarHeader className="font-bold">Student Ally</SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard">
                  <Button variant="ghost" className="justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>Schedule</span>
                  </Button>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/chat">
                  <Button variant="ghost" className="justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>AI Chat</span>
                  </Button>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/emotional-state">
                  <Button variant="ghost" className="justify-start">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    <span>Emotional State</span>
                  </Button>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/settings">
                  <Button variant="ghost" className="justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Button>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} asChild>
                <Button variant="ghost" className="justify-start">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};

export default AIChatPage;
