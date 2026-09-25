// app/index.tsx
import { FlatList, View, Text, StyleSheet, ActivityIndicator, useWindowDimensions } from "react-native";
import { usePokemonList } from "../hooks/usePokemonList";
import { PokemonCard } from "../components/PokemonCard";
import { obtenerIdDesdeUrl } from "../utils/pokemon";

const HomeScreen = () => {
  const { pokemons, loading, error } = usePokemonList(60);
  const { width } = useWindowDimensions();
  const columnas = width > 600 ? 4 : width > 380 ? 2 : 1;

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
      contentContainerStyle={styles.list}
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