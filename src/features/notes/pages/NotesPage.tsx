import { useEffect, useState } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "../services/notesService";
import type { Note } from "../models/Note";
import { Button } from "@/components/ui/button";
import NotesList from "../components/NotesList";
import NoteForm from "../components/NoteForm";
import type { NoteCreateRequest, NoteUpdateRequest } from "../models/NoteRequest";
import AddNote from "../components/AddNote";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const loadNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch {
      setError("Unable to load notes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleUpdate = async (note: NoteUpdateRequest, id: string) => {
    const updated = await updateNote(note, id);
    setNotes(notes.map((n) => (n.id === updated.id ? updated : n)));
    setEditingNote(null);
  };

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    // setNotes(notes.filter((n) => n.id !== id));
  };

  if (loading) return <p className="text-center text-gray-500">Loading notes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-blue-200 flex w-screen h-screen">
      <div className="w-100 bg-red-200 p-2 h-full flex flex-col">
        <div className="flex justify-between p-4 border-red-600 border-1 items-center">
          <p>My notes</p>
          <AddNote onNoteCreated={loadNotes}/>
        </div>

        <NotesList
          notes={notes}
          onEdit={setEditingNote}
          onDelete={handleDelete}
        />
      </div>

      <div className="bg-brown-200">

      </div>


    </div>
  );
}
