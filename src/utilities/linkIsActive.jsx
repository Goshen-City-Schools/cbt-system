import { useLocation } from "react-router-dom";

export default function LinkIsActive(link) {
  const location = useLocation();

  if (location.pathname.includes(link)) return true;
  else return false;
}
