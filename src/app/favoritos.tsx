// app/favoritos.tsx
import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { PokemonCard } from "../components/PokemonCard";
import { useFavorites } from "../context/FavoritesContext";

const FavoritosScreen = () => {
  const { favoritos, cargando } = useFavorites();
  const { width } = useWindowDimensions();
  const columnas = width > 600 ? 4 : width > 380 ? 2 : 1;

  if (cargando) {
    return (
      <View style={styles.center}>
        <Text>Cargando favoritos...</Text>
      </View>
    );
  }

  if (favoritos.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Todavía no marcaste favoritos.</Text>
        <Text style={styles.emptySub}>
          Tocá la estrella en cualquier Pokémon para agregarlo acá.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      key={columnas}
      data={favoritos}
      numColumns={columnas}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => <PokemonCard name={item.name} id={item.id} />}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyText: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  emptySub: { fontSize: 14, color: "#888", textAlign: "center" },
  list: { padding: 8 },
});

export default FavoritosScreen;
