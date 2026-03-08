import { useNotes } from "@/context/notes-context";
import { router } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const PURPLE = "#6D28D9";
const BG = "#F6F4FF";
const CARD = "#FFFFFF";
const BORDER = "rgba(0,0,0,0.08)";
const SUBTLE = "rgba(0,0,0,0.55)";

export default function Index() {
  const { notes } = useNotes();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FastNotes</Text>
        <Text style={styles.subtitle}>Notater - enklere å huske!</Text>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={notes.length === 0 ? styles.emptyWrap : styles.listWrap}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Ingen notater enda</Text>
            <Text style={styles.emptyText}>
              Trykk på + for å lage ditt første notat.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push({ pathname: "/note/[id]", params: { id: item.id } })}
            style={({ pressed }) => [styles.card, pressed && { transform: [{ scale: 0.99 }] }]}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item.title?.trim() ? item.title : "(Uten tittel)"}
              </Text>
              <Text style={styles.cardHint} numberOfLines={1}>
                Trykk for å åpne
              </Text>
            </View>

            <Text style={styles.chev}>›</Text>
          </Pressable>
        )}
      />

      {/* Lilla FAB i thumb-zone */}
      <Pressable
        onPress={() => router.push({ pathname: "/new" })}
        style={({ pressed }) => [styles.fab, pressed && { transform: [{ scale: 0.98 }] }]}
        accessibilityRole="button"
        accessibilityLabel="Opprett nytt notat"
      >
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },

  header: { paddingHorizontal: 18, paddingTop: 18, paddingBottom: 10 },
  title: { fontSize: 26, fontWeight: "900", letterSpacing: 0.2 },
  subtitle: { marginTop: 4, fontSize: 14, color: SUBTLE },

  listWrap: { paddingHorizontal: 14, paddingBottom: 96 },
  emptyWrap: { flexGrow: 1, justifyContent: "center", padding: 18 },

  card: {
    backgroundColor: CARD,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginVertical: 7,
    borderWidth: 1,
    borderColor: BORDER,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: "800" },
  cardHint: { marginTop: 6, fontSize: 12, color: SUBTLE },

  chev: { fontSize: 26, color: PURPLE, marginLeft: 10, fontWeight: "800" },

  emptyCard: {
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: BORDER,
  },
  emptyTitle: { fontSize: 16, fontWeight: "900" },
  emptyText: { marginTop: 6, fontSize: 14, color: SUBTLE },

  fab: {
    position: "absolute",
    right: 18,
    bottom: 18,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: PURPLE,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
  },
  fabText: { color: "white", fontSize: 30, lineHeight: 30, fontWeight: "900" },
});