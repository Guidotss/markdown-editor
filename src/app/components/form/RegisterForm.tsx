"use client";
import { useContext, useState } from "react";
import { useRouter } from 'next/navigation'; 
import Link from "next/link";
import { AuthContext } from "@/context/auth";

type RegisterForm = {
  email: string;
  password: string;
  name: string;
};

export const RegisterForm = () => {
  const [{ email, password, name }, setForm] = useState<RegisterForm>({
    email: "",
    password: "",
    name: "",
  });
  const router = useRouter(); 
  const { register } = useContext(AuthContext); 

  const handleRegister = async (e:React.FormEvent) => {
    e.preventDefault();
    if(name.trim() == '' || email.trim() == '' || password.trim() == '') {
      return;
    }
    try{
      const ok = await register(name, email, password);
      if(ok){
        router.push('/');
      }

    }catch(error){
      console.log(error);
    }
  }


  return (
    <form className="flex flex-col gap-10 2xl:w-[30vw]" onSubmit={handleRegister}>
      <div className="flex gap-10">
        <input
          className="bg-black text-white font-light 2xl:w-[400px] lg:w-[250px] 2xl:px-5 py-3 lg:px-3 border-b-[1px] focus:outline-none focus:border-b-[1px] focus:border-coral transition-colors duration-300 ease-in-out"
          placeholder="Guido Olguin"
          type="text"
          name="name"
          value={name}
          onChange={({ target }) =>
            setForm((prev) => ({ ...prev, name: target.value }))
          }
        />
        <input
          className="bg-black text-white font-light 2xl:w-[400px] lg:w-[250px] 2xl:px-5 py-3 lg:px-3 border-b-[1px] focus:outline-none focus:border-b-[1px] focus:border-coral transition-colors duration-300 ease-in-out"
          placeholder="example@hotmail.com"
          type="email"
          name="email"
          value={email}
          onChange={({ target }) =>
            setForm((prev) => ({ ...prev, email: target.value }))
          }
        />
      </div>
      <input
        className="bg-black text-white font-light px-5 py-3 border-b-[1px] focus:outline-none focus:border-b-[1px] focus:border-coral transition-colors duration-300 ease-in-out"
        placeholder="******************"
        type="password"
        autoComplete="off"
        name="password"
        value={password}
        onChange={({ target }) =>
          setForm((prev) => ({ ...prev, password: target.value }))
        }
      />
      <button className="2xl:px-5 2xl:py-3 lg:py-2 font-semibold text-xl rounded-md bg-coral hover:bg-apricot transition-colors duration-300 ease-in-out">
        Register
      </button>
      <div className="w-full flex justify-end">
        <Link href="/auth/login" className="font-light tracking-wide">
          <span>
            Already have an account?{" "}
            <span className="text-coral underline underline-offset-1">
              Login
            </span>
          </span>
        </Link>
      </div>
    </form>
  );
};
