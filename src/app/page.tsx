import { Suspense } from "react";
import {
  Box,
  Typography,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import Image from "next/image";
import CustomContainer from "@/Components/CustomContainer/CustomContainer";
import staticConfig from "@/config/staticConfig.json";
import { getFamousBlogs } from "@/api/actions/blogs";
import { getSampleOrders } from "@/api/actions/orders";

export default async function Home() {
  const { famousQuotesContents } = staticConfig;
  let famousBlogs = null;
  let sampleOrders = null;
  try {
    famousBlogs = await getFamousBlogs();
    sampleOrders = await getSampleOrders("none");
  } catch (err) {
    console.log(err);
  }
  return (
    <CustomContainer>
      <Box sx={{ padding: "20px" }}>
        <Typography textAlign="center">
          Quotes on Memories by Famous Personalities
        </Typography>
        <Box
          sx={{
            marginTop: "20px",
            padding: "0 20px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
          }}
        >
          {famousQuotesContents.map((content) => {
            return (
              <Box key={content.Author}>
                <Image
                  alt={`${content.alt}`}
                  src={`${content.AuthorPicture}`}
                  width={300}
                  height={400}
                  style={{
                    height: 400,
                    width: "100%",
                  }}
                />
                <Typography
                  component="i"
                  sx={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  &quot;{content.Quote}&quot;
                </Typography>
                <Typography textAlign="center">
                  {"- "}
                  {content.Author}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
      {famousBlogs && (
        <Box sx={{ marginTop: "20px" }}>
          <Typography textAlign="center">Blogs Of the Month</Typography>
          <Box
            sx={{
              marginTop: "40px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "30px",
            }}
          >
            {famousBlogs?.map((famousBlog: any) => {
              return (
                <Box key={famousBlog.author} textAlign="center">
                  <Suspense
                    fallback={
                      <Skeleton
                        sx={{ height: 300, width: 300 }}
                        variant="rectangular"
                        animation="pulse"
                      />
                    }
                  >
                    <Image
                      alt={`${famousBlog.quote}`}
                      src={`${famousBlog.picture}`}
                      style={{
                        height: 300,
                        width: "100%",
                      }}
                      width={300}
                      height={300}
                    />
                  </Suspense>
                  <Typography
                    component="i"
                    sx={{
                      display: "block",
                      width: "100%",
                      textAlign: "center",
                      marginTop: "10px",
                    }}
                  >
                    &quot;{famousBlog.quote}&quot;
                  </Typography>
                  <Typography textAlign="center">
                    {"- "}
                    {famousBlog.author}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
      {sampleOrders && (
        <Box sx={{ marginTop: "40px", marginBottom: "40px" }}>
          <Typography textAlign="center">Sample Orders</Typography>
          <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer Id</TableCell>
                  <TableCell>Pizza Id</TableCell>
                  <TableCell>Quantity</TableCell>
                  {/* <TableCell>Price</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {sampleOrders?.map((order: any) => (
                  <TableRow key={order.orderId}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.customerId}</TableCell>
                    <TableCell>{order.pizzaId}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    {/* <TableCell>{order.price}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </CustomContainer>
  );
}
