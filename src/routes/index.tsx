import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotesList from "@/features/notes/pages/NotesPage";
import User from "@/features/users/User";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/notes" element={<NotesList />} />
        <Route path="/" element={<User/>}/>
      </Routes>
    </BrowserRouter>
  );
}
