import React from "react";

export const DataContext = React.createContext({});

export function DataProvider({ children }) {
  const [data, setData] = React.useState({});

  const getData = async () => {
    const response = await getCompanyData();
    setData(response.data);
  };

  React.useEffect(() => {
    getData();
  }, []);

  return <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>;
}
