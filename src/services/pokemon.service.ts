import type {
  Pokemon,
  PokemonAPIResource,
  PokemonGenerationResource,
  PokemonMove,
} from "../types/pokemon.types";

const URL = import.meta.env.VITE_POKEAPI_URL;

export async function fetchPokemonList(
  offset: number,
  limit: number
): Promise<Pokemon[]> {
  const res = await fetch(`${URL}/pokemon/?offset=${offset}&limit=${limit}`);
  const data = await res.json();
  const results = data.results.map((poke: PokemonAPIResource) =>
    fetch(poke.url).then((r) => r.json())
  );
  return await Promise.all(results);
}

export async function fetchPokemonByGen(gen: number): Promise<Pokemon[]> {
  const res = await fetch(`${URL}/generation/${gen}`);
  const data: PokemonGenerationResource = await res.json();
  const getId = (url: string) =>
    parseInt(url.split("/").filter(Boolean).pop()!);
  const sortedPokemonGen = data.pokemon_species.sort(
    (a: PokemonAPIResource, b: PokemonAPIResource) =>
      getId(a.url) - getId(b.url)
  );

  const pokeList = sortedPokemonGen.map((poke: PokemonAPIResource) =>
    fetch(`${URL}/pokemon/${getId(poke.url)}`).then((r) => r.json())
  );
  return await Promise.all(pokeList);
}

export async function fetchPokemonByTypes(type: string): Promise<Pokemon[]> {
  const res = await fetch(`${URL}/type/${type}`);
  const data = await res.json();

  const pokeList = data.pokemon.map((poke: { pokemon: PokemonAPIResource }) =>
    fetch(poke.pokemon.url).then((r) => r.json())
  );
  return await Promise.all(pokeList);
}

export async function fetchPokemonByGenAndType(
  gen: number,
  type: string
): Promise<Pokemon[]> {
  const genList = await fetchPokemonByGen(gen);
  return genList.filter((poke) => poke.types.some((t) => t.type.name === type));
}

export async function fetchSinglePokemon(inputData: string): Promise<Pokemon> {
  const res = await fetch(`${URL}/pokemon/${inputData.toLowerCase()}`);
  return await res.json();
}

export async function fetchPokemonMoveList(
  moves: Pokemon["moves"]
): Promise<PokemonMove[]> {
  const results = await Promise.all(
    moves.map(({ move }) =>
      fetch(move.url)
        .then((r) => r.json())
        .catch(() => null)
    )
  );
  return results.filter(Boolean);
}

export async function fetchSingleMove(id: number): Promise<PokemonMove> {
  const res = await fetch(`${URL}/move/${id}`);
  return await res.json();
}
