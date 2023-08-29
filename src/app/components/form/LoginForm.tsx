"use client";
import Link from "next/link";
import { useState } from "react";

type LoginForm = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const [{ email, password }, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  return (
    <form className="flex flex-col gap-10 ">
      <input
        className="bg-black text-white font-light 2xl:w-[400px] px-5 py-3 border-b-[1px] focus:outline-none focus:border-b-[1px] focus:border-coral transition-colors duration-300 ease-in-out"
        placeholder="example@hotmail.com"
        type="email"
        name="email"
        value={email}
        onChange={({ target }) =>
          setForm((prev) => ({ ...prev, email: target.value }))
        }
      />
      <input
        className="bg-black text-white font-light px-5 py-3 border-b-[1px] focus:outline-none focus:border-b-[1px] focus:border-coral transition-colors duration-300 ease-in-out"
        placeholder="**********"
        type="password"
        autoComplete="off"
        name="password"
        value={password}
        onChange={({ target }) =>
          setForm((prev) => ({ ...prev, password: target.value }))
        }
      />
      <button className="px-5 py-3 font-semibold text-xl rounded-md bg-coral hover:bg-apricot transition-colors duration-300 ease-in-out">
        Login
      </button>
      <div className="w-full flex justify-end">
        <Link href="/auth/register" className="font-light tracking-wide">
          <span>
            Don{"'"}t have an account?{" "}
            <span className="text-coral underline underline-offset-1">
              Register
            </span>
          </span>
        </Link>
      </div>
    </form>
  );
};
