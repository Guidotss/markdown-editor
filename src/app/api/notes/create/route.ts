import { NoteService } from "@/services";

const noteService = new NoteService();

export async function POST(req: Request) {
  const { userId, ...note } = await req.json();
  if (!note) {
    return new Response(
      JSON.stringify({ ok: false, message: "Note is requiered" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

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
