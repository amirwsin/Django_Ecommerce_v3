import {Fab} from "@mui/material";
import {ExpandLess} from "@mui/icons-material";


function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const GoTopButton = () => {
    return (
        <Fab onClick={topFunction} id={"myBtn"} size={"small"} color="primary" aria-label="back to top">
            <ExpandLess fontSize={"medium"}/>
        </Fab>
    )
}

export default GoTopButton