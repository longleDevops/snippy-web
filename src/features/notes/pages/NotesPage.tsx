import { useEffect, useState } from "react";
import { getNotes, deleteNote } from "../services/notesService";
import type { Note } from "../models/Note";
import NotesList from "../components/NotesList";
import AddNote from "../components/AddNote";
import { useNoteStore } from "@/store/useNoteStore";
import NoteDetail from "../components/NoteDetail";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setEditingNote] = useState<Note | null>(null);
  const selectedId = useNoteStore((state) => state.selectedId);
  const setSelectedId = useNoteStore((state) => state.setSelectedId);
  const selectedNote = notes.find((n) => n.id == selectedId) || null;

  const loadNotes = async () => {
    console.log("Fetching notes...");
    try {
      const data = await getNotes();
      console.log("Fetched notes data:", data);
      setNotes(data);
      if (data.length > 0 && !selectedId) {
        setSelectedId(data[0].id);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      setError("Unable to load notes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("NotesPage mounted");
    loadNotes();
  }, []);

  const handleDelete = async (id: string) => {
    console.log("Deleting note with id:", id);
    await deleteNote(id);
    setNotes(notes.filter((n) => n.id !== id));
  };

  if (loading) return <p className="text-center text-gray-500">Loading notes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-blue-200 flex w-screen h-screen max-w-screen overflow-x-hidden overflow-y-auto">
      <div className="w-100 bg-red-200 p-2 h-full flex flex-col">
        <div className="flex justify-between p-4 border-red-600 border-1 items-center">
          <p>My notes</p>
          <AddNote onNoteCreated={loadNotes} />
        </div>

        <NotesList
          notes={notes}
          onEdit={setEditingNote}
          onDelete={handleDelete}
        />
      </div>

      <div className="bg-brown-200 w-full">
        {
          selectedNote != null &&
          <NoteDetail
            note={selectedNote}
          /> 
        }
      </div>

    </div>
  );
}
