import React, { createContext, useContext, useMemo, useState } from "react";

export type Note = {
  id: string;
  title: string;
  body: string;
};

type NotesContextValue = {
  notes: Note[];
  addNote: (title: string, body: string) => string;
  getNoteById: (id: string) => Note | undefined;
};

const NotesContext = createContext<NotesContextValue | null>(null);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  // Start med litt demo-data så lista ikke er tom (valgfritt)
  const [notes, setNotes] = useState<Note[]>([
    { id: "1", title: "Handleliste", body: "Melk\nBrød\nKaffe" },
  ]);

  const addNote = (title: string, body: string) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setNotes((prev) => [{ id, title, body }, ...prev]);
    return id;
  };

  const getNoteById = (id: string) => notes.find((n) => n.id === id);

  const value = useMemo(() => ({ notes, addNote, getNoteById }), [notes]);

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes må brukes inni <NotesProvider>.");
  return ctx;
}