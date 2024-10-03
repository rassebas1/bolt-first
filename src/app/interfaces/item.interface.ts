export interface BaseItem {
  id: number;
  name: string;
  url: string;
}

export interface Pokemon extends BaseItem {
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { ability: { name: string } }[];
}

export interface Berry extends BaseItem {
  flavor_text_entries: { text: string }[];
  natural_gift_power: number;
}

export interface Contest extends BaseItem {
  contest_type: { name: string };
}

export interface Game extends BaseItem {
  platform: { name: string };
  release_date: string;
}

export type Item = Pokemon | Berry | Contest | Game;