export async function POST(req: Request) {
  const { userId,...note } = await req.json();
  if (!note) {
    return new Response(
      JSON.stringify({ ok: false, message: "Note is requiered" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ ok: false, message: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
