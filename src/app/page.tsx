"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const users = [
  { id: "0004466785", password: "Carlitos90" },
  { id: "0004466786", password: "Carlitos91" },
  { id: "0004466787", password: "Carlitos92" },
  { id: "0004466788", password: "Carlitos93" },
  { id: "0004466789", password: "Carlitos94" },
  { id: "0004466790", password: "Carlitos95" },
  { id: "0004466791", password: "Carlitos96" },
  { id: "0004466792", password: "Carlitos97" },
  { id: "0004466793", password: "Carlitos98" },
  { id: "0004466794", password: "Carlitos99" },
];

const learningStyleQuestions = [
  "I prefer to learn through visuals like charts and diagrams.",
  "I understand concepts better when I hear them explained.",
  "I learn best by doing things and getting involved physically.",
  "I enjoy group activities and discussions to understand topics.",
];

export default function Home() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [learningStyleAnswers, setLearningStyleAnswers] = useState(Array(learningStyleQuestions.length).fill(false));
  const [showSurvey, setShowSurvey] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = () => {
    const user = users.find((u) => u.id === userId && u.password === password);
    if (user) {
      setShowSurvey(true);
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials.",
        variant: "destructive",
      });
    }
  };

  const handleSurveySubmit = () => {
    // Placeholder for survey submission logic (e.g., store learning style preferences).
    console.log("Survey answers:", learningStyleAnswers);
    router.push("/dashboard");
    toast({
      title: "Success",
      description: "Login successful!",
    });
  };

  const handleSkipSurvey = () => {
    router.push("/dashboard");
    toast({
      title: "Success",
      description: "Login successful!",
    });
  };

  const handleAnswerChange = (index: number, value: boolean) => {
    const newAnswers = [...learningStyleAnswers];
    newAnswers[index] = value;
    setLearningStyleAnswers(newAnswers);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <Card className="w-full max-w-md space-y-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Student Ally</CardTitle>
          <CardDescription className="text-center">Your AI Companion for Student Well-being</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="userId">User ID</Label>
            <Input id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClick={handleLogin}>Sign In</Button>
        </CardContent>

        {showSurvey && (
          <CardContent className="grid gap-4">
            <CardTitle className="text-xl font-semibold text-center">Learning Style Survey</CardTitle>
            <CardDescription className="text-center">
              Help us personalize your learning experience by answering these questions.
            </CardDescription>
            <div className="grid gap-4">
              {learningStyleQuestions.map((question, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`question-${index}`}
                    className="h-5 w-5 rounded text-primary shadow-sm focus:ring-primary"
                    checked={learningStyleAnswers[index]}
                    onChange={(e) => handleAnswerChange(index, e.target.checked)}
                  />
                  <Label htmlFor={`question-${index}`}>{question}</Label>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <Button variant="secondary" onClick={handleSkipSurvey}>
                Skip Survey
              </Button>
              <Button onClick={handleSurveySubmit}>Submit Survey</Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
