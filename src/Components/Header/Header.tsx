"use client";

import CustomContainer from "../CustomContainer/CustomContainer";
import { Box, Typography, AppBar, Button } from "@mui/material";
import NavigationItem from "@/types/NavigationItem";
import { usePathname } from "next/navigation";

const navItems: NavigationItem[] = [
  { navItemName: "Home", navItemPath: "/" },
  { navItemName: "Contact Us", navItemPath: "/contact-us" },
  { navItemName: "Blog Space", navItemPath: "/blog-space" },
  { navItemName: "Trending Blogs", navItemPath: "/trending-blogs" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <AppBar
      sx={{
        height: "64px",
        position: "sticky",
        padding: "20px 0",
        top: 0,
        bgcolor: "white",
      }}
    >
      <CustomContainer>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="var(--text-color)">App Logo</Typography>
          <Box sx={{ display: "flex", gap: "15px" }}>
            {navItems.map((navItem: NavigationItem) => {
              return (
                <Button
                  key={navItem.navItemName}
                  variant="text"
                  sx={{
                    color: "var(--text-color)",
                    borderBottom:
                      pathname === navItem.navItemPath
                        ? "1px solid var(--text-color)"
                        : "white",
                    borderRadius: 0,
                    borderBottomWidth:
                      pathname === navItem.navItemPath ? "2px" : 0,
                  }}
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
