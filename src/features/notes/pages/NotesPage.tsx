import { useEffect, useState } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "../services/notesService";
import type { Note } from "../models/Note";

import NotesList from "../components/NotesList";
import NoteForm from "../components/NoteForm";
import type { NoteCreateRequest, NoteUpdateRequest } from "../models/NoteRequest";

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

  const handleCreate = async (note: NoteCreateRequest) => {
    const created = await createNote(note);
    setNotes([...notes, created]);
  };

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
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Notes Manager</h1>

      {/* Notes List */}
      <NoteForm
        key={editingNote ? editingNote.id : "new"}
        note={editingNote}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onCancel={() => setEditingNote(null)}
      />

      {/* Notes List */}
      <NotesList
        notes={notes}
        onEdit={setEditingNote}
        onDelete={handleDelete}
      />
    </div>
  );
}
