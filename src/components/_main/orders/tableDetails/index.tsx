import React from "react";
// material
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  Box,
  Skeleton,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import useTranslation from "next-translate/useTranslation";
import RootStyled from "./styled";
const Tablehead = ["product", "color", "quantity", "size", "Price"];
const ThumbImgStyle = styled("img")(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: "cover",
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadius,
}));
export default function ItemsTable({ ...props }) {
  const { data, isLoading, currency } = props;
  const { t } = useTranslation("order");
  return (
    <RootStyled>
      <TableContainer>
        <Table className="table-main">
          <TableHead>
            <TableRow className="head-row">
              {Tablehead?.map((headCell, i) => (
                <TableCell className="head-row-cell" key={`head-${i}`}>
                  {t(headCell)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(isLoading ? Array.from(new Array(3)) : data)?.map(
              (row: any, i: any) => (
                <TableRow key={`row-${i}`}>
                  <TableCell>
                    {row ? (
                      <Box className="body-row-cell">
                        <ThumbImgStyle alt={row?.name} src={row?.cover} />

                        <Typography variant="subtitle2" noWrap>
                          {row?.name.slice(0, 50)}
                        </Typography>
                      </Box>
                    ) : (
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Skeleton
                          variant="rectangular"
                          width={64}
                          height={64}
                        />
                        <Skeleton variant="text" width={100} />
                      </Stack>
                    )}
                  </TableCell>
                  <TableCell>
                    {row ? (
                      row.color ? (
                        row.color
                      ) : (
                        "N/A"
                      )
                    ) : (
                      <Skeleton variant="text" width={100} />
                    )}
                  </TableCell>

                  <TableCell>
                    {row ? (
                      row?.quantity
                    ) : (
                      <Skeleton variant="text" width={100} />
                    )}
                  </TableCell>
                  <TableCell>
                    {row ? row?.size : <Skeleton variant="text" width={100} />}
                  </TableCell>
                  <TableCell>
                    {row ? (
                      `${currency} ${row?.priceSale || row?.price}`
                    ) : (
                      <Skeleton variant="text" width={100} />
                    )}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </RootStyled>
  );
}
