import { useState, useEffect } from "react"
import "./App.css"
import { Container, Box, Typography, CircularProgress } from "@mui/material"
import { Grid } from "@mui/system"
import { Story, StoryDetails } from "./components"
import type { StoryWithAuthor, Story as StoryType } from "./types"
import { sortByScore } from "./utils"

const HN_API_BASE = "https://hacker-news.firebaseio.com/v0"

function App() {

  const [storyIds, setStoryIds] = useState<number[]>([])
  const [storiesWithAuthor, setStoriesWithAuthor] = useState<StoryWithAuthor[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [storyToShow, setStoryToShow] = useState<StoryWithAuthor>()
  const [isStoryDialogOpen, setIsStoryDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    const fetchTopStoryIds = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${HN_API_BASE}/topstories.json`)
        const ids: number[] = await res.json()
        setStoryIds(ids.slice(0, 20))
      } catch (error) {
        console.error("Error fetching top stories:", error)
      }
    }

    fetchTopStoryIds()
  }, [])

  useEffect(() => {
    if (storyIds.length === 0) return

    const fetchStoriesWithAuthors = async () => {
      try {
        const storyPromises = storyIds.map(id =>
          fetch(`${HN_API_BASE}/item/${id}.json`).then(res => res.json())
        )
        const stories: StoryType[] = await Promise.all(storyPromises)

        const storiesWithAuthors: StoryWithAuthor[] = await Promise.all(
          stories.map(async story => {
            const author = await fetch(`${HN_API_BASE}/user/${story.by}.json`).then(res => res.json())
            return { ...story, author }
          })
        )

        const sortedStories = sortByScore(storiesWithAuthors)
        setStoriesWithAuthor(sortedStories)
      } catch (error) {
        console.error("Error fetching stories or authors:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStoriesWithAuthors()
  }, [storyIds])

  const showStory = (id: StoryWithAuthor["id"]) => {
    setStoryToShow(storiesWithAuthor.find((story) => story.id === id))
    setIsStoryDialogOpen(true)
  }

  const closeStory = () => {
    setStoryToShow(undefined)
    setIsStoryDialogOpen(false)
  } 

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h1" sx={{ mb: 2 }}>
          Hacker news - Flimmer
        </Typography>
      </Box>
      {loading && <CircularProgress size={150} />}
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 1, md: 2, lg: 3 }}>
        {storiesWithAuthor.length > 0 && storiesWithAuthor.map((story) => (
          <Story story={story} onClick={(id) => showStory(id)} />
        ))}
      </Grid>
      <StoryDetails isOpen={isStoryDialogOpen} onClose={() => closeStory()} story={storyToShow} />
    </Container>

  ) 

}

export default App

