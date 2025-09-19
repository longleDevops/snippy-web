import type { Note } from "../models/Note";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface NoteItemProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
  isSelected: boolean;
  onClick: () => void;
}

export default function NoteItem({ note, isSelected, onClick }: NoteItemProps) {
  return (
    <Card
      className={`w-full max-w-sm h-60 border-2 ${isSelected ? "border-blue-500" : "border-transparent"}`}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <CardDescription>
          //description
        </CardDescription>
      </CardHeader>
      <CardContent >
        {note.content}
      </CardContent>
      {/* <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter> */}
    </Card>
  );
}
