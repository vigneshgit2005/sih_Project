import Dashboard from "@/components/admin/Dashboard";

export default function AdminPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="font-headline text-4xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                    Anonymized analytics and trends for monitoring student mental well-being.
                </p>
            </div>
            <Dashboard />
        </div>
    );
}
