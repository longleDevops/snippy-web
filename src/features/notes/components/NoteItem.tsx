import type { Note } from "../models/Note";

interface NoteItemProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
}

export default function NoteItem({ note, onEdit, onDelete }: NoteItemProps) {
  return (
    <li className="p-4 border rounded-xl shadow bg-white hover:shadow-md transition">
      <h2 className="text-lg font-semibold">{note.title}</h2>
      <p className="text-gray-600">{note.content}</p>

      <div className="mt-3 flex gap-2">
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          ✏️ Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          🗑 Delete
        </button>
      </div>
    </li>
  );
}
