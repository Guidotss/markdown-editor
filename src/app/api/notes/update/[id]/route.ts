import { NoteService } from "@/services";

const noteService = new NoteService();
interface Context {
  params: {
    id: string;
  };
}

export async function PUT(req: Request, context: Context) {
  const { ...note } = await req.json();
  const { id } = context.params;

  if (!id) {
    return new Response(
      JSON.stringify({ ok: false, message: "Bad request, id is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!note) {
    return new Response(
      JSON.stringify({ ok: false, message: "Bad request, note is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const updatedNote = await noteService.update(id, note);
    if (!updatedNote) { 
      return new Response(
        JSON.stringify({ ok: false, message: "Note not found" }),
        { status: 404, headers: { "Content-Type": "appliaction/json" } }
      );
    }
    return new Response(JSON.stringify({ ok: true, data: updatedNote }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ ok: false, message: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
