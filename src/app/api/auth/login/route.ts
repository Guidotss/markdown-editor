import { AuthService, UserService } from "@/services";
import { signDocument } from "@/jwt";

const authService = new AuthService(new UserService());

export async function POST(req: Request) {
  const { ...userData } = await req.json();

  if (!userData) {
    return new Response(JSON.stringify({ ok: false, message: "Bad request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const user = await authService.login(userData.email, userData.password);
    if (!user) {
      return new Response(
        JSON.stringify({ ok: false, message: "Invalid credentials" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const token = signDocument(user.id, user.email, user.name);

    return new Response(JSON.stringify({ ok: true, user, token }), {
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
