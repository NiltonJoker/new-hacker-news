// env variable
export const BASE_URL: string = import.meta.env.VITE_API_BASE_URL || "";

export const FILTERS = [
  { label: "All", value: "" },
  { label: "React", value: "react" },
  { label: "Angular", value: "angular" },
  { label: "Vue", value: "vue" },
]