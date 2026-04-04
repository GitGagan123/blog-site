import { Suspense } from "react";
import { Box, Typography, Skeleton, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
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
    const sampleOrdersResponse = await getSampleOrders("none");
    sampleOrders = sampleOrdersResponse?.map((order: any) => {
      return {
        id: order.orderId,
        ...order,
      };
    });
  } catch (err) {
    console.log(err);
  }
  const columns: GridColDef[] = [
    { field: "orderId", headerName: "Order ID", width: 350 },
    { field: "customerId", headerName: "Customer ID", width: 350 },
    { field: "pizzaId", headerName: "Pizza Id", width: 350 },
    { field: "quantity", headerName: "Quantity", width: 350 },
  ];
  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <CustomContainer>
      <Box sx={{ marginTop: "20px" }}>
        <Typography textAlign="center">
          Quotes on Memories by Famous Personalities
        </Typography>
        <Box
          sx={{
            marginTop: "20px",
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
            {famousBlogs &&
              famousBlogs.map((famousBlog: any) => {
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
        <Paper
          sx={{
            height: 400,
            width: "100%",
            border: "1px solid rgba(224, 224, 224, 1)",
            borderRadius: "4px",
          }}
        >
          <DataGrid
            rows={sampleOrders}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
          />
        </Paper>
      )}
    </CustomContainer>
  );
}
