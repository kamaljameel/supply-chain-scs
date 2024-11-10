// components/SearatesWidget.js
import { useEffect } from "react";

const SearatesWidget = () => {
  useEffect(() => {
    // Dynamically load the Searates widget script
    const script = document.createElement("script");
    script.src = "https://www.searates.com/freight/widget";
    script.async = true;
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div
        id="marketplace"
        className="container-fluid"
        data-filter='{"platform": "1", "currency": "USD"}'
      ></div>
    </>
  );
};

export default SearatesWidget;
