"use client";

import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const IndexForm = () => {
  const { data: session } = useSession();
  const rtr = useRouter();

  return (
    <div>
      <div>
        <Formik
          initialValues={{ url: "", name: "" }}
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const { data } = await axios.post("/api/videoanalyzer", values);

            const dbid = data.dbid;

            rtr.push(`/videos/${dbid}`);

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
