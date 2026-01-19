"use client";
import { Box, TextField, Button } from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { submitBlogIdea } from "@/api/endpoints/blogs";
import { useState } from "react";
export function FooterContent() {
  const [email, setEmail] = useState("");
  const [blogIdea, setBlogIdea] = useState("");
  const onSubmitBlogIdea = async () => {
    if (!email || !blogIdea) {
      alert("Please fill in both fields.");
      return;
    }
    const ideaPayload = {
      email,
      idea: blogIdea,
    };
    const blogIdeaResponse = await submitBlogIdea(ideaPayload);
    if (blogIdeaResponse.status == 200) {
      alert("Thank you for your submission! We will reach out to you soon.");
      setEmail("");
      setBlogIdea("");
    } else {
      alert("There was an error submitting your idea. Please try again later.");
    }
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          margin: "10px 0",
          border: "1px solid #000000",
          borderRadius: "8px",
          padding: "5px 10px",
          width: "50%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TipsAndUpdatesIcon sx={{ marginRight: "8px" }} />
          <span>Got a Blog Idea ?</span>
        </Box>
        <Box sx={{ wordBreak: "break-word" }}>
          If you have a topic you would love us to write about (or want to
          collaborate), drop your email. We will reach out
        </Box>
        <Box>
          <TextField
            fullWidth
            placeholder="Your email address"
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ margin: "10px 0" }}
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            placeholder="Your blog idea"
            variant="outlined"
            size="small"
            value={blogIdea}
            onChange={(e) => setBlogIdea(e.target.value)}
            multiline
            maxRows={4}
            sx={{ margin: "10px 0" }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmitBlogIdea}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
