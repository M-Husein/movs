import { RefineLayoutLayoutProps } from "@refinedev/mui";
import Box from "@mui/material/Box";
import { Header } from "./Header";

export function Layout({
  children
}: RefineLayoutLayoutProps){
  return (
    <>
      <Header />

      <Box
        component="main"
        sx={{
          bgcolor: (theme) => theme.palette.background.default,
        }}
      >
        {children}
      </Box>
    </>
  )
}
