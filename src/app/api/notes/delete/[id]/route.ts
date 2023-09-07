import { NoteService } from "@/services";

const noteService = new NoteService();

interface Context {
  params: {
    id: string;
  };
}

export async function DELETE(_: Request, context: Context) {
  const { id } = context.params;

  if (!id) {
    return new Response(
      JSON.stringify({ ok: false, message: "Id is required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  try {
    const note = await noteService.delete(id);
    if (!note) {
      return new Response(
        JSON.stringify({ ok: false, message: "Note not found" }),
        { status: 404, headers: { "Content-Type": "application/json " } }
      );
    }
    return new Response(JSON.stringify({ ok: true, note }));
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ ok: false, message: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json " } }
    );
  }
}
