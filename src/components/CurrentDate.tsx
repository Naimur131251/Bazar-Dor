"use client";

import { useEffect, useState } from "react";

const CurrentDate = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const today = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
      });

      setDate(today);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return <span>{date}</span>;
};

export default CurrentDate;
