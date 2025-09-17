import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createNote } from '../services/notesService';
import type { NoteCreateRequest } from '../models/NoteRequest';
import { toast } from "sonner"

export default function AddNote({ onNoteCreated }: { onNoteCreated: () => void }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const noteData: NoteCreateRequest = {
            title,
            content,
        };

        try {
            await createNote(noteData);
            setTitle('');
            setContent('');
            setOpen(false);
            toast("Note has been created.");
            onNoteCreated?.(); // refresh parent list
        } catch (err) {
            console.error('Failed to create note:', err);
            toast.error('Failed to create note.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="border-none hover:bg-transparent focus:ring-0 text-xl p-0 cursor-pointer">
                    +
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create new note</DialogTitle>
                        <DialogDescription>Click save when you&apos;re done.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="content">Content</Label>
                            <Input id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter className='mt-8'>
                        <DialogClose asChild>
                            <Button variant="outline" disabled={isLoading}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save changes'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
