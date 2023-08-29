import { AuthService, UserService } from "@/services";

const authService = new AuthService(new UserService());

export async function POST(req: Request) {
  const { ...user } = await req.json();
  if (!user) {
    return new Response(JSON.stringify({ ok: false, message: "Bad request" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const newUser = await authService.register(
      user.email,
      user.name,
      user.password
    );
    
    if (!newUser) {
      return new Response(
        JSON.stringify({ ok: false, message: "Error registering user" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ ok: true, newUser }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ ok: false, message: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
