'use server';

/**
 * @fileOverview An AI chatbot that provides personalized coping tips and resources based on user input and mood.
 *
 * - aiChatbotPersonalizedCopingTips - A function that handles the chatbot interaction and returns personalized coping tips.
 * - AIChatbotPersonalizedCopingTipsInput - The input type for the aiChatbotPersonalizedCopingTips function.
 * - AIChatbotPersonalizedCopingTipsOutput - The return type for the aiChatbotPersonalizedCopingTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotPersonalizedCopingTipsInputSchema = z.object({
  userInput: z.string().describe('The user input text.'),
  mood: z.number().min(1).max(5).describe('The user\'s current mood on a scale of 1 to 5 (1 being very low, 5 being very high).'),
  studentData: z.string().optional().describe('Optional student data to personalize the response.'),
});
export type AIChatbotPersonalizedCopingTipsInput = z.infer<typeof AIChatbotPersonalizedCopingTipsInputSchema>;

const AIChatbotPersonalizedCopingTipsOutputSchema = z.object({
  copingTips: z.string().describe('Personalized coping tips and resources based on the user input and mood.'),
});
export type AIChatbotPersonalizedCopingTipsOutput = z.infer<typeof AIChatbotPersonalizedCopingTipsOutputSchema>;

export async function aiChatbotPersonalizedCopingTips(input: AIChatbotPersonalizedCopingTipsInput): Promise<AIChatbotPersonalizedCopingTipsOutput> {
  return aiChatbotPersonalizedCopingTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotPersonalizedCopingTipsPrompt',
  input: {schema: AIChatbotPersonalizedCopingTipsInputSchema},
  output: {schema: AIChatbotPersonalizedCopingTipsOutputSchema},
  prompt: `You are a mental health support chatbot designed to provide personalized coping tips and resources to students.

  Based on the student's input, mood, and any available student data, provide helpful and relevant coping tips and resources.

  Student Input: {{{userInput}}}
  Mood (1-5): {{{mood}}}
  Student Data: {{{studentData}}}

  Coping Tips:`,
});

const aiChatbotPersonalizedCopingTipsFlow = ai.defineFlow(
  {
    name: 'aiChatbotPersonalizedCopingTipsFlow',
    inputSchema: AIChatbotPersonalizedCopingTipsInputSchema,
    outputSchema: AIChatbotPersonalizedCopingTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
