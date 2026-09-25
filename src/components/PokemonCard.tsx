// components/PokemonCard.tsx
import { useRouter } from "expo-router"; // <-- Importamos useRouter
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import { obtenerImagenUrl } from "../utils/pokemon";

interface PokemonCardProps {
  name: string;
  id: number;
}

export const PokemonCard = ({ name, id }: PokemonCardProps) => {
  const { esFavorito, toggleFavorito } = useFavorites();
  const favorito = esFavorito(name);
  const router = useRouter(); // <-- Inicializamos el router

  return (
    <Pressable
      onPress={() => router.push(`/pokemon/${name}`)} // <-- Navega solo si tocas la tarjeta
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed, // <-- Aplica animación al hacer clic
      ]}
    >
      <Pressable
        style={styles.heart}
        hitSlop={10}
        onPress={(e) => {
          e.stopPropagation(); // <-- IMPORTANTE: Evita que el clic llegue a la tarjeta y navegue
          e.preventDefault();
          toggleFavorito({ name, id });
        }}
        {...({
          title: favorito ? "Quitar de favoritos" : "Marcar como favorito",
        } as any)} // <-- Tooltip
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
  cardPressed: {
    transform: [{ scale: 0.95 }], // <-- Animación: Se encoge un 5% al presionarla
    opacity: 0.8,
  },
  heart: { position: "absolute", top: 8, right: 8, zIndex: 1 },
  heartText: { fontSize: 20, color: "#f5a623" },
  id: {
    alignSelf: "flex-start",
    color: "#999",
    fontSize: 12,
    fontWeight: "600",
  },
  image: { width: 96, height: 96, marginVertical: 4 },
  name: { fontSize: 16, fontWeight: "600", textTransform: "capitalize" },
});
