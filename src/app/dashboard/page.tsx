"use client";

import { useState, useEffect } from "react";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarIcon, MessageSquare, BarChart3, Settings, LogOut } from "lucide-react";
import { getStudentSchedule, UniversityClass } from "@/services/university-schedule";
import { Badge } from "@/components/ui/badge";
import {
  Chart,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  ChartStyle,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';

interface EmotionData {
  name: string;
  stress: number;
  motivation: number;
  anxiety: number;
}

const dummyEmotionData: EmotionData[] = [
  { name: "Week 1", stress: 40, motivation: 70, anxiety: 30 },
  { name: "Week 2", stress: 50, motivation: 60, anxiety: 40 },
  { name: "Week 3", stress: 30, motivation: 80, anxiety: 20 },
  { name: "Week 4", stress: 60, motivation: 50, anxiety: 50 },
];

const emotionChartConfig = {
  stress: {
    label: "Stress",
    color: "hsl(var(--chart-1))",
  },
  motivation: {
    label: "Motivation",
    color: "hsl(var(--chart-2))",
  },
  anxiety: {
    label: "Anxiety",
    color: "hsl(var(--chart-3))",
  },
};

export default function Dashboard() {
  const [schedule, setSchedule] = useState<UniversityClass[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSchedule = async () => {
      // Replace 'student123' with the actual student ID after implementing authentication
      const fetchedSchedule = await getStudentSchedule('student123');
      setSchedule(fetchedSchedule);
    };

    fetchSchedule();
  }, []);

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <SidebarProvider>
      <SidebarInset className="md:pl-[--sidebar-width]">
        <div className="sticky top-0 z-50 border-b bg-background">
          <div className="container flex h-16 items-center">
            <SidebarTrigger className="mr-4 md:hidden" />
            <Avatar className="mr-4">
              <AvatarImage src="https://picsum.photos/50/50" alt="User Avatar" />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <h1 className="font-bold text-lg">Student Ally</h1>
          </div>
        </div>
        <div className="container py-4">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Your Schedule</CardTitle>
              <CardDescription>Upcoming classes and tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                {schedule.map((item, index) => (
                  <li key={index} className="py-2">
                    {item.className} - {item.dayOfWeek} - {item.startTime} to {item.endTime} ({item.location})
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emotional State Dashboard</CardTitle>
              <CardDescription>Your stress, motivation, and anxiety levels over the past weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer id="emotion-chart" config={emotionChartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dummyEmotionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="stress" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="motivation" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="anxiety" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
              <ChartLegend>
                <ChartLegendContent />
              </ChartLegend>
            </CardContent>
          </Card>
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
}
