import BookingForm from "@/components/booking/BookingForm";

export default function BookingPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="font-headline text-4xl font-bold">Book a Session</h1>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                    Schedule a confidential appointment with a university counsellor or helpline.
                    Choose a professional, pick a date and time that works for you.
                </p>
            </div>
            <BookingForm />
        </div>
    );
}
