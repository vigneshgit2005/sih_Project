'use client';

import { useState } from 'react';
import { forumPosts, ForumPost } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { MessageCircle, PlusCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

function PostCard({ post }: { post: ForumPost }) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle className="font-headline text-lg">{post.title}</CardTitle>
        <CardDescription>
          Posted by {post.author} • {formatDistanceToNow(post.timestamp, { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{post.content}</p>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <MessageCircle className="mr-2 h-4 w-4" /> {post.comments.length} comments
      </CardFooter>
    </Card>
  );
}

export default function Forum() {
  const [posts, setPosts] = useState<ForumPost[]>(forumPosts);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: ForumPost = {
      id: String(posts.length + 1),
      title: newPostTitle,
      content: newPostContent,
      author: `Anonymous Student ${String.fromCharCode(65 + posts.length)}`, // Generates A, B, C...
      timestamp: new Date(),
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    setIsDialogOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-end mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Create Post
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-headline">Create a New Anonymous Post</DialogTitle>
            </DialogHeader>
            <form onSubmit={handlePostSubmit} className="space-y-4">
              <Input
                placeholder="Post title..."
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                required
                className="text-base"
              />
              <Textarea
                placeholder="Share what's on your mind... Your post is anonymous."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                required
                rows={6}
              />
              <p className="text-xs text-muted-foreground">
                Please be respectful and follow community guidelines. All posts are moderated.
              </p>
              <Button type="submit" className="w-full">Post Anonymously</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
