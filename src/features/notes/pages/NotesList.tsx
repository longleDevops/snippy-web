import { useEffect, useState } from "react";
import { fetchNotes } from "../services/notesService";
import type { Note } from '../models/Note'

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    const loadNotes = async () => {
        try {
            const data = await fetchNotes();
            setNotes(data);
        } catch (err) {
            setError("Unable to load notes.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    loadNotes();
  }, [])

  if (loading) return <p className="text-center text-gray-500">Loading notes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Notes</h1>
      {notes.length === 0 ? (
        <p className="text-gray-500">No notes found.</p>
      ) : (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li
              key={note.id}
              className="p-4 border rounded-xl shadow-sm bg-white hover:bg-gray-50"
            >
              <h2 className="text-lg font-semibold">{note.title}</h2>
              <p className="text-gray-600">{note.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
