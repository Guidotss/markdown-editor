import { NoteService } from "@/services";
import { verifyToken } from "@/jwt";

const noteService = new NoteService();

export async function POST(req: Request) {
  const { ...note } = await req.json();
  const bearer = req.headers.get("Authorization");
  const token = bearer?.split(" ")[1];

  if (!token) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: "Unauthorized",
      }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!note) {
    return new Response(
      JSON.stringify({ ok: false, message: "Note is requiered" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  const { id: userId } = (await verifyToken(token)) as unknown as {
    id: string;
  };

  try {
    const newNote = await noteService.create(note, userId);
    if (!newNote) {
      return new Response(
        JSON.stringify({
          ok: false,
          message: "Note not created",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
        note: newNote,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ ok: false, message: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
