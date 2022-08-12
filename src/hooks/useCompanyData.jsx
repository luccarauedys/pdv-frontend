import React from "react";
import { DataContext } from "../contexts/DataContext";

export function useCompanyData() {
  const { data, setData } = React.useContext(DataContext);

  const companyData = data;
  const setCompanyData = setData;

  return [companyData, setCompanyData];
}
