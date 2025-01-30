import React, { createContext, useContext, useState } from "react";

const ApplicationContext = createContext();

export const useApplications = () => {
  return useContext(ApplicationContext);
};

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);

  const addApplication = (application) => {
    setApplications((prev) => [...prev, application]);
  };

  return (
    <ApplicationContext.Provider value={{ applications, addApplication }}>
      {children}
    </ApplicationContext.Provider>
  );
};
