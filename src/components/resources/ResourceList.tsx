'use client';

import { useState, useMemo } from 'react';
import { resources, Resource } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const allCategories = ['All', ...Array.from(new Set(resources.map(r => r.category)))];
const allTypes = ['All', ...Array.from(new Set(resources.map(r => r.type)))];
const allLanguages = ['All', ...Array.from(new Set(resources.map(r => r.language)))];

export default function ResourceList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');
    const [languageFilter, setLanguageFilter] = useState('All');

    const filteredResources = useMemo(() => {
        return resources.filter(resource => {
            const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || resource.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter === 'All' || resource.category === categoryFilter;
            const matchesType = typeFilter === 'All' || resource.type === typeFilter;
            const matchesLanguage = languageFilter === 'All' || resource.language === languageFilter;
            return matchesSearch && matchesCategory && matchesType && matchesLanguage;
        });
    }, [searchTerm, categoryFilter, typeFilter, languageFilter]);

    return (
        <div>
            <Card className="mb-8 p-6 shadow-sm">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <Input
                        placeholder="Search resources..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="md:col-span-4"
                    />
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                        <SelectContent>
                            {allCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                        </SelectContent>
                    </Select>
                     <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                        <SelectContent>
                            {allTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                        </SelectContent>
                    </Select>
                     <Select value={languageFilter} onValueChange={setLanguageFilter}>
                        <SelectTrigger><SelectValue placeholder="Language" /></SelectTrigger>
                        <SelectContent>
                             {allLanguages.map(lang => <SelectItem key={lang} value={lang}>{lang}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </Card>

            {filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredResources.map(resource => (
                        <Link href="#" key={resource.id} className="block">
                            <Card className="h-full transition-all hover:shadow-xl hover:-translate-y-1">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div className='flex-1'>
                                        <CardTitle className="font-headline text-lg mb-2">{resource.title}</CardTitle>
                                        <div className="flex gap-2 flex-wrap">
                                            <Badge variant="secondary">{resource.category}</Badge>
                                            <Badge variant="outline">{resource.language}</Badge>
                                        </div>
                                    </div>
                                    <resource.Icon className="h-8 w-8 text-primary" />
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{resource.description}</CardDescription>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <h3 className="font-headline text-2xl">No Resources Found</h3>
                    <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    );
}
