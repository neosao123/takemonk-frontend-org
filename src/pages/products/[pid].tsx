// material
import { alpha, styled } from "@mui/material/styles";
import dynamic from "next/dynamic";
import {
  Box,
  Card,
  Grid,
  Container,
  Typography
} from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";

// components
import { paramCase } from "change-case";
import { useRouter } from "next/router";
import dbConnect from "lib/dbConnect";
import Products from "models/Products";
import Amcs from "models/Amcs";
import { Page } from "src/components";

import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
// plaiceholder
import { getPlaiceholder } from "plaiceholder";

// dynamic import
const HeaderBreadcrumbs = dynamic(
  () => import("src/components/headerBreadcrumbs")
);
const ProductDetailsCarousel = dynamic(
  () => import("src/components/carousels/detailsCarousel/detailsCarousel")
);

const ProductDetailsSumary = dynamic(
  () => import("src/components/_main/productDetails/summary"),
  {
    ssr: false,
  }
  // {
  //   loading: () => <Skeleton variant="rectangular" width="100%" height={300} />,
  // }
);

// const ProductDetailsTabs = dynamic(
//   () => import("src/components/_main/productDetails/tabs")
// );

const RelatedProducts = dynamic(
  () => import("src/components/_main/productDetails/related")
);

// ----------------------------------------------------------------------

const PRODUCT_DESCRIPTION = [
  {
    title: "100%-original",
    icon: <VerifiedRoundedIcon sx={{ fontSize: 36 }} />,
  },
  {
    title: "10-day-replacement",
    icon: <AccessTimeRoundedIcon sx={{ fontSize: 36 }} />,
  },
  {
    title: "1-year-warranty",
    icon: <VerifiedUserRoundedIcon sx={{ fontSize: 36 }} />,
  },
];

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  justifyContent: "center",
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));

const RootStyles = styled(Page)(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  padding: "40px 0",
  backgroundColor: theme.palette.background.paper
}));

export default function EcommerceProductDetails({ ...props }) {
  const { data: product, relatedProducts } = props;

  const { t } = useTranslation("details");
  const router = useRouter();
  const { unitRate, symbol } = useSelector(
    ({ settings }: { settings: any }) => settings
  );

  console.log("product from page", product);

  const isLoading = router.isFallback;
  return (
    <RootStyles
      title={product?.name + " | " + "COMMERCEHOPE"}
      description={product?.description + " | " + "COMMERCEHOPE"}
      canonical={`products/${product && paramCase(product.name)}`}
      openGraph={{
        url: "https://commercehope.com/",
        title: product?.name,
        description: product?.description,
        images: [
          {
            url: product?.cover,
            width: 800,
            height: 600,
            alt: "Og Image Alt",
          },
          {
            url: product?.images[1] || product?.cover,
            width: 900,
            height: 800,
            alt: "Og Image Alt Second",
          },
          {
            url: product?.images[2] || product?.cover,
          },
        ],
      }}
    >
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading={product?.name}
          links={[{ name: "Home", href: "/" }, { name: product?.name }]}
        />
        <>
          <Card
            sx={{
              p: 2,
              borderWidth: 0,
              bgcolor: "background.paper",
              mb: 3,
              border: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Grid container spacing={6} justifyContent="center">
              <Grid item xs={12} sm={8} md={6} lg={5}>
                <ProductDetailsCarousel
                  isLoading={isLoading}
                  product={product}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={7}>
                <ProductDetailsSumary
                  isLoading={isLoading}
                  id={product?._id}
                  product={product}
                  unitRate={unitRate}
                  symbol={symbol}
                />
              </Grid>
            </Grid>
          </Card>
          <Grid container spacing={3}>
            {PRODUCT_DESCRIPTION.map((item) => (
              <Grid item xs={12} md={4} key={item.title}>
                <Card sx={{ borderRadius: "8px", width: "100%", py: 2 }}>
                  <Box
                    sx={{
                      my: 2,
                      mx: "auto",
                      maxWidth: 280,
                      textAlign: "center",
                    }}
                  >
                    <IconWrapperStyle>{item.icon}</IconWrapperStyle>
                    <Typography variant="subtitle1" gutterBottom>
                      {t(item.title)}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
        <RelatedProducts relatedProducts={relatedProducts} id={product?._id} />
      </Container>
      <Box py={2} />
    </RootStyles>
  );
}

export const getStaticPaths = async () => {
  await dbConnect();
  const products = await Products.find({});
  const paths = products.map((product) => ({
    params: { pid: paramCase(product.name) },
  }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ ...props }) => {
  await dbConnect();

  const { params } = props;
  const products = await Products.find({});
  const product = products.find((item) => paramCase(item.name) === params.pid);

  if (!product) {
    return {
      notFound: true,
    };
  }

  const amcs = await Amcs.find({ productId: product._id });
  if (amcs.length > 0) {
    product._doc.productAmc = amcs[0];
  } else {
    product._doc.productAmc = {};
  }

  const images = await Promise.all(
    product.images.map(async ({ ...item }) => {
      const {
        base64,
        img: { width, height, ...img },
      } = await getPlaiceholder(item.url);

      return {
        ...img,
        blurDataURL: base64,
      };
    })
  ).then((values) => values);

  const related = await Products.find(
    {
      category: product.category,
    },
    null,
    {
      limit: 12,
    }
  );

  const relatedProducts = await Promise.all(
    related.map(async (item) => {
      const {
        base64,
        img: { width, height, ...img },
      } = await getPlaiceholder(item.cover);

      return {
        ...item._doc,
        cover: {
          ...img,
          blurDataURL: base64,
        },
      };
    })
  ).then((values) => values);

  return {
    props: {
      data: JSON.parse(
        JSON.stringify({
          ...product._doc,
          images,
        })
      ),
      relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
    },
    revalidate: 200,
  };
};
