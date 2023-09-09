"use client";
import { useReducer, useEffect } from "react";
import Cookies from "js-cookie";
import { v4 as uuid } from "uuid";
import { NoteContext, notesReducer } from ".";
import { Note, NoteResponse } from "@/interfaces";
import { toast } from "react-hot-toast";

interface NotesProviderProps {
  children: React.ReactNode;
}

export interface NotesState {
  notes: Note[];
  currentNote: Note;
}

const NOTES_INITIAL_STATE: NotesState = {
  notes: [
    {
      id: uuid(),
      title: "Welcome",
      content:
        "# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```",
    },
  ],
  currentNote: {
    id: uuid(),
    title: "",
    content:
      "# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```",
  },
};

export const NotesProvider = ({ children }: NotesProviderProps) => {
  const [state, dispatch] = useReducer(notesReducer, NOTES_INITIAL_STATE);

  useEffect(() => {
    loadNotes();
  }, []);

  const setCurrentNote = (id: string) =>
    dispatch({ type: "[NOTE] - set_current_note", payload: id });

  const typeNote = (content: string) =>
    dispatch({ type: "[NOTE] - type_note", payload: content });

  const createNote = async (note: Note) => {
    const token = Cookies.get("token");
    if (!token) {
      toast.error("You must be logged in to save a note", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
        icon: "🔒",
      });
      return;
    }
    
    try {

      const response = await fetch("api/notes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(note),
      });

      const data: NoteResponse = await response.json();

      if (data.ok) {
        dispatch({ type: "[NOTE] - create_note", payload: data.note! });
      } else {
        toast.error("Error saving note", {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
          },
          icon: "❌",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("Error saving note", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
        icon: "❌",
      });
    }
  };

  const remove = async (id: string) => {
    try {
      dispatch({ type: "[NOTE] - delete_note", payload: id });
      const response = await fetch(`api/notes/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: NoteResponse = await response.json();

      if (!data.ok) {
        toast.error("Error deleting note", {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
          },
          icon: "❌",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting note", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
        icon: "❌",
      });
    }
  };

  const update = async (note: Note) => {
    try {
      const response = await fetch(`api/notes/update/${note.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      const data: NoteResponse = await response.json();

      if (data.ok) {
        toast.success("Note saved successfully", {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
          },
          icon: "✅",
        });
        dispatch({ type: "[NOTE] - update_note", payload: note });
      } else {
        toast.error("Error updating note", {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
          },
          icon: "❌",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating note", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
        icon: "❌",
      });
    }
  };

  const loadNotes = async () => {
    const token = Cookies.get("token");
    if (!token) return;

    try {
      const response = await fetch("api/notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data: NoteResponse = await response.json();

      if (data.ok) {
        dispatch({ type: "[NOTE] - load_notes", payload: data.notes || [] });
      } else {
        toast.error("Error loading notes", {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
          },
          icon: "❌",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error loading notes", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
        icon: "❌",
      });
    }
  };

  return (
    <NoteContext.Provider
      value={{
        ...state,

        setCurrentNote,
        typeNote,
        createNote,
        remove,
        update,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
