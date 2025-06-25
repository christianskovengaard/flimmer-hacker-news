import type { StoryWithAuthor } from "../types"

export const sortByScore = (stories: StoryWithAuthor[]) => {
  return [...stories].sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
}