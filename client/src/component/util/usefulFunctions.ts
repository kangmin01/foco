export const validateNickname = (nickname: string): boolean => {
  const Regex = /^[a-z][a-z0-9]*$/i;
  return Regex.test(nickname);
};

export const validateEmail = (email: string): boolean => {
  const Regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return Regex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length > 7;
};
