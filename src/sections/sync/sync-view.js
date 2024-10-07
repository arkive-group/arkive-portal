// @mui
import { Container } from "@mui/material";

import UserProfileView from "@/sections/user/user-profile-view";
import ProductUnavailable from "../error/product-unavailable";
import UploadBoxs from "./upload-boxs";

// ----------------------------------------------------------------------

export default function SyncView() {
  return (
    <Container maxWidth="xl">
      <UserProfileView />
      <ProductUnavailable />
      {/* <UploadBoxs /> */}
    </Container>
  );
}
