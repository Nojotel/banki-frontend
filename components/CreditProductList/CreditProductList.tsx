import React from "react";
import { Grid } from "@mui/material";
import CreditProductCard from "@/components/CreditProductCard/CreditProductCard";
import { CreditProduct } from "@/types/CreditProduct";

interface CreditProductListProps {
  products: CreditProduct[];
}

const CreditProductList: React.FC<CreditProductListProps> = ({ products }) => {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.name}>
          <CreditProductCard {...product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CreditProductList;
