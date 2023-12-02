import jwt from "jsonwebtoken";

export const genToken = async (
  data: { id: string; name: string },
  expiresIn: string,
  secretToken: string
) => {
  return await jwt.sign({ ...data }, secretToken, { expiresIn });
};
