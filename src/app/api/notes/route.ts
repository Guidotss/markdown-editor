import { NoteService } from "@/services";
import { verifyToken } from "@/jwt";

const noteService = new NoteService();

export async function GET(req: Request) {
  const bearer = req.headers.get("Authorization");
  const token = bearer?.split(" ")[1];

  if (!token) {
    return new Response(
      JSON.stringify({ ok: false, message: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const { id: userId } = (await verifyToken(token)) as unknown as {
    id: string;
  };

  if (!userId) {
    return new Response(
      JSON.stringify({ ok: false, message: "User id is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const userNotes = await noteService.getAllNotes(userId);

  return new Response(JSON.stringify({ ok: true ,notes:userNotes }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
