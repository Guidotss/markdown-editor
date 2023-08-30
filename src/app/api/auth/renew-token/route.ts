import { UserService } from "@/services";
import { verifyToken, signDocument } from "@/jwt";

const userService = new UserService();

export async function GET(req: Request) {
  const header = req.headers.get("authorization") || "";
  const token = header.split(" ")[1];

  try {
    if (!token) {
      return new Response(
        JSON.stringify({ ok: false, message: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const decoded = (await verifyToken(token)) as any;

    const user = await userService.getUserById(decoded.id);

    if (!user) {
      return new Response(
        JSON.stringify({ ok: false, message: "User not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const newToken = signDocument(user.id!, user.email, user.name);

    return new Response(JSON.stringify({ ok: true, user, token: newToken }), {
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
