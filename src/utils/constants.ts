import { OrderBy } from "../types/index";
// env variable
export const BASE_URL: string = import.meta.env.VITE_API_BASE_URL || "";

export const FILTERS = [
  { label: "All", value: "" },
  { label: "React", value: "react" },
  { label: "Angular", value: "angular" },
  { label: "Vue", value: "vue" },
];

export const ORDER_BY: Array<{ label: string; value: OrderBy }> = [
  { label: "Added to favorites", value: "added_to_favorites" },
  { label: "Date", value: "created_at" },
  { label: "Popularity", value: "points" },
  { label: "Comments", value: "num_comments" },
];
