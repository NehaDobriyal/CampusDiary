import bcrypt from 'bcrypt';

export const hashValue = async (value) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(value, salt);
};

export const verifyValue = async (value, hashedValue) => {
  return await bcrypt.compare(value, hashedValue);
};
