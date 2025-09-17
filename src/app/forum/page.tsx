import Forum from "@/components/forum/Forum";

export default function ForumPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="font-headline text-4xl font-bold">Peer Support Forum</h1>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                    Connect with your peers in a moderated, anonymous environment.
                    Share your experiences, ask questions, and support one another.
                </p>
            </div>
            <Forum />
        </div>
    );
}
