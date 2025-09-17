import Link from "next/link";
import { HeartPulse } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-8 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
             <Link href="/" className="flex items-center space-x-2">
                <HeartPulse className="h-6 w-6 text-primary" />
                <span className="font-headline text-lg font-bold">Flourish</span>
             </Link>
            <p className="text-sm text-muted-foreground">Your mental wellness companion.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-headline font-semibold">Important</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <h4 className="font-headline font-semibold text-foreground">Disclaimer</h4>
            <p>
              <span className="font-semibold">Confidentiality:</span> All interactions on this platform are confidential. However, if there is a risk of harm to yourself or others, our team is obligated to take action to ensure safety.
            </p>
            <p className="font-semibold text-destructive">
              If you are in a crisis or any other person may be in danger, please don't use this site. Call 911 or your local emergency number immediately.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Flourish. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
