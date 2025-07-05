export type PokemonAPIResource = {
  name: string;
  url: string;
};

export type PokemonGenerationResource = {
  pokemon_species: PokemonAPIResource[];
};

export type PokemonType = {
  slot: number;
  type: PokemonAPIResource;
};

export type PokemonMove = {
  id: number;
  name: string;
  effect_entries: {
    [key: string]: {
      effect: string;
    };
  };
  power: number | null;
  priority: number;
  target: PokemonAPIResource;
  type: PokemonAPIResource;
};

export type PokemonStats = {
  base_stat: number;
  effort: number;
  stat: PokemonAPIResource;
};

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  stats: PokemonStats[];
  types: PokemonType[];
  sprites: {
    other: {
      [key: string]: {
        front_default: string | null;
      };
    };
  };
  moves: {
    move: PokemonAPIResource;
  }[];
};
