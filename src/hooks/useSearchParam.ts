import { useSearchParams } from "react-router-dom";

export default function useQueryParam() {
  const [params] = useSearchParams();
  //   return Object.fromEntries([...params]);
}
