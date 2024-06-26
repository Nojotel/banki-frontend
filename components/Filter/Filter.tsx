import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Select, FormControl, InputLabel, InputAdornment, Snackbar } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { FilterProps } from "@/types/CreditProduct";
import styles from "./Filter.module.css";

const Filter: React.FC<FilterProps> = ({ onFilterChange, onSortChange }) => {
  const [amount, setAmount] = useState<number | null>(null);
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Обновление состояния из localStorage при монтировании компонента
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAmount = JSON.parse(localStorage.getItem("filterAmount") || "null");
      const savedSort = (localStorage.getItem("filterSort") as "asc" | "desc") || "desc";
      if (savedAmount !== null) setAmount(savedAmount);
      setSort(savedSort);
    }
  }, []);

  // Обработчики изменения фильтра и сортировки
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ? parseInt(event.target.value) : null;
    setAmount(value);
    onFilterChange(value);
    if (typeof window !== "undefined") {
      localStorage.setItem("filterAmount", JSON.stringify(value));
    }
  };

  const handleSortChange = (event: SelectChangeEvent<"asc" | "desc">) => {
    const value = event.target.value as "asc" | "desc";
    setSort(value);
    onSortChange(value);
    if (typeof window !== "undefined") {
      localStorage.setItem("filterSort", value);
    }
  };

  // Создание и копирование ссылки
  const createShareableLink = () => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams();
      if (amount !== null) searchParams.set("amount", amount.toString());
      if (sort) searchParams.set("sort", sort);
      return `${window.location.origin}${window.location.pathname}?${searchParams.toString()}`;
    }
    return "";
  };

  const copyToClipboard = async (link: string) => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(link);
        setOpenSnackbar(true);
        setTimeout(() => setOpenSnackbar(false), 2000);
      } catch (error) {
        alert(`Ошибка при копировании: ${error}`);
      }
    }
  };

  return (
    <div className={`${styles.container} ${styles.containerMobile}`}>
      <TextField
        className={`${styles.mobileStyles}`}
        label="Сумма кредита"
        type="number"
        value={amount || ""}
        onChange={handleFilterChange}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
          className: styles.MuiInputLabelRoot,
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
          inputProps: {
            step: 1000,
            min: 0,
          },
        }}
      />
      <FormControl variant="outlined" className={`${styles.mobileStyles}`}>
        <InputLabel shrink className={styles.MuiInputLabelRoot}>
          Сортировать
        </InputLabel>
        <Select value={sort} onChange={handleSortChange} label="Сортировать">
          <MenuItem value="asc">По минимальной сумме</MenuItem>
          <MenuItem value="desc">По максимальной сумме</MenuItem>
        </Select>
      </FormControl>
      <button className={styles.button} onClick={() => copyToClipboard(createShareableLink())}>
        Поделиться
      </button>
      <Snackbar open={openSnackbar} message="Ссылка скопирована в буфер обмена" anchorOrigin={{ vertical: "top", horizontal: "center" }} />
    </div>
  );
};

export default Filter;
