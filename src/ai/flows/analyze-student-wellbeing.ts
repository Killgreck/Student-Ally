'use server';
/**
 * @fileOverview This file defines a Genkit flow for analyzing a student's well-being based on their conversations.
 *
 * - analyzeStudentWellbeing - A function that analyzes student conversations and returns insights into their stress, motivation, and anxiety levels.
 * - AnalyzeStudentWellbeingInput - The input type for the analyzeStudentWellbeing function.
 * - AnalyzeStudentWellbeingOutput - The return type for the analyzeStudentWellbeing function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnalyzeStudentWellbeingInputSchema = z.object({
  studentId: z.string().describe('The ID of the student.'),
  conversationHistory: z.string().describe('The conversation history of the student.'),
});
export type AnalyzeStudentWellbeingInput = z.infer<typeof AnalyzeStudentWellbeingInputSchema>;

const AnalyzeStudentWellbeingOutputSchema = z.object({
  stressLevel: z.number().describe('The stress level of the student (0-100).'),
  motivationLevel: z.number().describe('The motivation level of the student (0-100).'),
  anxietyLevel: z.number().describe('The anxiety level of the student (0-100).'),
  summary: z.string().describe('A summary of the student’s wellbeing.'),
});
export type AnalyzeStudentWellbeingOutput = z.infer<typeof AnalyzeStudentWellbeingOutputSchema>;

export async function analyzeStudentWellbeing(input: AnalyzeStudentWellbeingInput): Promise<AnalyzeStudentWellbeingOutput> {
  return analyzeStudentWellbeingFlow(input);
}

const analyzeStudentWellbeingPrompt = ai.definePrompt({
  name: 'analyzeStudentWellbeingPrompt',
  input: {
    schema: z.object({
      studentId: z.string().describe('The ID of the student.'),
      conversationHistory: z.string().describe('The conversation history of the student.'),
    }),
  },
  output: {
    schema: z.object({
      stressLevel: z.number().describe('The stress level of the student (0-100).'),
      motivationLevel: z.number().describe('The motivation level of the student (0-100).'),
      anxietyLevel: z.number().describe('The anxiety level of the student (0-100).'),
      summary: z.string().describe('A summary of the student’s wellbeing.'),
    }),
  },
  prompt: `You are an AI psychologist analyzing the well-being of a student based on their conversation history.

  Analyze the following conversation history for student ID {{{studentId}}} and provide insights into their stress, motivation, and anxiety levels.
  Assign a numeric value between 0-100 for each. 0 indicates the absence of the indicated emotion/state, and 100 indicates the highest possible level.

  Conversation History:
  {{{conversationHistory}}}
  
  Return a brief summary of the student’s wellbeing.
  `, 
});

const analyzeStudentWellbeingFlow = ai.defineFlow<
  typeof AnalyzeStudentWellbeingInputSchema,
  typeof AnalyzeStudentWellbeingOutputSchema
>(
  {
    name: 'analyzeStudentWellbeingFlow',
    inputSchema: AnalyzeStudentWellbeingInputSchema,
    outputSchema: AnalyzeStudentWellbeingOutputSchema,
  },
  async input => {
    const {output} = await analyzeStudentWellbeingPrompt(input);
    return output!;
  }
);
