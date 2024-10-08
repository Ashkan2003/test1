export interface FormValuesType extends FormData {
  fullName: string;
  email: string;
  date: string;
  password: string;
  confirmPassword: string;
  receiveMessageCheckBox: boolean;
  gender: "male" | "female";
  profileImg: any;
}
