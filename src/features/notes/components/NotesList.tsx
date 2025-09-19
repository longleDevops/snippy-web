import { ScrollArea } from "@/components/ui/scroll-area";
import type { Note } from "../models/Note";
import NoteItem from "./NoteItem";
import { useNoteStore } from "@/store/useNoteStore";

interface NotesListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export default function NotesList({ notes, onEdit, onDelete }: NotesListProps) {
  const selectedId = useNoteStore((state) => state.selectedId);
  const setSelectedId = useNoteStore((state) => state.setSelectedId);

  if (notes.length === 0) {
    return <p className="text-gray-500 text-center">No notes found.</p>;
  }

  return (
    <ScrollArea className="p-4">
      <ul className="space-y-4">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onEdit={() => onEdit(note)}
            onDelete={() => onDelete(note.id)}
            isSelected={selectedId === note.id}
            onClick={() => setSelectedId(note.id)}
          />
        ))}
      </ul>
    </ScrollArea>
  );
}
