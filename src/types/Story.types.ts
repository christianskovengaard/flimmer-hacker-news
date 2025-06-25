import type { Author } from "./Author.types"

type ItemType = "job" | "story" | "comment" | "poll" | "pollopt";

export type Story = {
  id: number;
  deleted?: boolean;
  type: ItemType;
  by?: string;
  time: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number;
};

export type StoryWithAuthor = Story & { 
    author?: Author
  }