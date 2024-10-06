import Link from "next/link";
import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
} from "@mui/material";

// SVG Icons
const AccountSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="24"
    height="24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.121 18.879A7.5 7.5 0 1118.88 5.121 7.5 7.5 0 015.121 18.88z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.75 11.25a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const BillingSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="24"
    height="24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 9V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4M7 13h10v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5z"
    />
  </svg>
);

// Define Menu Data
const personalMenuItems = [
  { icon: <AccountSVG />, label: "Account", href: "/account-billing/account" },
];

const organizationMenuItems = [
  {
    icon: <BillingSVG />,
    label: "Billing & Plans",
    href: "/account-billing/billing",
  },
];

// Reusable List Component
const MenuList = ({ title, items }) => (
  <Box mb={2}>
    <Typography variant="overline" color="textSecondary">
      {title}
    </Typography>
    <List>
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          passHref
          style={{ textDecoration: "none", color: "#637381" }}
        >
          <ListItem button component="a" sx={{ paddingLeft: 1 }}>
            {/* Reduce the space by removing minWidth and setting smaller margin */}
            <ListItemIcon sx={{ minWidth: "unset", marginRight: 1 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        </Link>
      ))}
    </List>
  </Box>
);

const AccountBillingLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          width: 280,
          padding: 2,
          bgcolor: "background.paper",
          height: "80%",
          boxShadow: 1,
          borderRadius: "6px",
        }}
      >
        <MenuList title="Personal" items={personalMenuItems} />
        <Divider />
        <MenuList title="Organization" items={organizationMenuItems} />
      </Box>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default AccountBillingLayout;
