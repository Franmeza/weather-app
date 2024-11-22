import React from "react";

function CardsContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-between ">{children}</div>;
}

export default CardsContainer;
