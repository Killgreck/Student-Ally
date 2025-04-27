'use server';
/**
 * @fileOverview An AI agent that provides personalized reminders based on student tasks and deadlines.
 *
 * - providePersonalizedReminders - A function that generates personalized reminders for a student.
 * - ProvidePersonalizedRemindersInput - The input type for the providePersonalizedReminders function.
 * - ProvidePersonalizedRemindersOutput - The return type for the providePersonalizedReminders function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ProvidePersonalizedRemindersInputSchema = z.object({
  studentId: z.string().describe('The ID of the student.'),
  conversationHistory: z.string().describe('The conversation history between the student and the AI.'),
});
export type ProvidePersonalizedRemindersInput = z.infer<typeof ProvidePersonalizedRemindersInputSchema>;

const ProvidePersonalizedRemindersOutputSchema = z.object({
  reminders: z.array(z.string()).describe('A list of personalized reminders for the student.'),
});
export type ProvidePersonalizedRemindersOutput = z.infer<typeof ProvidePersonalizedRemindersOutputSchema>;

export async function providePersonalizedReminders(input: ProvidePersonalizedRemindersInput): Promise<ProvidePersonalizedRemindersOutput> {
  return providePersonalizedRemindersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'providePersonalizedRemindersPrompt',
  input: {
    schema: z.object({
      studentId: z.string().describe('The ID of the student.'),
      conversationHistory: z.string().describe('The conversation history between the student and the AI.'),
    }),
  },
  output: {
    schema: z.object({
      reminders: z.array(z.string()).describe('A list of personalized reminders for the student.'),
    }),
  },
  prompt: `You are a helpful AI assistant that provides personalized reminders to students based on their conversation history. Analyze the conversation history and identify any upcoming tasks, deadlines, or commitments mentioned by the student. Generate a list of reminders that will help the student stay organized and manage their time effectively. Make the reminders sound like a friend would say them.

Conversation History:
{{conversationHistory}}

Reminders:`, // Updated prompt to fit user persona
});

const providePersonalizedRemindersFlow = ai.defineFlow<
  typeof ProvidePersonalizedRemindersInputSchema,
  typeof ProvidePersonalizedRemindersOutputSchema
>(
  {
    name: 'providePersonalizedRemindersFlow',
    inputSchema: ProvidePersonalizedRemindersInputSchema,
    outputSchema: ProvidePersonalizedRemindersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
