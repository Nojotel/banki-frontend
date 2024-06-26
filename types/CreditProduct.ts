export interface CreditProduct {
  name: string;
  amount: number;
  logo: string;
}

export interface FilterProps {
  onFilterChange: (amount: number | null) => void;
  onSortChange: (sort: "asc" | "desc") => void;
}
