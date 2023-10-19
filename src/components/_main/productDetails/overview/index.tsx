import PropTypes from "prop-types";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

// material
import { styled } from "@mui/material/styles";
import {
  Grid,
  Button,
  Typography,
  LinearProgress,
  Stack,
  Box,
  Rating,
} from "@mui/material";
// utils
import { fShortenNumber } from "src/utils/formatNumber";
import useTranslation from "next-translate/useTranslation";
// ----------------------------------------------------------------------

const RatingStyle = styled(Rating)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  "&.border-bottom": {
    borderBottom: `solid 1px ${theme.palette.divider}`,
  },
  [theme.breakpoints.down("md")]: {
    borderBottom: `solid 1px ${theme.palette.divider}`,
  },
}));

// ----------------------------------------------------------------------

ProgressItem.propTypes = {
  star: PropTypes.object,
  total: PropTypes.number,
};

function ProgressItem({ ...props }) {
  const { star, total, isLoading } = props;
  const { name, starCount, reviewCount } = star;
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Typography variant="subtitle2">{name}</Typography>
      <LinearProgress
        variant="determinate"
        value={(starCount / total) * 100}
        sx={{
          mx: 2,
          flexGrow: 1,
          bgcolor: "divider",
        }}
      />
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", minWidth: 64, textAlign: "right" }}
      >
        {fShortenNumber(reviewCount)}
      </Typography>
    </Stack>
  );
}

ProductDetailsReviewOverview.propTypes = {
  product: PropTypes.object,
  onOpen: PropTypes.func,
};

export default function ProductDetailsReviewOverview({ ...props }) {
  const { data, onOpen, reviews } = props;
  const { t } = useTranslation("details");
  return (
    <Box
      sx={{
        height: 1,
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Grid container>
        <GridStyle item xs={12} className="border-bottom">
          <Typography variant="subtitle1" gutterBottom>
            {t("average-rating")}
          </Typography>
          <Typography variant="h2" gutterBottom sx={{ color: "error.main" }}>
            {data?.totalRating === 0
              ? 0
              : (data?.totalRating / data?.totalReview).toFixed(1)}
          </Typography>
          <RatingStyle
            readOnly
            value={data?.totalRating / data?.totalReview}
            precision={0.1}
          />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ({data && fShortenNumber(data?.totalReview)}
            &nbsp; {t("reviews")})
          </Typography>
        </GridStyle>

        {reviews?.ratings?.length > 0 && (
          <GridStyle item xs={12} className={"border-bottom"}>
            <Stack spacing={1.5} sx={{ width: 1 }}>
              {reviews?.ratings
                .slice(0)
                .reverse()
                .map((rating: any) => (
                  <ProgressItem
                    key={rating.name}
                    star={rating}
                    total={data?.totalReview}
                  />
                ))}
            </Stack>
          </GridStyle>
        )}

        <GridStyle item xs={12}>
          <Button
            size="large"
            onClick={onOpen}
            variant="outlined"
            startIcon={<EditRoundedIcon />}
          >
            {t("write-a-review")}
          </Button>
        </GridStyle>
      </Grid>
    </Box>
  );
}
