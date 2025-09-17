'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, HeartPulse } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/chatbot', label: 'AI Chatbot' },
  { href: '/booking', label: 'Book Session' },
  { href: '/resources', label: 'Resource Hub' },
  { href: '/forum', label: 'Peer Forum' },
  { href: '/admin', label: 'Admin' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const NavLink = ({ href, label }: { href: string; label:string }) => (
    <Link
        href={href}
        onClick={() => setIsOpen(false)}
        className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === href ? "text-primary" : "text-muted-foreground"
        )}
        >
        {label}
    </Link>
  );


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <HeartPulse className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold">Flourish</span>
        </Link>
        <nav className="hidden items-center space-x-6 md:flex">
            {navLinks.map(link => <NavLink key={link.href} {...link} />)}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
            <Button asChild className='rounded-full'>
                <Link href="/booking">Quick Helpline</Link>
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" className="md:hidden">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="flex flex-col space-y-6">
                        <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                            <HeartPulse className="h-6 w-6 text-primary" />
                            <span className="font-headline text-lg font-bold">Flourish</span>
                        </Link>
                        <nav className="flex flex-col space-y-4">
                            {navLinks.map(link => <NavLink key={link.href} {...link} />)}
                        </nav>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
