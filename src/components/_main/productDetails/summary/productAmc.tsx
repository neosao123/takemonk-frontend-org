import { Stack, Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import Image from "next/image";
import protectionImage from "../../../../assets/protection.png";

export default function ProductAmc({ ...props }) {
    const { productAmc, symbol } = props;
    const { t } = useTranslation("details");

    if (productAmc) {
        return (
            <Stack>
                <Card sx={{ border: "none" }}>
                    <CardContent>
                        <Box sx={{ fontSize: "15px", borderBottom: "1px solid silver", padding: "15px 0", display: "flex" }} mb={3}>
                            <VerifiedUserOutlinedIcon color="success" sx={{ marginRight: "10px" }} />
                            <Typography sx={{ fontWeight: "bold", color: "#525356" }}>
                                {t("protect-your-product")}
                            </Typography>
                        </Box>
                        <Grid container spacing={2} mb={2}>
                            <Grid item xs={2}>
                                <Box>
                                    <Image
                                        src={productAmc?.cover?.url ?? protectionImage}
                                        alt="Picture of the author"
                                        style={{ width: "100%", height: "auto" }}
                                        width={100}
                                        height={100}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={10}>
                                <Box mb={2}>
                                    <Typography sx={{ fontWeight: 600 }}>{productAmc.title}</Typography>
                                </Box>
                                <Box mb={2}>
                                    <Typography sx={{ color: "#525452" }}>{productAmc.description}</Typography>
                                </Box>
                                <Box mb={2} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography sx={{ fontWeight: "500", fontSize: "1.1rem" }} >{symbol} {productAmc.price}</Typography>
                                    <Button type="button" variant="contained">Add To Cart</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Stack>
        );
    } else {
        return <></>
    }
}