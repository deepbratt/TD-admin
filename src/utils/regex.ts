const regName = /^(?=.{3,40}$)[a-zA-Z]+(?:[-'. ][a-zA-Z]+)*$/;
const regTypeName = /^(?=.{0,40}$)[a-zA-Z '.-]*$/;
// const regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const regPhone =
  /^[+]?[0-9]{1}[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}[-\s.]?[0-9]{3,6}$/;
const regTypePhone = /^[+0-9 ]*$/;
const regEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regPass = /(?=.{8,})/;

export const isNameValid = (name: string) => {
  return regName.test(name);
};
export const isTypeAlphaSpace = (name: string) => {
  return regTypeName.test(name);
};
export const isPhoneValid = (phone: string) => {
  return regPhone.test(phone);
};
export const isTypeNumPlusBracket = (phone: string) => {
  return regTypePhone.test(phone);
};
export const isEmailValid = (email: string) => {
  return regEmail.test(email);
};
export const isPasswordValid = (password: string) => {
  return regPass.test(password);
};
