"use client";

import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";

const IndexForm = () => {
  const { data: session } = useSession();

  return (
    <div>
      <div>
        <h1>Any place in your app!</h1>
        <Formik
          initialValues={{ url: "", name: "" }}
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const { data } = await axios.post("/api/videoanalyzer", values);
            console.log(data);
          }}
        >
          <Form>
            <Field type="text" name="url" />
            <ErrorMessage name="url" component="div" />
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default IndexForm;
