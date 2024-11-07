import bcrypt from "bcrypt";

export const hashPassword = (password: string): string => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

export const decryptPassword = (data: string, encrypted: string): boolean => {
  return bcrypt.compareSync(data, encrypted);
};
