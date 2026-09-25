// context/FavoritesContext.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface FavoritoPokemon {
  name: string;
  id: number;
}

interface FavoritesContextType {
  favoritos: FavoritoPokemon[];
  esFavorito: (name: string) => boolean;
  toggleFavorito: (pokemon: FavoritoPokemon) => void;
  cargando: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);
const STORAGE_KEY = "@pokedex_favoritos";

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoritos, setFavoritos] = useState<FavoritoPokemon[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    const cargarFavoritos = async () => {
      try {
        const guardado = await AsyncStorage.getItem(STORAGE_KEY);
        if (guardado) setFavoritos(JSON.parse(guardado));
      } catch (err) {
        console.log("Error cargando favoritos:", err);
      } finally {
        setCargando(false);
      }
    };
    cargarFavoritos();
  }, []);

  const guardarFavoritos = async (nuevos: FavoritoPokemon[]) => {
    setFavoritos(nuevos);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nuevos));
    } catch (err) {
      console.log("Error guardando favoritos:", err);
    }
  };

  const esFavorito = (name: string) => favoritos.some((f) => f.name === name);

  const toggleFavorito = (pokemon: FavoritoPokemon) => {
    const nuevos = esFavorito(pokemon.name)
      ? favoritos.filter((f) => f.name !== pokemon.name)
      : [...favoritos, pokemon];
    guardarFavoritos(nuevos);
  };

  return (
    <FavoritesContext.Provider
      value={{ favoritos, esFavorito, toggleFavorito, cargando }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  return context;
};
