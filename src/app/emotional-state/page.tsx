"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
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
import {analyzeStudentWellbeing, AnalyzeStudentWellbeingInput, AnalyzeStudentWellbeingOutput} from '@/ai/flows/analyze-student-wellbeing';

interface EmotionData {
  name: string;
  stress: number;
  motivation: number;
  anxiety: number;
}

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

export default function EmotionalStatePage() {
  const [emotionData, setEmotionData] = useState<EmotionData[]>([]);

    useEffect(() => {
        const fetchEmotionalState = async () => {
            // Replace 'student123' with the actual student ID after implementing authentication
            const input: AnalyzeStudentWellbeingInput = {
                studentId: 'student123',
                conversationHistory: 'The student is feeling overwhelmed with exams and assignments. They are also worried about their grades and future prospects.',
            };
            try {
                const wellbeingData: AnalyzeStudentWellbeingOutput = await analyzeStudentWellbeing(input);
                // Transform the AI output to the format suitable for the chart
                const transformedData: EmotionData[] = [{
                    name: 'Current',
                    stress: wellbeingData.stressLevel,
                    motivation: wellbeingData.motivationLevel,
                    anxiety: wellbeingData.anxietyLevel,
                }];
                setEmotionData(transformedData);
            } catch (error) {
                console.error('Error fetching emotional state:', error);
                // Optionally set some default data or display an error message
                setEmotionData([]);
            }
        };

        fetchEmotionalState();
    }, []);

  return (
    <div className="container py-4">
      <Card>
        <CardHeader>
          <CardTitle>Emotional State Dashboard</CardTitle>
          <CardDescription>Your stress, motivation, and anxiety levels</CardDescription>
        </CardHeader>
        <CardContent>
          {emotionData.length > 0 ? (
            <ChartContainer id="emotion-chart" config={emotionChartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={emotionData}>
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
          ) : (
            <div>Loading emotional state data...</div>
          )}
          <ChartLegend>
            <ChartLegendContent />
          </ChartLegend>
        </CardContent>
      </Card>
    </div>
  );
}
