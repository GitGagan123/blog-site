import CustomContainer from "../CustomContainer/CustomContainer";
import { Box, Typography, AppBar, Button } from "@mui/material";
import NavigationItem from "@/types/NavigationItem";

const navItems: NavigationItem[] = [
  { navItemName: "Home", navItemPath: "/" },
  { navItemName: "Contact Us", navItemPath: "/contact-us" },
  { navItemName: "Blog Space", navItemPath: "/blog-space" },
  { navItemName: "Trending Blogs", navItemPath: "/trending-blogs" },
];

export default function Header() {
  return (
    <AppBar
      sx={{ height: "64px", position: "sticky", padding: "20px 0", top: 0 }}
    >
      <CustomContainer>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>App Logo</Typography>
          <Box sx={{ display: "flex", gap: "15px" }}>
            {navItems.map((navItem: NavigationItem) => {
              return (
                <Button
                  key={navItem.navItemName}
                  variant="text"
                  sx={{ color: "white" }}
                  href={`${navItem.navItemPath}`}
                >
                  {navItem.navItemName}
                </Button>
              );
            })}
          </Box>
        </Box>
      </CustomContainer>
    </AppBar>
  );
}
