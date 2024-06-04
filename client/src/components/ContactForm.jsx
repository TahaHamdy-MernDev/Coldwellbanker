import React from 'react'
import Form from './Common/Form'
export default function ContactForm() {
   
  return (
    <section>
      <div className="row">
        <div className="col-md-6 section-padding d-flex justify-content-center align-items-center container">
              <Form/>

                {/* </div> */}
        </div>
        <div className="col-md-6 hidden-sm">
          <img
            src="/contact-us.webp"
            width="100%"
            className="contact-img object-fit-cover"
            height="600"
            alt="contact-us"
          />
        </div>
      </div>
    </section>
  )
}
