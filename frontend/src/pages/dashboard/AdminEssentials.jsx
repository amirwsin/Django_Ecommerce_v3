import {Container, Grid} from "@mui/material";
import EssentialsBrands from "../../components/dashboard/EssentialsBrands";
import EssentialsCategory from "../../components/dashboard/EssentialsCategory";
import EssentialsTypes from "../../components/dashboard/EssentialsTypes";
import EssentialsAttributes from "../../components/dashboard/EssentialsAttributes";

const AdminEssentials = () => {
    return (
        <Container maxWidth={"xll"} sx={{
            paddingY: 2,
        }}>
            <Grid container spacing={2} rowSpacing={10}>
                <Grid item xs={12} md={6}>
                    <EssentialsBrands/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <EssentialsCategory/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <EssentialsTypes/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <EssentialsAttributes/>
                </Grid>
            </Grid>

        </Container>
    )
}

export default AdminEssentials