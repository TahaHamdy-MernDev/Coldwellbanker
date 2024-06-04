import React from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export default function Form() {
    const {t} = useTranslation()
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
      console.log(data);
    };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-developer-form w-100 p-2">
      <h2 className="text-center mb-2 fs-4">{t("meetingWithTeam")}</h2>
      <div className="d-flex justify-content-center align-items-center">
        <p className="w-75 text-center">       {t("meetingText")}</p>
      </div>
      <div className="d-flex flex-column gap-2">
        <input
          className="form-control"
          required
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Your Name"
          {...register('firstName', { required: true })}
        />
        <input
          className="form-control"
          required
          type="email"
          name="email"
          id="email"
          placeholder="Your Email"
          {...register('email', { required: true })}
        />
        <input
          className="form-control mb-2"
          required
          type="tel"
          name="phone"
          id="phone"
          placeholder="Your Phone"
          {...register('phone', { required: true })}
        />
      </div>
      <textarea
        name="comment"
        className="form-control mb-2"
        required
        style={{ height: '175px' }}
        cols="45"
        rows="8"
        aria-required="true"
        {...register('comment', { required: true })}
      ></textarea>
      <button type="submit" className="btn button-primary">
        Send Email
      </button>
    </form>
  )
}
