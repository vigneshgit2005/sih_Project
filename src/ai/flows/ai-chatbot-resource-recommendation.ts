// A flow that recommends relevant mental health resources based on user input.

'use server';

/**
 * @fileOverview An AI agent for recommending mental health resources to students.
 *
 * - recommendResources - A function that recommends mental health resources.
 * - RecommendResourcesInput - The input type for the recommendResources function.
 * - RecommendResourcesOutput - The return type for the recommendResources function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendResourcesInputSchema = z.object({
  userInput: z
    .string()
    .describe('The user input or query regarding mental health support.'),
  mood: z
    .string()
    .optional()
    .describe('The current mood of the user (e.g., happy, sad, anxious).'),
  studentData: z
    .string()
    .optional()
    .describe('Additional student data for personalization.'),
});

export type RecommendResourcesInput = z.infer<typeof RecommendResourcesInputSchema>;

const ResourceSchema = z.object({
  title: z.string().describe('The title of the resource.'),
  description: z.string().describe('A brief description of the resource.'),
  url: z.string().url().describe('The URL of the resource.'),
  category: z.string().describe('The category of the resource (e.g., anxiety, depression).'),
  language: z.string().describe('The language of the resource.'),
});

const RecommendResourcesOutputSchema = z.object({
  resources: z.array(ResourceSchema).describe('A list of recommended mental health resources.'),
  reasoning: z.string().describe('Explanation of why these resources were recommended.'),
});

export type RecommendResourcesOutput = z.infer<typeof RecommendResourcesOutputSchema>;

export async function recommendResources(input: RecommendResourcesInput): Promise<RecommendResourcesOutput> {
  return recommendResourcesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendResourcesPrompt',
  input: {schema: RecommendResourcesInputSchema},
  output: {schema: RecommendResourcesOutputSchema},
  prompt: `You are a mental health support chatbot for university students. Based on the student's input, mood, and any available student data, recommend relevant mental health resources.

Student Input: {{{userInput}}}
Mood: {{{mood}}}
Student Data: {{{studentData}}}

Consider resources that address common issues like anxiety, depression, stress, and social isolation. Resources should be easily accessible and available in multiple languages.

Format your output as a JSON object with a 'resources' array and a 'reasoning' field.  The 'resources' array should contain resources with fields for 'title', 'description', 'url', 'category', and 'language'. The reasoning field explains why the suggested resources were recommended.
`,
});

const recommendResourcesFlow = ai.defineFlow(
  {
    name: 'recommendResourcesFlow',
    inputSchema: RecommendResourcesInputSchema,
    outputSchema: RecommendResourcesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
