'use server';

/**
 * @fileOverview An AI agent that offers emotional support to students.
 *
 * - offerEmotionalSupport - A function that handles the emotional support process.
 * - OfferEmotionalSupportInput - The input type for the offerEmotionalSupport function.
 * - OfferEmotionalSupportOutput - The return type for the offerEmotionalSupport function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const OfferEmotionalSupportInputSchema = z.object({
  studentId: z.string().describe('The ID of the student.'),
  message: z.string().describe('The message from the student.'),
});
export type OfferEmotionalSupportInput = z.infer<typeof OfferEmotionalSupportInputSchema>;

const OfferEmotionalSupportOutputSchema = z.object({
  response: z.string().describe('The AI response to the student message.'),
  stressLevel: z.number().describe('The student stress level (0-10).'),
  demotivationLevel: z.number().describe('The student demotivation level (0-10).'),
  anxietyLevel: z.number().describe('The student anxiety level (0-10).'),
});
export type OfferEmotionalSupportOutput = z.infer<typeof OfferEmotionalSupportOutputSchema>;

export async function offerEmotionalSupport(input: OfferEmotionalSupportInput): Promise<OfferEmotionalSupportOutput> {
  return offerEmotionalSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'offerEmotionalSupportPrompt',
  input: {
    schema: z.object({
      studentId: z.string().describe('The ID of the student.'),
      message: z.string().describe('The message from the student.'),
    }),
  },
  output: {
    schema: z.object({
      response: z.string().describe('The AI response to the student message, providing emotional support and practical advice.'),
      stressLevel: z.number().describe('The student stress level (0-10).'),
      demotivationLevel: z.number().describe('The student demotivation level (0-10).'),
      anxietyLevel: z.number().describe('The student anxiety level (0-10).'),
    }),
  },
  prompt: `You are a supportive friend and counselor for university students. Your goal is to provide emotional support, 
  help them manage academic stress, and offer personalized advice. Maintain a friendly and empathetic tone.

  Analyze the student's message and infer their current stress, demotivation, and anxiety levels on a scale of 0-10.
  Then, craft a helpful response that acknowledges their feelings, offers encouragement, and suggests practical steps they can take to address their challenges.
  Consider the student's specific situation (academic difficulties, social issues, personal struggles), and tailor your advice accordingly.
  Remember to maintain a conversational tone and avoid being overly formal or clinical.

  Student ID: {{{studentId}}}
  Message: {{{message}}}

  Here's an example of what NOT to do, and what TO do:

  **Unacceptable Response (Too Generic):**
  "I understand you're feeling stressed. Try to relax and take deep breaths. Everything will be okay."

  **Acceptable Response (Empathetic and Actionable):**
  "Hey there! It sounds like you're having a really tough time right now. It's totally normal to feel overwhelmed when you're juggling so many things. Have you considered breaking down your tasks into smaller, more manageable steps? Sometimes that can make things feel less daunting. Also, remember that it's okay to ask for help. Maybe you could chat with a professor during office hours or connect with a tutor. You've got this!"

  Now, given the student's message, generate an appropriate response:
  `,
});

const offerEmotionalSupportFlow = ai.defineFlow<
  typeof OfferEmotionalSupportInputSchema,
  typeof OfferEmotionalSupportOutputSchema
>({
  name: 'offerEmotionalSupportFlow',
  inputSchema: OfferEmotionalSupportInputSchema,
  outputSchema: OfferEmotionalSupportOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
