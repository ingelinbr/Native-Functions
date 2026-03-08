import { useNotes } from "@/context/notes-context";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const PURPLE = "#6D28D9";
const BG = "#F6F4FF";
const CARD = "#FFFFFF";
const BORDER = "rgba(0,0,0,0.08)";
const SUBTLE = "rgba(0,0,0,0.55)";

export default function NewNoteScreen() {
  const { addNote } = useNotes();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const canSave = title.trim().length > 0 || body.trim().length > 0;

  const onSave = () => {
    addNote(title.trim(), body.trim());
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.pageTitle}>Skriv et nytt notat</Text>
          <Text style={styles.pageSubtitle}>Tittel er valgfritt.</Text>

          <View style={styles.card}>
            <Text style={styles.label}>Tittel</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="F.eks. Handleliste"
              style={styles.input}
              returnKeyType="next"
            />

            <Text style={[styles.label, { marginTop: 12 }]}>Innhold</Text>
            <TextInput
              value={body}
              onChangeText={setBody}
              placeholder="Skriv notatet her…"
              style={[styles.input, styles.textArea]}
              multiline
              textAlignVertical="top"
            />
          </View>

          <Pressable
            onPress={onSave}
            disabled={!canSave}
            style={({ pressed }) => [
              styles.saveBtn,
              !canSave && styles.saveBtnDisabled,
              pressed && canSave && { transform: [{ scale: 0.99 }] },
            ]}
          >
            <Text style={styles.saveText}>Lagre</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 24, gap: 12 },
  pageTitle: { fontSize: 22, fontWeight: "900" },
  pageSubtitle: { marginTop: -6, fontSize: 13, color: SUBTLE },

  card: {
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER,
  },

  label: { fontSize: 13, fontWeight: "800", color: SUBTLE, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  textArea: { minHeight: 220 },

  saveBtn: {
    backgroundColor: PURPLE,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 4,
  },
  saveBtnDisabled: { opacity: 0.45 },
  saveText: { color: "white", fontSize: 16, fontWeight: "900" },
});