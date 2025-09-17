import ResourceList from "@/components/resources/ResourceList";

export default function ResourcesPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="font-headline text-4xl font-bold">Resource Hub</h1>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                    A curated library of self-help resources. Find articles, videos, and audio guides
                    to support your mental well-being, available in multiple languages.
                </p>
            </div>
            <ResourceList />
        </div>
    );
}
