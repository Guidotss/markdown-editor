interface Context {
  params: {
    id: string;
  };
}

export async function PUT(req: Request, context: Context) {
  const { note } = await req.json();
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
}
