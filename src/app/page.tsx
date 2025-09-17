import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, MessageSquare, Calendar, BookOpen, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { placeholderImages } from '@/lib/data';

const features = [
  {
    title: 'AI Chatbot Support',
    description: 'Get immediate, private support from our AI chatbot, offering coping tips and a listening ear 24/7.',
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    href: '/chatbot',
    cta: 'Start Chatting',
    image: placeholderImages.find(p => p.id === 'feature-chatbot')
  },
  {
    title: 'Book a Session',
    description: 'Easily schedule a confidential appointment with a qualified university counsellor at a time that works for you.',
    icon: <Calendar className="h-8 w-8 text-primary" />,
    href: '/booking',
    cta: 'Book Now',
    image: placeholderImages.find(p => p.id === 'feature-booking')
  },
  {
    title: 'Resource Hub',
    description: 'Explore a curated library of articles, videos, and audio guides on various mental wellness topics.',
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    href: '/resources',
    cta: 'Explore Resources',
    image: placeholderImages.find(p => p.id === 'feature-resources')
  },
  {
    title: 'Peer Support Forum',
    description: 'Connect with fellow students in a safe, anonymous, and moderated space to share and support each other.',
    icon: <Users className="h-8 w-8 text-primary" />,
    href: '/forum',
    cta: 'Join the Community',
    image: placeholderImages.find(p => p.id === 'feature-forum')
  },
];

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === 'hero-home');
  return (
    <div className="flex flex-col">
      <section className="bg-secondary">
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24 lg:px-8">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Connect & Cope.
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              A stigma-free space for students to find support, resources, and community for their mental well-being.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/chatbot">Start Chat <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link href="/booking">Book a Session</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 w-full md:h-auto md:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
             {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />
            )}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Your Path to Wellness Starts Here</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              We provide a suite of tools designed to support you on your mental health journey, whenever you need it.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            {features.map((feature) => (
              <Card key={feature.title} className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col sm:flex-row">
                <div className="relative h-48 sm:h-auto sm:w-1/3">
                  {feature.image && (
                     <Image
                        src={feature.image.imageUrl}
                        alt={feature.image.description}
                        fill
                        className="object-cover"
                        data-ai-hint={feature.image.imageHint}
                      />
                  )}
                </div>
                <div className="flex flex-col justify-between p-6 sm:w-2/3">
                  <div>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="font-headline text-2xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="mb-6">{feature.description}</CardDescription>
                  </div>
                  <Button asChild className="mt-auto w-full sm:w-fit rounded-full">
                    <Link href={feature.href}>{feature.cta}<ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
