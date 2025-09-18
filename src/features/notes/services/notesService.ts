import axios from "axios";

import type { Note } from "../models/Note"
import type { NoteCreateRequest, NoteUpdateRequest } from "../models/NoteRequest";

const API_URL = "https://snippy-note-services-lelongdinh2015-dev.apps.rm1.0a51.p1.openshiftapps.com/api/v1/notes"; // replace with your Spring Boot endpoint

interface NotesApiResponse {
  timestamp: string;
  success: boolean;
  message: string;
  data: Note[];
}

export async function getNotes(): Promise<Note[]> {
  try {
    const response = await axios.get<NotesApiResponse>(API_URL);
    console.log("GET notes response: ", response.data)
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw error; // rethrow so the UI can handle it
  }
}

export async function createNote(note: NoteCreateRequest): Promise<Note> {
  const res = await axios.post(API_URL, note);
  return res.data.data;
}

export async function updateNote(note: NoteUpdateRequest, id: string): Promise<Note> {
  const res = await axios.put(`${API_URL}/${id}`, note);
  return res.data.data;
}

export async function deleteNote(id: string): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
