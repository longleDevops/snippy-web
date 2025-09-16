import { useState, useEffect } from "react";
import type { Note } from "../models/Note";
import type { NoteCreateRequest, NoteUpdateRequest } from "../models/NoteRequest";

interface NoteFormProps {
  note?: Note | null;
  onCreate: (note: NoteCreateRequest) => void;
  onUpdate: (note: NoteUpdateRequest, id: string) => void;
  onCancel: () => void;
}

export default function NoteForm({ note, onCreate, onUpdate, onCancel }: NoteFormProps) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSubmit = () => {
  if (!title.trim() || !content.trim()) return;

  if (note) {
    // 🔹 update (pass only title + content as request, id separately)
    const updateReq: NoteUpdateRequest = { title, content };
    onUpdate(updateReq, note.id);
  } else {
    // 🔹 create
    const createReq: NoteCreateRequest = { title, content };
    onCreate(createReq);
  }

  setTitle("");
  setContent("");
};


  return (
    <div className="p-4 border rounded bg-gray-50">
      <h2 className="text-lg font-semibold mb-2">
        {note ? "Edit Note" : "Create Note"}
      </h2>

      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 rounded w-full mb-2"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {note ? "💾 Update" : "➕ Create"}
        </button>
        {note && (
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
