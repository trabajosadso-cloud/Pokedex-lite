// app/pokemon/[name].tsx
import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { usePokemonDetail } from "../../hooks/usePokemonDetail";
// 1. IMPORTA EL HOOK AQUÍ
import { useFavorites } from "../../context/FavoritesContext";

const PokemonDetailScreen = () => {
  const { name } = useLocalSearchParams<{ name: string }>();
  const { pokemon, loading, error } = usePokemonDetail(name);
  
  // 2. DESESTRUCTURA LAS FUNCIONES DEL CONTEXTO AQUÍ
  const { esFavorito, toggleFavorito } = useFavorites(); 
  
  const { width } = useWindowDimensions();
  const tamañoImagen = width > 600 ? 220 : 150;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={styles.center}>
        <Text>No se pudo cargar el Pokémon.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {pokemon.sprites.front_default && (
        <Image
          source={{ uri: pokemon.sprites.front_default }}
          style={{ width: tamañoImagen, height: tamañoImagen }}
        />
      )}
      <Text style={styles.title}>{pokemon.name}</Text>
      
      {/* 3. AHORA ESTAS FUNCIONES YA ESTÁN DEFINIDAS EN EL SCOPE */}
      <Pressable
        onPress={() => toggleFavorito({ name: pokemon.name, id: pokemon.id })}
      >
        <Text style={{ fontSize: 16, color: "#f5a623", marginBottom: 8 }}>
          {esFavorito(pokemon.name) ? "★ Favorito" : "☆ Agregar a favoritos"}
        </Text>
      </Pressable>
      
      <Text>Tipos: {pokemon.types.map((t) => t.type.name).join(", ")}</Text>
      <Text>Altura: {pokemon.height}</Text>
      <Text>Peso: {pokemon.weight}</Text>
      <View style={styles.stats}>
        {pokemon.stats.map((s) => (
          <Text key={s.stat.name}>
            {s.stat.name}: {s.base_stat}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, alignItems: "center", padding: 24 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginVertical: 8,
  },
  stats: { marginTop: 16, alignItems: "flex-start" },
});

export default PokemonDetailScreen;