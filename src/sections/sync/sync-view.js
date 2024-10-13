// @mui
import { Container } from "@mui/material";

import UserProfileView from "@/sections/user/user-profile-view";
import ProductUnavailable from "../error/product-unavailable";
import UploadBoxs from "./upload-boxs";
import { MegaMenuDesktopHorizon } from "@/components/mega-menu";

// ----------------------------------------------------------------------

export default function SyncView() {
  const mockData = [
    {
      title: "test channel",
      path: "/test-channel",
      icon: "",
      more: "",
      products: [
        {
          name: "product 1",
          path: "/product-1",
          coverUrl: "",
        },
        {
          name: "product 2",
          path: "/product-2",
          coverUrl: "",
        },
      ],
      tags: [
        {
          name: "tag 1",
          path: "/tag-1",
        },
        {
          name: "tag 2",
          path: "/tag-2",
        },
      ]
    }
  ]
  return (
    <Container maxWidth="xl">
      <UserProfileView />
      {/* <ProductUnavailable /> */}
      <UploadBoxs />
      <MegaMenuDesktopHorizon data={mockData} />
    </Container>
  );
}
