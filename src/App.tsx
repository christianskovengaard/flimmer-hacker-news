import { useState, useEffect } from "react"
import "./App.css"
import { Container, Box, Typography, Card, Avatar, CardHeader, Dialog, CircularProgress, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"
import { Grid } from "@mui/system"
import dayjs from 'dayjs';

const HN_API_BASE = "https://hacker-news.firebaseio.com/v0"

type ItemType = "job" | "story" | "comment" | "poll" | "pollopt";

type Story = {
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

type Author = {
  id: string;
  created: number;
  karma: number;
  about?: string;
  submitted: number[];
};

type StoryWithAuthor = Story & { 
  author?: Author
}

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
        const stories: Story[] = await Promise.all(storyPromises)

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

  const sortByScore = (stories: StoryWithAuthor[]) => {
    return [...stories].sort((a, b) => b.score - a.score)
  }
  
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
        {storiesWithAuthor.length > 0 && storiesWithAuthor.map((story: Story, index: number) => (
          <Grid key={index} size={{ xs: 1 }}>
            <Card onClick={() => showStory(story.id)}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                    {story.score}
                  </Avatar>
                }
                title={<Typography variant="h4">{story.title}</Typography>}
                subheader={"By: "+story.by}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        maxWidth={"lg"}
        fullWidth
        open={isStoryDialogOpen}
        onClose={closeStory}
      >
        {storyToShow && 
        <>
          <Box sx={{display: "flex"}}>
            <Avatar sx={{ bgcolor: "red", ml: 2, mt: 2 }} aria-label="recipe">
              {storyToShow?.score}
            </Avatar>
            <DialogTitle>{storyToShow.title}</DialogTitle>
            <Typography variant="h6">{"By: "+storyToShow.by}</Typography>
            <Typography variant="h6">{storyToShow.author?.karma}</Typography>
            
          </Box>
          <Typography variant="h6">{dayjs(storyToShow.author?.created).format("D-M-Y")}</Typography>    
          {storyToShow?.text && 
        <DialogContent>
          <DialogContentText>
            {storyToShow.text}
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            
          </Box>
        </DialogContent>
          }
          <DialogActions>
            <Button href={storyToShow?.url} target={"_blank"}>Go to the story</Button>
            <Button onClick={closeStory}>Close</Button>
          </DialogActions>
        </>
        }
      </Dialog>

    </Container>

  ) 

}

export default App

