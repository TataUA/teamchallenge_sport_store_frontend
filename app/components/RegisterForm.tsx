//import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
//import { registerUserThunk } from "redux/auth/authThunk";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(1, "Це поле не може бути порожнім")
    .matches(/^[^\d\W]+$/, "Це поле може містити лише літери")
    .required("Це поле обов'язкове"),
  surname: yup
    .string()
    .min(1, "Це поле не може бути порожнім")
    .matches(/^[^\d\W]+$/, "Це поле може містити лише літери")
    .required("Це поле обов'язкове"),
  patronymic: yup
    .string()
    .min(1, "Це поле не може бути порожнім")
    .matches(/^[^\d\W]+$/, "Це поле може містити лише літери")
    .required("Це поле обов'язкове"),
  phone: yup
    .string()
    .min(12, "Номер телефону повинен містити не менше 12 символів")
    .matches(
      /^\+[0-9]{12}/,
      "Номер телефону повинен бути у форматі +380*********"
    )
    .required("Це поле обов'язкове"),
  email: yup
    .string()
    .email("Введіть дійсну електронну адресу")
    .required("Це поле обов'язкове"),
  password: yup
    .string()
    .min(6, "Пароль повинен містити не менше 6 символів")
    .matches(
      /^[A-Za-z0-9!@#$%^&*]+$/,
      "Пароль може містити лише літери, цифри та символи"
    )
    .required("Це поле обов'язкове"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Паролі повинні співпадати")
    .required("Це поле обов'язкове"),
});

interface FormValues {
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const initialValues: FormValues = {
  name: "",
  surname: "",
  patronymic: "",
  phone: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export const RegisterForm = () => {
  //const dispatch = useDispatch();

  // const handleSubmit = ({ name, email, password }, { resetForm }) => {
  //   dispatch(registerUserThunk({ name, email, password }));
  //   resetForm();
  // };

  return (<></>
    // <Formik
    //   initialValues={initialValues}
    //   validationSchema={schema}
    //   onSubmit={() => console.log()} //handleSubmit
    // >
    //   <Form autoComplete="on">
    //     <label htmlFor="name">
    //       Name
    //       <Field
    //         id="name"
    //         type="text"
    //         name="name"
    //         placeholder="Rosie Simpson"
    //       />
    //       <ErrorMessage name="name" component={""} />
    //     </label>
    //     <label htmlFor="email">
    //       Email
    //       <Field
    //         id="email"
    //         type="email"
    //         name="email"
    //         placeholder="rosiesimpson@gmail.com"
    //       />
    //       <ErrorMessage name="email" component={""} />
    //     </label>
    //     <label htmlFor="password">
    //       Password
    //       <Field
    //         autoComplete="off"
    //         id="password"
    //         type="password"
    //         name="password"
    //         placeholder="
    //         Must be at least 7 characters"
    //       />
    //       <ErrorMessage name="password" component={""} />
    //     </label>
    //     <button type="submit">Create</button>
    //   </Form>
    // </Formik>
  );
};
