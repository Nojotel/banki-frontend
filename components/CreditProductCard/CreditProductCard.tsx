import React from "react";
import { Card, CardContent, Typography, CardMedia, Box } from "@mui/material";
import { styled } from "@mui/system";
import { CreditProduct } from "@/types/CreditProduct";

interface CreditProductCardProps extends CreditProduct {}

// эффект наведения курсора мыши
const StyledCard = styled(Card)(({ theme }) => ({
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    borderRadius: "16px",
    boxShadow: "0px 0px 30px 0px rgba(0, 0, 0, 0.15)",
    background: "rgb(255, 255, 255)",
  },
}));

const CreditProductCard: React.FC<CreditProductCardProps> = ({ name, amount, logo }) => {
  return (
    <StyledCard>
      <Box display="flex" alignItems="center">
        <CardMedia
          component="img"
          sx={{
            width: 100,
            height: 100,
            objectFit: "contain",
            padding: 1,
          }}
          image={logo}
          alt={`${name} logo`}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          <Typography variant="h4" color="text.primary" sx={{ fontSize: "1.875rem", fontWeight: "bold" }}>
            {amount.toLocaleString()} ₽
          </Typography>
        </CardContent>
      </Box>
    </StyledCard>
  );
};

export default CreditProductCard;
