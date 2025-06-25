import { type FC } from "react"
import { Grid } from "@mui/system"
import { Avatar, Card, CardHeader, Typography } from "@mui/material"
import type { StoryWithAuthor } from "../types"

interface StoryProperties {
    story: StoryWithAuthor
    onClick: (id: StoryWithAuthor["id"]) => void
}

const Story: FC<StoryProperties> = ({ story, onClick }) => {

  return (
    <Grid key={story.id} size={{ xs: 1 }}>
      <Card sx={{
        cursor: "pointer",
      }} onClick={() => onClick(story.id)}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {story.score}
            </Avatar>
          }
          title={<Typography sx={{ "&:hover": {
            textDecoration: "underline",
          }, }} variant="h4">{story.title}</Typography>}
          subheader={"By: "+story.by}
        />
      </Card>
    </Grid>
  )

}

export default Story