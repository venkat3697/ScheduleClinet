import * as React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"
import { Box } from "@mui/material"
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled"

export default function SlotCard(props) {
  const { description, title, slotMinutes, eventId } = props.slotData
  return (
    <Card sx={{ width: 400 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ paddingLeft: 2, display: "flex", alignItems: "center" }}
          >
            Duration:{" "}
            <AccessTimeFilledIcon sx={{ marginLeft: 0.5, marginRight: 0.5 }} />
            {slotMinutes} min
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", marginTop: 1 }}
        >
          {description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small">
          <Link
            to={`/appointment/${eventId}`}
            style={{ textDecoration: "none" }}
          >
            Share
          </Link>
        </Button>
      </CardActions>
    </Card>
  )
}
