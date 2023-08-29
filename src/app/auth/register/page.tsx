import { RegisterForm } from "@/app/components/form/RegisterForm";

export default function Register() {
  return (
    <main className="text-white h-screen w-full flex flex-col items-center justify-center">
      <section className="flex flex-col items-center">
        <h4 className="text-4xl font-semibold mb-16 underline underline-offset-1 decoration-coral decoration-dashed tracking-wider">
          Register
        </h4>
        <RegisterForm />
      </section>
    </main>
  );
}
