// app/index.tsx
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { PokemonCard } from "../components/PokemonCard";
import { usePokemonList } from "../hooks/usePokemonList";
import { obtenerIdDesdeUrl } from "../utils/pokemon";

const HomeScreen = () => {
  const { pokemons, loading, error } = usePokemonList(60);
  const { width } = useWindowDimensions();
  const columnas = Math.max(1, Math.floor(width / 240));

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Ocurrió un error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      key={columnas}
      data={pokemons}
      numColumns={columnas}
      keyExtractor={(item) => item.name}
      contentContainerStyle={{ padding: 16, alignItems: "center" }}
      renderItem={({ item }) => (
        <PokemonCard name={item.name} id={obtenerIdDesdeUrl(item.url)} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  list: { padding: 8 },
});

export default HomeScreen;
