"use client";

import CustomContainer from "../CustomContainer/CustomContainer";
import { Box, Typography, AppBar, Button } from "@mui/material";
import NavigationItem from "@/types/NavigationItem";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
        top: 0,
        bgcolor: "white",
      }}
    >
      <CustomContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <Image
            src="/our-blogs-logo1.png"
            alt="our blogs"
            style={{ width: "200px", height: "64px" }}
            height={50}
            width={200}
          />
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              height: "30px",
              marginTop: "15px",
            }}
          >
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
