"use client";
import numeral from "numeral";
import { Box, Container, Grid, Card, CardContent, Typography } from "@mui/material";


export function InsightsCards({ report }) {
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
                            <Typography color="textSecondary" variant="overline">
                                {report.sales.label}
                            </Typography>
                            <Typography color="textPrimary" variant="h5">
                                {numeral(report.sales?.current ?? 0).format("€0,0.00")}
                            </Typography>
                            <Typography color="textSecondary" variant="caption">
                                vs.
                                {numeral(report.sales?.last ?? 0).format("€0,0.00")}
                                &nbsp; last month
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
            {/* <Grid item xs={12} sm={6} md={3}>
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
            </Grid> */}
        </Grid>
    )

}