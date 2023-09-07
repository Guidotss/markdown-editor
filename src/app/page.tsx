import { Editor } from "./components/editor";
import { SaveForm } from "./components/form";
import { Preview } from "./components/preview";
import { Navbar, Sidebar } from "./components/shared";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <header>
        <Navbar />
      </header>
      <section className="flex w-full">
        <Sidebar />
        <div className="flex flex-col w-full border-r-[1px]">
          <header className="bg-dark_charcoal px-5 py-2">
            <h3 className="text-light_gray text-xl">Markdown</h3>
          </header>
          <div className="lg:min-h-[81vh] 2xl:min-h-[89vh]">
            <Editor />
          </div>
        </div>
        <SaveForm/>
        <div className="flex flex-col w-full">
          <header className="bg-dark_charcoal px-5 py-2">
            <h3 className="text-light_gray text-xl">Preview</h3>
          </header>
          <div className="lg:max-h-[81vh] 2xl:max-h-[89vh] overflow-auto">
            <Preview />
          </div>
        </div>
      </section>
    </main>
  );
}
