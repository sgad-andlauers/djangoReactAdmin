import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
export const DataContext = createContext();

const api = {
    urlGetUser: "https://dev.geo.sdis67.com/api/v1/public/allUsers",
    urlGetCities: "https://dev.geo.sdis67.com/api/v1/app/erp/cities",
    urlGroup: "https://dev.geo.sdis67.com/api/v1/public/group",
    urlGetPermissions: "https://dev.geo.sdis67.com/api/v1/public/permissions",
    urlPostUser: "https://dev.geo.sdis67.com/api/v1/public/user",
    urlPostGroup:"https://dev.geo.sdis67.com/api/v1/public/group",
    urlPostRelations: "https://dev.geo.sdis67.com/api/v1/public/relations",
  };
export default function DataContextProvider(props) {
    const urlPostUser = api.urlPostUser;
    const urlPostGroup = api.urlPostGroup;
    const urlPostRelations = api.urlPostRelations;
    const [apiData, setApiData]= useState(null);
    const [apiDataGroup, setApiDataGroup] = useState(null);
    const [apiDataPermissions, setApiDataPermissions]= useState(null);
    const [apiCities, setApiCities]= useState(null);

    /** ---------------------------- questionnement de l'api --------------------------------- */
  const getAPIData = async () => {
    const res = await axios.get(api.urlGetUser);
    console.log(res);
    setApiData(res.data.data)
  };
  useEffect(() => {
    console.log("getApiUser");
    getAPIData();
  }, []);
      const getApiCities = async () => {
        const res = await axios.get(api.urlGetCities);
        setApiCities(res.data.data.cities);
      }
      useEffect(() => {
        console.log("getApiCities");
        getApiCities();
      }, []);
      const getAPIDataGroup = async () => {
        const res = await axios.get(api.urlGroup );
        setApiDataGroup(res.data.data.groups);
        
      };
      useEffect(() => {
        console.log("getApiDataGroup");
        getAPIDataGroup();
      }, []);
      const getAPIDataPermissions = async () => {
        const res = await axios.get(`${api.urlGetPermissions}`);
        setApiDataPermissions(res.data.data.permissions);
      };
      useEffect(() => {
        console.log("getApiDataPermissions");
        getAPIDataPermissions();
      }, []);
    /** -------------------------------- fin du questionnement de l'api ------------------------------ */
    return (
        <DataContext.Provider
          value={{
            apiData,
            apiCities,
            apiDataGroup,
            apiDataPermissions,
            urlPostUser,
            urlPostGroup,
            urlPostRelations
          }}
        >
          {props.children}
        </DataContext.Provider>
      );
}