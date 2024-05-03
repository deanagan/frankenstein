import React, { useEffect, useState } from "react";
import { Product } from "../models/Product";
// import { useMemoObjCompare } from "../hooks/memoObjCompare";

type PickedProductFields = Pick<Product, "price" | "name">;
export interface CostCardProps {
  pickedFields: PickedProductFields;
}

export const CostCard: React.FC<CostCardProps> = ({ pickedFields }) => {
  const [priceWithCurrency, setPriceWithCurrency] = useState<string>("");

  // We don't really need a useEffect here. Just for demo purpose
  useEffect(() => {
    if (pickedFields) {
      console.log("running", pickedFields.name);
      setPriceWithCurrency(
        `The price for ${pickedFields.name} is ${pickedFields.price}`,
      );
    }
  }, [pickedFields]);

  return <div>{priceWithCurrency}</div>;
};
