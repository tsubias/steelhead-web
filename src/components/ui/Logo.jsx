import { useEffect, useState } from "react";

export default function Logo() {
  const [rotating, setRotating] = useState(false);

  useEffect(() => {
    const triggerRotation = () => {
      setRotating(true);

      setTimeout(() => {
        setRotating(false);
      }, 1000);
    };

    const initial = setTimeout(triggerRotation, 2000);

    const interval = setInterval(triggerRotation, 5000);

    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`logo-container ${rotating ? "rotating" : ""}`}>
      <img src="/steelhead-logo.svg" alt="Steelhead logo" />
    </div>
  );
}
