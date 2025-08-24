import axios from "axios";

import type { Note } from "../models/Note"

const API_URL = "http://localhost:8081/api/v1/notes"; // replace with your Spring Boot endpoint

interface NotesApiResponse {
  timestamp: string;
  success: boolean;
  message: string;
  data: Note[];
}

export async function fetchNotes(): Promise<Note[]> {
  try {
    const response = await axios.get<NotesApiResponse>(API_URL);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw error; // rethrow so the UI can handle it
  }
}
