import { parseISO, format } from "date-fns";

export default function parse(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, "yyyy-MM-dd");
}
