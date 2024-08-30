import { ErrorType } from "@/redux/auth/authThunk";

export const handleThunkValidationErrors = (error: any): ErrorType => {
  let errorMessages: string[] = [];

  if (error.phone_number) {
    errorMessages = errorMessages.concat(error.phone_number);
  }

  if (error.email) {
    errorMessages = errorMessages.concat(error.email);
  }

  if (!errorMessages.length) {
    errorMessages = ["An error occurred"];
  }

  return {
    message: errorMessages,
  };
};
