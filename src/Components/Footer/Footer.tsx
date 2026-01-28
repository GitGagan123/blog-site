"use client";
import {
  Box,
  TextField,
  Button,
  Alert,
  Backdrop,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import CustomContainer from "../CustomContainer/CustomContainer";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { submitBlogIdea } from "@/api/endpoints/blogs";
import { useEffect, useState } from "react";
export default function Footer() {
  const [email, setEmail] = useState("");
  const [blogIdea, setBlogIdea] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmitBlogIdea = async () => {
    setIsSubmitting(true);
    if (!email || !blogIdea) {
      setIsSubmitting(false);
      return;
    }
    const ideaPayload = {
      email,
      idea: blogIdea,
    };
    const blogIdeaResponse = await submitBlogIdea(ideaPayload);
    if (blogIdeaResponse.status == 200) {
      setEmail("");
      setBlogIdea("");
      setIsSubmitting(false);
      setShowSuccessMessage(true);
    } else {
      setShowErrorMessage(true);
    }
  };
  const onSuccessMessageClose = () => {
    setShowSuccessMessage(false);
  };
  const onErrorMessageClose = () => {
    setShowErrorMessage(false);
  };
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccessMessage) {
      timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showSuccessMessage]);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showErrorMessage) {
      timer = setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showErrorMessage]);
  return (
    <>
      <CustomContainer>
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
      </CustomContainer>
      {showSuccessMessage && (
        <Snackbar
          open={showSuccessMessage}
          autoHideDuration={5000}
          onClose={onSuccessMessageClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" variant="filled" onClose={onSuccessMessageClose}>
            Blog Idea Submitted Successfully
          </Alert>
        </Snackbar>
      )}
      {showErrorMessage && (
        <Snackbar
          open={showErrorMessage}
          autoHideDuration={5000}
          onClose={onErrorMessageClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="error" variant="filled" onClose={onErrorMessageClose}>
            Failed to Submit Blog Idea. Please try again.
          </Alert>
        </Snackbar>
      )}
      {isSubmitting && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isSubmitting}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
}
