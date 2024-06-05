import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Nav } from '../components'
import { useTranslation } from 'react-i18next'
const CopyRight=()=>{
  const currentYear = new Date().getFullYear()
  const {t} =useTranslation()
  return(
    <div className=" d-flex justify-content-center align-items-center p-2 mt-4">

      <p className='mb-0 text-secondary-blue text-center text-md-start'>&copy; {currentYear} Cold Well Banker New Alex. {t("footer.copyRights")}</p>

    {/* <div className="col-md-6 d-flex justify-content-end">
      <ul className="list-inline text-center text-md-end">
        <li className="list-inline-item"><a className='text-primary-white' href="#">{t("footer.privacy")}</a></li>
        <li className="list-inline-item"><a className='text-primary-white' href="#">{t("footer.Terms")}</a></li>
        <li className="list-inline-item"><a className='text-primary-white' href="#">{t("footer.Cookie")}</a></li>
      </ul>
    </div> */}
  </div>
  )
}
export default function MainLayout() {
  return (
   <div style={{ minHeight:"100vh"}}>
      <Nav />
            <main className=' overflow-hidden'>
              <Outlet />
            </main>

            {/* <BackToTop /> */}
          {/* </div> */}
          <Footer />
          <CopyRight />

   </div>
  )
}
