import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Developer, Developers, Home } from "../pages";
import PropertyDetails from "../pages/Property";

const ProjectRoutes = () => {
 
    const element = useRoutes([
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { index: true, element: <Home /> },
          { path:"/developers", element: <Developers /> },
          { path:"/developer-details/:id", element: <Developer /> },
          { path:"property-details/:id", element: <PropertyDetails /> },
        //   { path:"/contact-us", element: <ContactUs /> },
        //   { path:"/about-us", element: <AboutUs /> },
        ],
      },

    ]);
    return element;
  };
  
  export default ProjectRoutes;