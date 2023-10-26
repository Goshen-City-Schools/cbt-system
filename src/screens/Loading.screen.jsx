/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoadingScreen.css"; // Import the CSS file for styling

export default function LoadingScreen({
  // eslint-disable-next-line react/prop-types
  navigateToPath = "",
  timer = 3000,
  height = "100vh",
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading by setting a timeout
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      navigate(navigateToPath);
    }, timer); // Redirect to /auth after 3 seconds

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(loadingTimeout);
  }, [navigate]);

  return isLoading ? (
    <div className="loading-screen" style={{ height: height }}>
      <div className="loader"></div>
      <h2>Loading...</h2>
    </div>
  ) : null;
}
