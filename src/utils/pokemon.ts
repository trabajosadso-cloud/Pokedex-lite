// utils/pokemon.ts
export const obtenerIdDesdeUrl = (url: string): number => {
  const partes = url.split("/").filter(Boolean); // quita strings vacíos
  return Number(partes[partes.length - 1]);
};

export const obtenerImagenUrl = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/official-artwork/${id}.png`;
};
