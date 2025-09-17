'use client';

import { useState } from 'react';
import Image from 'next/image';
import { counselors, Counselor } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'
];

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleCounselorSelect = (counselor: Counselor) => {
    setSelectedCounselor(counselor);
    setStep(2);
  };

  const handleDateTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
  };
  
  const resetFlow = () => {
    setStep(1);
    setSelectedCounselor(null);
    setSelectedDate(new Date());
    setSelectedTime(null);
  }

  return (
    <Card className="max-w-4xl mx-auto shadow-lg">
      <CardContent className="p-2 sm:p-6">
        {step === 1 && (
          <div>
            <h2 className="font-headline text-2xl font-semibold text-center mb-6">Step 1: Choose a Counsellor or Helpline</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {counselors.map((counselor) => (
                <Card key={counselor.id} className="flex flex-col items-center p-6 text-center transition-all hover:shadow-xl hover:-translate-y-1">
                  <Image
                    src={counselor.imageUrl}
                    alt={counselor.name}
                    width={100}
                    height={100}
                    className="rounded-full mb-4 border-4 border-secondary"
                    data-ai-hint="person portrait"
                  />
                  <h3 className="font-headline text-lg font-semibold">{counselor.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{counselor.specialty}</p>
                  <Button onClick={() => handleCounselorSelect(counselor)} className="w-full rounded-full">Select</Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 2 && selectedCounselor && (
          <div>
            <Button variant="ghost" onClick={() => setStep(1)} className="mb-4"><ArrowLeft className="mr-2 h-4 w-4"/>Back to counsellors</Button>
            <h2 className="font-headline text-2xl font-semibold text-center mb-1">Step 2: Pick a Date & Time</h2>
            <p className="text-muted-foreground text-center mb-6">For {selectedCounselor.name}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="flex justify-center">
                 <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                  />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map(time => (
                  <Button 
                    key={time} 
                    variant="outline" 
                    onClick={() => handleDateTimeSelect(time)}
                    className="rounded-full"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && selectedCounselor && selectedDate && selectedTime && (
            <div className="text-center p-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4"/>
                <h2 className="font-headline text-3xl font-bold mb-2">Appointment Confirmed!</h2>
                <p className="text-muted-foreground mb-6 text-lg">Your session has been successfully booked.</p>
                <Card className="text-left w-full max-w-md mx-auto bg-secondary">
                    <CardHeader>
                        <CardTitle>Booking Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p><strong>Counsellor:</strong> {selectedCounselor.name}</p>
                        <p><strong>Date:</strong> {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p><strong>Time:</strong> {selectedTime}</p>
                    </CardContent>
                </Card>
                <p className="text-xs text-muted-foreground mt-4">A confirmation will be sent to your university email address.</p>
                <Button onClick={resetFlow} className="mt-6 rounded-full">Book Another Appointment</Button>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
