import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = sessionStorage.getItem("userId");
    if (!userData) {
      navigate("/");
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  if (isLoading) {
    return <div><h3>Loading...</h3></div>; // You can replace this with a spinner or loader if you have one
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
