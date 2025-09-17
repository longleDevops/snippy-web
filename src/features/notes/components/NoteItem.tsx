import type { Note } from "../models/Note";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button} from "@/components/ui/button";

interface NoteItemProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
}

export default function NoteItem({ note }: NoteItemProps) {
  return (
    <Card className="w-full max-w-sm h-60">
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
