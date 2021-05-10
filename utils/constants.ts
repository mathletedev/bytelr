export const __prod__ = process.env.NODE_ENV === "production";

// ! Converts "D" to "$"
const pwParts = process.env.DB_PASS!.split("D");
export const __pass__ = `${pwParts[0]}$${pwParts[1]}`;
