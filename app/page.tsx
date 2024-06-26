"use client";

import React, { useState, useEffect, useCallback, useMemo, Suspense, lazy } from "react";
import axios from "axios";
import { Container, CircularProgress } from "@mui/material";
import FilterSortControls from "@/components/Filter/Filter";
import { CreditProduct } from "@/types/CreditProduct";
import Alert from "@mui/material/Alert";

// ленивая загрузка
const LazyCreditProductList = lazy(() => import("@/components/CreditProductList/CreditProductList"));

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<CreditProduct[]>([]);
  const [filterAmount, setFilterAmount] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // получение данных продуктов с сервера
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/mock.json");
      setProducts(response.data.products || []);
    } catch (err) {
      setError("Ошибка при получении данных");
    } finally {
      setLoading(false);
    }
  }, []);

  // инициализация загрузки
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // фильтрация и сортировка
  const filteredProducts = useMemo(() => {
    return products.filter((product) => !filterAmount || product.amount >= filterAmount).sort((a, b) => (sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount));
  }, [filterAmount, sortOrder, products]);

  const handleFilterChange = (amount: number | null) => setFilterAmount(amount);
  const handleSortChange = (sort: "asc" | "desc") => setSortOrder(sort);

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <FilterSortControls onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
          <Suspense fallback={<CircularProgress />}>
            <LazyCreditProductList products={filteredProducts} />
          </Suspense>
        </>
      )}
    </Container>
  );
};

export default HomePage;
