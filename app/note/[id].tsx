import { useNotes } from "@/context/notes-context";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PURPLE = "#6D28D9";
const BG = "#F6F4FF";
const SUBTLE = "rgba(0,0,0,0.55)";

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getNoteById } = useNotes();

  const note = id ? getNoteById(id) : undefined;

  if (!note) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Text style={styles.title}>Fant ikke notatet</Text>
        <Text style={styles.body}>Gå tilbake og prøv igjen.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar} />
      <Text style={styles.title}>{note.title?.trim() ? note.title : "(Uten tittel)"}</Text>
      <Text style={styles.meta}>Personlig notat</Text>
      <Text style={styles.body}>{note.body?.trim() ? note.body : "(Tomt notat)"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG, padding: 16, gap: 10 },
  topBar: { height: 6, width: 64, borderRadius: 999, backgroundColor: PURPLE, opacity: 0.9 },

  title: { fontSize: 22, fontWeight: "900" },
  meta: { fontSize: 12, color: SUBTLE, marginTop: -4 },
  body: { fontSize: 16, lineHeight: 22, marginTop: 10 },
});