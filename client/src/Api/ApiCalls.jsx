import axios from 'axios';

const Api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URI}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const FetchLatestProperties= async()=>{
   const response= await Api.get("/property/get-latest")
   return response.data.data
}
export const FetchTopAreas= async()=>{
   const response= await Api.get("/area/top-areas")
   return response.data.data
}
export const FetchPropertiesForRent= async()=>{
   const response= await  Api.get("/property/for-rent")
   return response.data.data
}
export const FetchTopTypes= async()=>{
   const response= await  Api.get("/type/get-top")
   return response.data.data
}
export const FetchAllDevelopers= async()=>{
   const response= await  Api.get("/developer/get-all")
   return response.data.data
}
export const FetchDeveloper = async(id)=>{
   const response= await  Api.get(`/developer/get/${id}`)
   return response.data.data
}
export const FetchProperty = async(id)=>{
   const response= await  Api.get(`/property/get/${id}`)
   return response.data.data
}
export const FetchLatestLunches = async()=>{
   const response= await  Api.get(`/launch/get-latest`)
   return response.data.data
}
export const FetchLaunchDetails = async(id)=>{
   const response= await  Api.get(`/launch/get/${id}`)
   return response.data.data
}
export const FetchDeveloperLaunch = async(developerId)=>{
   const response= await  Api.get(`/launch/developer-launch/${developerId}`)
   return response.data.data
}
