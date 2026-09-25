// app/_layout.tsx
import { Link, Stack } from "expo-router";
import { Pressable, Text } from "react-native";
import { FavoritesProvider } from "../context/FavoritesContext";

const BotonFavoritos = () => (
  <Link href="/favoritos" asChild>
    <Pressable hitSlop={10} style={{ marginRight: 12 }}>
      <Text style={{ fontSize: 20 }}>★</Text>
    </Pressable>
  </Link>
);

const RootLayout = () => {
  return (
    <FavoritesProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Pokedex Lite",
            headerRight: () => <BotonFavoritos />,
          }}
        />
        <Stack.Screen name="pokemon/[name]" options={{ title: "Detalle" }} />
        <Stack.Screen name="favoritos" options={{ title: "Favoritos" }} />
      </Stack>
    </FavoritesProvider>
  );
};

export default RootLayout;
