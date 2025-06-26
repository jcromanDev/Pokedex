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

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  sprites: {
    other: {
      [key: string]: {
        front_default: string | null;
      };
    };
  };
};
