
import { type FC } from "react"
import { Box } from "@mui/system"
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, Typography } from "@mui/material"

import dayjs from "dayjs"
import type { StoryWithAuthor } from "../types"

interface StoryDetailsProperties {
    story: StoryWithAuthor | undefined
    isOpen: boolean
    onClose: () => void
}

const StoryDetails: FC<StoryDetailsProperties> = ({ story, isOpen, onClose }) => {

  return (
    <Dialog maxWidth={"lg"} fullWidth open={isOpen} onClose={onClose}>
      {story && (
        <>
          <Box sx={{ display: "flex", alignItems: "flex-start", p: 1 }}>
            <Avatar sx={{ bgcolor: "red", mr: 2 }} aria-label="score">
              {story.score}
            </Avatar>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ mb: 2 }} variant='h5'>{story.title}</Typography>
              <Typography variant="body1">By: {story.by}</Typography>
              <Typography variant="body1">Contributor since: {dayjs.unix(story.author?.created as number).format("DD-MM-YYYY")}</Typography>    
              <Typography variant="body1">Karma: {story.author?.karma}</Typography>
            </Box>
          </Box>
    
          {story.text && (
            <DialogContent>
              <DialogContentText>{story.text}</DialogContentText>
            </DialogContent>
          )}
    
          <DialogActions>
            <Button component="a" href={story?.url} target="_blank">Go to the story</Button>
            <Button onClick={onClose}>Close</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )

}

export default StoryDetails