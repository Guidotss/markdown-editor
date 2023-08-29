import jwt from "jsonwebtoken";

export const signDocument = (id: string, email: string, name: string) => {
  if (!process.env.JSON_SECRET) {
    throw new Error("No secret found");
  }
  const token = jwt.sign({ id, email, name }, process.env.JSON_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export const verifyToken = (token: string) => {
  if (!process.env.JSON_SECRET) throw new Error("No secret found");
  if (!token || token.length) throw new Error("Invalid token");

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JSON_SECRET || "", (error, decoded) => {
        if (error) return reject(error);
        resolve(decoded);
      });
    } catch (error) {
      reject(error);
    }
  });
};
