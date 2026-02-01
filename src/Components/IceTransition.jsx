import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./IceTransition.css";

const IceTransition = () => {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add("cold-refract");
    const t = setTimeout(() => {
      document.body.classList.remove("cold-refract");
    }, 700);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return null;
};

export default IceTransition;

