"use client";
import { Box, Container, Grid, Card, CardContent, Typography } from "@mui/material";


export function InsightsCards({ report }) {

    
    // const report = {
    //     products: {
    //       label: "PRODUCTS CREATED",
    //       data: 0,
    //     },
    //     co2: {
    //       label: "METRIC TONS CO2 ON AVERAGE PER PRODUCT",
    //       data: 0,
    //     },
    //     rescured: {
    //       label: "RESCUED MATERIALS + INGREDIENTS",
    //       data: 0,
    //     },
    //     materials: {
    //       label: "MATERIALS + INGREDIENTS ON AVERAGE PER PRODUCT",
    //       data: 0,
    //     },
    // }
    return (
        <Grid
            container
            spacing={4}
            justify="center"
        >
            <Grid item xs={12} sm={6} md={3}>
                <Card style={{backgroundColor: "#ebeffe"}}>
                    <CardContent>
                        <Box
                            sx={{
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "column",
                                textAlign: "center",
                            }}
                        >
                            <Typography color="textPrimary" variant="h5">
                                {report.products.data}
                            </Typography>
                            <Typography color="textSecondary" variant="caption">
                                {report.products.label}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card style={{backgroundColor: "#ebeffe"}}>
                    <CardContent>
                        <Box
                            sx={{
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "column",
                                textAlign: "center",
                            }}
                        >
                            <Typography color="textPrimary" variant="h5">
                                {report.co2.data}
                            </Typography>
                            <Typography color="textSecondary" variant="caption">
                                {report.co2.label}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card style={{backgroundColor: "#ebeffe"}}>
                    <CardContent>
                        <Box
                            sx={{
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "column",
                                textAlign: "center",
                            }}
                        >
                            <Typography color="textPrimary" variant="h5">
                                {report.rescured.data}
                            </Typography>
                            <Typography color="textSecondary" variant="caption">
                                {report.rescured.label}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card style={{backgroundColor: "#ebeffe"}}>
                    <CardContent>
                        <Box
                            sx={{
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "column",
                                textAlign: "center",
                            }}
                        >
                            <Typography color="textPrimary" variant="h5">
                                {report.materials.data}
                            </Typography>
                            <Typography color="textSecondary" variant="caption">
                                {report.materials.label}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )

}