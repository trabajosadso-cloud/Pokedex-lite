// utils/pokemon.ts
export const obtenerIdDesdeUrl = (url: string): number => {
  const partes = url.split("/").filter(Boolean); // quita strings vacíos
  return Number(partes[partes.length - 1]);
};

export const obtenerImagenUrl = (id: number): string => {
  // Solución: Se agregó "/other/" antes de "official-artwork"
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};
export const obtenerImagenAnimadaUrl = (id: number): string => {
  // Estos son GIFs animados oficiales (estilo 16-bits/Showdown)
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;
};