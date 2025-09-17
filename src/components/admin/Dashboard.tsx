'use client';

import { BarChart, LineChart, PieChart } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Button } from '@/components/ui/button';

const moodChartData = [
  { date: 'Jan', mood: 2.8 },
  { date: 'Feb', mood: 3.1 },
  { date: 'Mar', mood: 3.0 },
  { date: 'Apr', mood: 3.5 },
  { date: 'May', mood: 3.2 },
  { date: 'Jun', mood: 2.9 },
];

const appointmentChartData = [
  { topic: 'Anxiety', count: 120 },
  { topic: 'Depression', count: 85 },
  { topic: 'Stress', count: 150 },
  { topic: 'Relationships', count: 60 },
  { topic: 'Other', count: 40 },
];

const resourceChartData = [
  { type: 'Articles', value: 400 },
  { type: 'Videos', value: 300 },
  { type: 'Audio', value: 300 },
  { type: 'Guides', value: 200 },
];

const chartConfig = {
  mood: { label: 'Avg. Mood', color: 'hsl(var(--primary))' },
  count: { label: 'Appointments', color: 'hsl(var(--accent))' },
};

export default function Dashboard() {
  return (
    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Key Metrics</CardTitle>
          <CardDescription>Overview of platform engagement.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-secondary p-4">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-3xl font-bold">1,254</p>
          </div>
          <div className="rounded-lg bg-secondary p-4">
            <p className="text-sm text-muted-foreground">Appointments This Month</p>
            <p className="text-3xl font-bold">215</p>
          </div>
          <div className="rounded-lg bg-secondary p-4">
            <p className="text-sm text-muted-foreground">Forum Posts Today</p>
            <p className="text-3xl font-bold">18</p>
          </div>
          <div className="rounded-lg bg-secondary p-4">
            <p className="text-sm text-muted-foreground">Avg. Mood Score</p>
            <p className="text-3xl font-bold">3.1/5</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Average Mood Trend</CardTitle>
          <CardDescription>Monthly average mood score from chatbot.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <RechartsLineChart data={moodChartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis domain={[1, 5]}/>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line dataKey="mood" type="monotone" stroke="var(--color-mood)" strokeWidth={2} dot={true} />
            </RechartsLineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Appointment Topics</CardTitle>
          <CardDescription>Distribution of booking reasons.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <RechartsBarChart data={appointmentChartData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="topic" type="category" tickLine={false} axisLine={false} tickMargin={8} width={80}/>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="count" layout="vertical" fill="var(--color-count)" radius={4} />
            </RechartsBarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="xl:col-span-3">
        <CardHeader>
            <CardTitle className="font-headline">Send Notification</CardTitle>
            <CardDescription>Broadcast a message to all student users (e.g., announcing a new wellness workshop).</CardDescription>
        </CardHeader>
        <CardContent>
            <Button>Send Notification</Button>
            <p className="text-xs text-muted-foreground mt-2">This feature is a placeholder and not functional.</p>
        </CardContent>
      </Card>
    </div>
  );
}
