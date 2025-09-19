import type { Note } from "../models/Note";

interface NoteDetailProps {
  note: Note ;
}

export default function NoteDetail({ note }: NoteDetailProps) {
  return (
    <div className="border-2 border-amber-300 w-full">
        <div>title: {note.title}</div>
        <div>Content: {note.content}</div>
    </div>
  );
}
