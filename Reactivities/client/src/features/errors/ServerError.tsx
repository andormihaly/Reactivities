import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router"


export default function ServerError() {
    const {state} =useLocation();
  
    return (
        <Paper>
            {state.error ?
            (
            <>
                <Typography gutterBottom variant="h3" sx={{px:4, pt:2}}>
                    {state.error?.message ||'There has been an error'}
                </Typography>
                <Divider/>
                <Typography gutterBottom variant="body1" sx={{px:4}}>
                    {state.error?.details ||'Internal server error'}
                </Typography>
            </>
            ) :
             <Typography gutterBottom variant="h5" >Server Error</Typography>
            }
        </Paper>
  )
}
