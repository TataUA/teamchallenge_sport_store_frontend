import { useDispatch } from "react-redux"
import * as yup from "yup";
import { useState } from "react"
import { Form, Formik, FormikHelpers } from "formik"

// components
import { InputLabelField } from "@/components/Auth/InputLabelField"

// store
import { AppDispatch } from "@/redux/store"
import { editUserThunk } from "@/redux/auth/authThunk"

export const schema = yup.object().shape({
  name: yup
    .string()
    .min(1)
    .matches(
      /^(?!.*[ыёъэЫЁЪЭ])[A-Za-zА-Яа-яЇїІіЄєҐґ']+$/,
      "Це поле може містити лише латинські та українські літери"
    )
    .required("Це поле обов'язкове"),
  surname: yup
    .string()
    .min(1)
    .matches(
      /^(?!.*[ыёъэЫЁЪЭ])[A-Za-zА-Яа-яЇїІіЄєҐґ']+$/,
      "Це поле може містити лише латинські та українські літери"
    )
    .required("Це поле обов'язкове"),
  patronymic: yup
    .string()
    .min(1)
    .matches(
      /^(?!.*[ыёъэЫЁЪЭ])[A-Za-zА-Яа-яЇїІіЄєҐґ']+$/,
      "Це поле може містити лише латинські та українські літери"
    )
    .required("Це поле обов'язкове"),
  phone: yup
    .string()
    .min(13, "Номер повинен містити 13 символів")
    .max(13, "Номер повинен містити 13 символів")
    .matches(
      /^\+380\d{9}$/,
      "Номер телефону повинен бути у форматі +380*********"
    )
    .required("Це поле обов'язкове"),
  email: yup
    .string()
    .email("Введіть дійсну електронну адресу")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Невірний формат адреси електронної пошти"
    )
    .required("Це поле обов'язкове"),
});

// assets
import getPencilIconSVG from "@/helpers/getPencilIconSVG"

// selector
import EditUserDataModal from "../EditUserDataModal";
import { cn } from "@/services/utils/cn";
import UserDataWasSuccessEdited from "../UserDataWasSuccessEdited";
import { UserDataEditFormValues } from "@/components/Auth/EditUser/UserDataEdit";

interface IProps {
  user: any
}

const UserInfo = (props:IProps) => {
  const {user} = props

  const dispatch: AppDispatch = useDispatch();

  const [editDataMode, setEditDataMode] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const initialValues: UserDataEditFormValues = {
    name: user?.name || "",
    surname: user?.surname || "",
    patronymic: user?.patronymic || "",
    phone: user?.phone || "",
    email: user?.email || "",
    id: user?.id || "",
  };

  const handleSubmit = async (
    values: UserDataEditFormValues,
    { resetForm, setErrors }: FormikHelpers<UserDataEditFormValues>
  ) => {
    try {
      const actionResult = await dispatch(editUserThunk(values));

      if (editUserThunk.fulfilled.match(actionResult)) {
        resetForm();
        setEditDataMode(false);
        setShowSuccessMessage(true);
      } else if (editUserThunk.rejected.match(actionResult)) {
        let errorData: any = actionResult.payload;

        if (
          errorData &&
          errorData.message &&
          Array.isArray(errorData.message)
        ) {
          if (
            errorData.message.includes("user with this email already exists.")
          ) {
            setErrors({ email: "Така пошта вже зареєстрована" });
          } else if (
            errorData.message.includes("Enter a valid email address.")
          ) {
            setErrors({ email: "Адреса введеної пошти не вірна" });
          } else if (
            errorData.message.includes("The phone number entered is not valid.")
          ) {
            setErrors({ phone: "Введений номер не вірний" });
          } else if (
            errorData.message.includes(
              "user with this phone number already exists."
            )
          ) {
            setErrors({ phone: "Такий номер вже зареєстрований" });
          }
        } else {
          console.error("Registration failed with general error:", errorData);
        }
      }
    } catch (error) {
      console.error("Registration failed in catch block:", error);
    }
  };

  return (
    <>
      <div className="relative p-6 bg-[#F1F4FE] flex flex-col gap-[6px] rounded-3xl text-sm">
        <div
          className="absolute right-6 top-6 cursor-pointer"
          onClick={() => setEditDataMode(true)}
        >
          {getPencilIconSVG()}
        </div>
        <div>
          <span className="capitalize">{user.surname}</span>{" "}
          <span className="capitalize">{user.name}</span>
        </div>
        <div>{user.phone}</div>
        <div>{user.email}</div>
      </div>
      <EditUserDataModal
        show={editDataMode}
        onClose={() => setEditDataMode(false)}
      >
        <div
          className="
            relative top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-full bg-white h-fit rounded-3xl overflow-hidden p-6
            md:max-w-[607px] md:left-0 md:translate-x-0 md:p-10
        "
        >
          <h3 className="text-[#1A1A1C] text-xl font-bold mb-6">
            Редагування даних
          </h3>
          <Formik
            initialValues={{ ...initialValues }}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form autoComplete="off" className="flex flex-col">
                <div className="flex flex-col gap-4 mb-8">
                  <InputLabelField
                    label="Прізвище"
                    name="surname"
                    type="text"
                    inputMode="text"
                    placeholder=""
                    formik={formik}
                  />

                  <InputLabelField
                    label="Ім'я"
                    name="name"
                    type="text"
                    inputMode="text"
                    placeholder=""
                    formik={formik}
                  />

                  <InputLabelField
                    label="По-батькові"
                    name="patronymic"
                    type="text"
                    inputMode="text"
                    placeholder=""
                    formik={formik}
                  />

                  <InputLabelField
                    label="Номер телефону"
                    name="phone"
                    type="text"
                    inputMode="tel"
                    placeholder="+380*********"
                    formik={formik}
                  />

                  <InputLabelField
                    label="Електронна пошта"
                    name="email"
                    type="email"
                    inputMode="email"
                    placeholder="example@gmail.com"
                    formik={formik}
                  />
                </div>
                <div className="flex flex-wrap gap-4 justify-between items-start">
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="w-full h-12 px-6 rounded-xl bg-blue text-base font-semibold  text-white hover:bg-active_blue transition-all
                      md:w-[47%]
                    "
                  >
                    Зберегти
                  </button>
                  <div
                    className={cn(
                      "w-full max-h-12 py-[11px] px-6 text-[#3E3E40] border-[1px] border-[#E7E7E8] rounded-xl text-center text-base font-semibold transition-all",
                      "md:w-[48%]",
                      "hover:bg-[#E7EDFE]",
                    )}
                    onClick={() => setEditDataMode(false)}
                  >
                    Закрити
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </EditUserDataModal>
      <UserDataWasSuccessEdited showSuccessModal={showSuccessMessage}>
        <p className="mb-6 text-sm font-medium text-common">
          Інформація успішно оновлена
        </p>
        <div
          onClick={() => setShowSuccessMessage(false)}
          className="w-full h-12 px-4 py-2 block text-center  border border-blue rounded-xl  bg-white text-base font-semibold text-blue hover:bg-blue hover:text-white transition-all"
        >
          Продовжити
        </div>
      </UserDataWasSuccessEdited>
    </>
  );
}

export default UserInfo
