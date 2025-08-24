import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotesList from "@/features/notes/pages/NotesList";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
            <Route path="/notes" element={<NotesList />} />
      </Routes>
    </BrowserRouter>
  );
}
