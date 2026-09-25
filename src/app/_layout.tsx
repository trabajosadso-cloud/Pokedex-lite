// app/_layout.tsx
import { Href, Link, Stack } from "expo-router";
import { Pressable, Text } from "react-native";
import { FavoritesProvider } from "../context/FavoritesContext";

const BotonFavoritos = () => (
  <Link href={"/favoritos" as Href} asChild>
    <Pressable 
      hitSlop={10} 
      style={{ marginRight: 16 }}
      {...({ title: "Favoritos" } as any)} 
    >
      <Text style={{ fontSize: 32, color: "#000" }}>★</Text>
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
