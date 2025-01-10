import Typography from "@mui/material/Typography";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";

export default function TermsAndConditionsDialog({ openModal, setOpenModal }) {
  return (
    <Dialog
      open={openModal}
      onClose={() => setOpenModal(false)}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle color="primary" sx={{ textAlign: "center" }}>
        ARKIVE SELLER TERMS AND CONDITIONS
      </DialogTitle>
      <DialogContent dividers>
        <Box>
          <Typography color="primary" variant="subtitle1" gutterBottom>
            Effective Date: 1st of January, 2025
          </Typography>
          <Typography variant="body1" gutterBottom>
            Welcome to Arkive! By creating an account on our portal and using
            our services, you ("Seller") agree to comply with and be bound by
            the following Terms and Conditions. Please read them carefully
            before proceeding.
          </Typography>

          <Typography color="primary" variant="h6" gutterBottom>
            1. Definitions
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>"Arkive"</strong> refers to Arkive B.V., the platform
            provider facilitating the management, sales, repurposing, and
            donation of Seller inventory.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>"Portal"</strong> refers to Arkive’s online platform where
            Sellers can upload and manage their inventory.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>"Inventory"</strong> refers to products, materials, or items
            listed by the Seller on the Portal.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>"Sales Channels"</strong> include third-party platforms,
            marketplaces, or other avenues where inventory is sold.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>"Repurposing Channels"</strong> refers to platforms or
            initiatives where inventory is redirected for alternative uses.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>"Donation Channels"</strong> refer to organizations or
            individuals receiving inventory as a donation.
          </Typography>

          <Typography color="primary" variant="h6" gutterBottom>
            2. Eligibility and Account Creation
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>2.1 Eligibility:</strong> You must be at least 18 years old
            and have the authority to enter into this agreement on behalf of
            your organization.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>2.2 Account Information:</strong> Sellers must provide
            accurate and up-to-date information during registration. Arkive
            reserves the right to suspend or terminate accounts with false or
            incomplete information.
          </Typography>

          <Typography color="primary" variant="h6" gutterBottom>
            3. Inventory Upload and Management
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>3.1 Inventory Requirements:</strong> Sellers are responsible
            for ensuring that inventory uploaded to the Portal complies with all
            applicable laws, regulations, and safety standards.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>3.2 Accuracy of Listings:</strong> Inventory descriptions,
            quantities, and conditions must be accurate. Any discrepancies may
            lead to penalties or suspension.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>3.3 Prohibited Items:</strong> Sellers may not upload items
            that are illegal, hazardous, or violate intellectual property
            rights. Arkive reserves the right to remove such listings without
            prior notice.
          </Typography>

          <Typography color="primary" variant="h6" gutterBottom>
            4. Services Provided by Arkive
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>4.1 Distribution:</strong> Arkive will facilitate the
            distribution of inventory through Sales Channels, Repurposing
            Channels, and Donation Channels.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>4.2 Platform Maintenance:</strong> Arkive will provide
            Sellers with access to the Portal and ensure reasonable uptime and
            functionality.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>4.3 Data Insights:</strong> Sellers may access performance
            and environmental impact data for their inventory as part of the
            services.
          </Typography>

          <Typography color="primary" variant="h6" gutterBottom>
            5. Commission and Fees
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>5.1 Commission Structure:</strong> Arkive will retain a
            [30%] commission on all sales (excluding VAT). The specific
            commission rate will be outlined in your Seller Agreement.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>5.2 Repurposing and Donation Fees:</strong> Additional fees
            for repurposing or donation activities may apply and will be
            communicated in advance.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>5.3 Payment Terms:</strong> Sellers will receive payouts for
            completed sales within [30 days] of transaction completion, less
            applicable fees and commissions.
          </Typography>

          <Typography color="primary" variant="h6" gutterBottom>
            6. Seller Responsibilities
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>6.1 Compliance:</strong> Sellers must comply with all
            relevant laws and regulations, including tax obligations.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>6.2 Inventory Quality:</strong> Sellers are responsible for
            ensuring the quality and condition of inventory uploaded to the
            Portal.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>6.3 Indemnification:</strong> Sellers agree to indemnify and
            hold Arkive harmless from any claims, damages, or losses resulting
            from their inventory or activities.
          </Typography>

          <Typography color="primary" variant="h6" gutterBottom>
            7. Liability and Disclaimers
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>7.1 Limited Liability:</strong> Arkive is not liable for any
            indirect, incidental, or consequential damages resulting from the
            use of its services.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>7.2 No Guarantee of Sales:</strong> Arkive does not
            guarantee the sale, repurposing, or donation of any inventory.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>7.3 Force Majeure:</strong> Arkive is not responsible for
            delays or failures due to events beyond its reasonable control.
          </Typography>

          <Typography color="primary" variant="h6" gutterBottom>
            8. Termination
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>8.1 By Seller:</strong> Sellers may terminate their account
            at any time by providing written notice to Arkive.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>8.2 By Arkive:</strong> Arkive reserves the right to suspend
            or terminate accounts for violations of these Terms and Conditions
            or misuse of the Portal.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>8.3 Effect of Termination:</strong> Upon termination, all
            unsold or undistributed inventory will be returned or disposed of as
            agreed.
          </Typography>

          <Typography color="primary" variant="h6" gutterBottom>
            9. Intellectual Property
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>9.1 Ownership:</strong> Arkive retains all rights to its
            Portal, branding, and technology. Sellers may not use Arkive’s
            intellectual property without prior written consent.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>9.2 Content Usage:</strong> By uploading inventory, Sellers
            grant Arkive a non-exclusive, royalty-free license to use associated
            content (e.g., descriptions, images) for promotional purposes.
          </Typography>

          <Typography color="primary" variant="h6" gutterBottom>
            10. Governing Law and Dispute Resolution
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>10.1 Governing Law:</strong> These Terms and Conditions are
            governed by the laws of the European Union.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>10.2 Dispute Resolution:</strong> Any disputes will first be
            addressed through good-faith negotiations. If unresolved, disputes
            will be settled by arbitration in Amsterdam, The Netherlands.
          </Typography>

          <Typography color="primary" variant="h6" gutterBottom>
            11. Modifications to Terms
          </Typography>
          <Typography variant="body2" paragraph>
            Arkive reserves the right to update or modify these Terms and
            Conditions at any time. Sellers will be notified of significant
            changes via email or the Portal. Continued use of the services
            constitutes acceptance of the updated terms.
          </Typography>

          <Typography color="primary" variant="h6" gutterBottom>
            12. Contact Information
          </Typography>
          <Typography variant="body2" paragraph>
            For questions or concerns regarding these Terms and Conditions,
            please contact us at:
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Email:</strong> finance@arkive.nl
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Address:</strong> Zaanstraat 253, 1013 RZ Amsterdam
          </Typography>
          <Typography sx={{ textAlign: "center" }} variant="body2" paragraph>
            By creating an account and using Arkive’s services, you acknowledge
            that you have read, understood, and agree to these Terms and
            Conditions.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(false)}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
