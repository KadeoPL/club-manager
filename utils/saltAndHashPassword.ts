export async function saltAndHashPassword(unHashPassword: string) {
  const bcrypt = require("bcrypt");
  const saltRounds = 10;
  const hash = await bcrypt.hash(unHashPassword, saltRounds);
  return hash;
}
