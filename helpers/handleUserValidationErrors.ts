import { FormikErrors } from "formik";
import { ExtendedFormikErrors } from "@/components/Auth/LoginForm";
import { RegisterFormValues } from "@/components/Auth/RegisterUser/RegisterForm";

export const handleUserValidationErrors = (
  actionResult: any,
  setErrors: (errors: ExtendedFormikErrors) => void,
) => {
  let errorData: any = actionResult.payload;
  const errorMessages: Partial<FormikErrors<RegisterFormValues>> = {};

  if (errorData && errorData.message && Array.isArray(errorData.message)) {
    if (errorData && errorData.message && Array.isArray(errorData.message)) {
      errorData.message.forEach((message: string) => {
        if (
          message.includes(
            "We couldn't find an account associated with that email. Please try a different e-mail address.",
          )
        ) {
          errorMessages.email =
            "Ми не знайшли обліковий запис із цією адресою електронної пошти";
        }
      });

      setErrors(errorMessages);
    }
  } else {
    console.error("Registration failed with general error:", errorData);
  }
};
