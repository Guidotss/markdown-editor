import { Editor } from "./components/editor";
import { Preview } from "./components/preview";
import { Navbar, Sidebar } from "./components/shared";

export default function Home() {
  return (
    <main>
      <header>
        <Navbar />
      </header>
      <section className="flex w-full">
        <Sidebar/>
        <div className="flex flex-col w-full border-r-[1px]">
          <header className="bg-dark_charcoal px-5 py-2">
            <h3 className="text-light_gray text-xl">Markdown</h3>
          </header>
          <div>
            <Editor/>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <header className="bg-dark_charcoal px-5 py-2">
            <h3 className="text-light_gray text-xl">Preview</h3>
          </header>
          <div className="h-screen">
            <Preview/>
          </div>
        </div>
      </section>
    </main>
  )
}
