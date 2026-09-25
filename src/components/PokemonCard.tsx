// components/PokemonCard.tsx
import { Text, Image, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useFavorites } from "../context/FavoritesContext";
import { obtenerImagenUrl } from "../utils/pokemon";

interface PokemonCardProps {
  name: string;
  id: number;
}

export const PokemonCard = ({ name, id }: PokemonCardProps) => {
  const { esFavorito, toggleFavorito } = useFavorites();
  const favorito = esFavorito(name);

  return (
    <Link href={`/pokemon/${name}`} asChild>
      <Pressable style={styles.card}>
        <Pressable
          style={styles.heart}
          hitSlop={10}
          onPress={(e) => {
            e.stopPropagation();
            toggleFavorito({ name, id });
          }}
        >
          <Text style={styles.heartText}>{favorito ? "★" : "☆"}</Text>
        </Pressable>
        <Text style={styles.id}>#{id.toString().padStart(3, "0")}</Text>
        <Image
          source={{ uri: obtenerImagenUrl(id) }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.name}>{name}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 140,
  },
  heart: { position: "absolute", top: 8, right: 8, zIndex: 1 },
  heartText: { fontSize: 20, color: "#f5a623" },
  id: { alignSelf: "flex-start", color: "#999", fontSize: 12, fontWeight: "600" },
  image: { width: 96, height: 96, marginVertical: 4 },
  name: { fontSize: 16, fontWeight: "600", textTransform: "capitalize" },
});