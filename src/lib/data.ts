import {
  BookOpen,
  Headphones,
  MessageCircle,
  Video,
} from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

export type Counselor = {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
};

export const counselors: Counselor[] = [
  {
    id: '1',
    name: 'Dr. Anya Sharma',
    specialty: 'Anxiety & Stress Management',
    imageUrl: 'https://picsum.photos/seed/counselor1/400/400',
  },
  {
    id: '2',
    name: 'Mr. Ben Carter',
    specialty: 'Depression & Burnout',
    imageUrl: 'https://picsum.photos/seed/counselor2/400/400',
  },
  {
    id: '3',
    name: 'Ms. Chloe Davis',
    specialty: 'Relationship & Social Issues',
    imageUrl: 'https://picsum.photos/seed/counselor3/400/400',
  },
  {
    id: '4',
    name: 'National Helpline',
    specialty: '24/7 Crisis Support',
    imageUrl: 'https://picsum.photos/seed/helpline/400/400',
  },
];

export type Resource = {
  id: string;
  title: string;
  description: string;
  category: 'Anxiety' | 'Depression' | 'Stress' | 'Mindfulness';
  type: 'Article' | 'Video' | 'Audio' | 'Guide';
  language: 'English' | 'Hindi' | 'Bengali' | 'Tamil';
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const resources: Resource[] = [
  {
    id: '1',
    title: '5-Minute Breathing Exercise for Calm',
    description: 'A quick audio guide to center yourself during stressful moments.',
    category: 'Anxiety',
    type: 'Audio',
    language: 'English',
    Icon: Headphones,
  },
  {
    id: '2',
    title: 'Understanding the Cycle of Depression',
    description: 'An animated video explaining the cognitive patterns of depression.',
    category: 'Depression',
    type: 'Video',
    language: 'English',
    Icon: Video,
  },
  {
    id: '3',
    title: 'Introduction to Mindfulness',
    description: 'A simple article on how to practice mindfulness in daily life.',
    category: 'Mindfulness',
    type: 'Article',
    language: 'Hindi',
    Icon: BookOpen,
  },
  {
    id: '4',
    title: 'Effective Stress Management Techniques',
    description: 'A downloadable PDF guide with practical tips for students.',
    category: 'Stress',
    type: 'Guide',
    language: 'Bengali',
    Icon: BookOpen,
  },
  {
    id: '5',
    title: 'Challenging Negative Thoughts',
    description: 'Learn cognitive-behavioral techniques to reframe your thinking.',
    category: 'Anxiety',
    type: 'Article',
    language: 'Tamil',
    Icon: BookOpen,
  },
  {
    id: '6',
    title: 'Guided Meditation for Better Sleep',
    description: 'An audio track to help you relax and fall asleep faster.',
    category: 'Mindfulness',
    type: 'Audio',
    language: 'English',
    Icon: Headphones,
  },
];

export type ForumPost = {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: Date;
  comments: { id: string; author: string; content: string; timestamp: Date }[];
};

export const forumPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Feeling overwhelmed with exam pressure. Any tips?',
    content: 'I have three finals next week and I feel like I can\'t handle it. The pressure is immense and my anxiety is through the roof. How do you all cope with this?',
    author: 'Anonymous Student A',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    comments: [
      {
        id: 'c1',
        author: 'Anonymous Student B',
        content: 'I totally get that. I find the Pomodoro technique really helps me break down study sessions into manageable chunks. 25 mins on, 5 mins off. It makes it feel less daunting.',
        timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
      },
      {
        id: 'c2',
        author: 'Anonymous Student C',
        content: 'Remember to take breaks and do something you enjoy! Even 15 minutes of music or a short walk can make a huge difference. You\'ve got this!',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
    ],
  },
  {
    id: '2',
    title: 'How to deal with social isolation on campus?',
    content: 'I\'m a first-year student and I\'m finding it really hard to make friends. It feels like everyone already has their groups. I feel pretty lonely. Any advice?',
    author: 'Anonymous Student D',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    comments: [
        {
        id: 'c3',
        author: 'Anonymous Student E',
        content: 'Joining a club or society for a hobby you\'re interested in can be a great way to meet like-minded people. Less pressure than just approaching random people.',
        timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000),
      },
    ],
  },
];


export type PlaceholderImage = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const placeholderImages: PlaceholderImage[] = [
  {
    id: 'hero-home',
    description: 'A serene and welcoming illustration of diverse students in a calm, supportive environment.',
    imageUrl: 'https://picsum.photos/seed/hero-home/1200/800',
    imageHint: 'diverse students',
  },
  {
    id: 'feature-chatbot',
    description: 'An abstract illustration representing AI and communication.',
    imageUrl: 'https://picsum.photos/seed/feature-chatbot/600/400',
    imageHint: 'AI communication',
  },
  {
    id: 'feature-booking',
    description: 'A graphic of a calendar and clock, symbolizing scheduling.',
    imageUrl: 'https://picsum.photos/seed/feature-booking/600/400',
    imageHint: 'calendar schedule',
  },
  {
    id: 'feature-resources',
    description: 'An illustration of books and digital media icons.',
    imageUrl: 'https://picsum.photos/seed/feature-resources/600/400',
    imageHint: 'books media',
  },
  {
    id: 'feature-forum',
    description: 'An abstract depiction of a community network or conversation bubbles.',
    imageUrl: 'https://picsum.photos/seed/feature-forum/600/400',
    imageHint: 'community network',
  },
];
