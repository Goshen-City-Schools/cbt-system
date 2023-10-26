import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GeneralNotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to the home page and replace the URL
    navigate("/", { replace: true });
  }, [navigate]);

  return <div>Page Not Found. Redirecting to Home...</div>;
}

export default GeneralNotFound;
