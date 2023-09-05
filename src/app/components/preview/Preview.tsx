"use client";
import { useContext } from "react";
import Markdown from "markdown-to-jsx";
import { NoteContext } from "@/context/notes";

const options = {
  h1: {
    props: {
      className: "text-4xl font-semibold text-white mb-5",
    },
  },
  h2: {
    props: {
      className: "text-3xl text-white font-light mb-5",
    },
  },
  h3: {
    props: {
      className: "text-2xl font-semibold text-white mb-5",
    },
  },
  h4: {
    props: {
      className: "text-xl text-white mb-5",
    },
  },
  h5: {
    props: {
      className: "text-lg text-white mb-5",
    },
  },
  h6: {
    props: {
      className: "text-md text-coral mb-5",
    },
  },

  code: {
    props: {
      className: "bg-slate_gray text-sm text-white p-1 rounded-md mb-5",
    },
  },
  blockquote: {
    props: {
      className:
        "border-l-4 border-coral text-sm p-1 pl-2 mb-5 py-5 bg-slate_gray",
    },
  },
  a: {
    props: {
      className: "text-coral underline",
    },
  },
  p: {
    props: {
      className: "text-light_gray text-sm py-5",
    },
  },
  span: {
    props: {
      className: "text-light_gray text-sm",
    },
  },
  ol: {
    props: {
      className: "list-decimal list-inside text-light_gray text-sm mb-5",
    },
  },
  li: {
    props: {
      className: "text-sm font-light ",
    },
  },
  ul: {
    props: {
      className: "list-disc list-inside text-light_gray text-sm mb-5",
    },
  },
};

export const Preview = () => {
  const { currentNote } = useContext(NoteContext);
  return (
    <div className="w-full h-full bg-black p-5 outline-none resize-none overflow-auto">
      <Markdown
        options={{
          overrides: options,
        }}
      >
        {currentNote?.content}
      </Markdown>
    </div>
  );
};
