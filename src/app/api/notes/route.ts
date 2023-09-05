import { NextRequest } from "next/server";
import { NoteService } from "@/services";

const noteService = new NoteService();

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("id");

  if (!userId) {
    return new Response(
      JSON.stringify({ ok: false, message: "User id is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const userNotes = await noteService.getAllNotes(userId);

  return new Response(JSON.stringify({ ok: true, userNotes }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
