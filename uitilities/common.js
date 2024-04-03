/*
 * @file: common.js
 * @description: It contain common functions.
 * @author: Rajneshwar Singh
 */

import bcrypt from 'bcrypt';
const saltRounds = 10;

export async function hashPassword(plainPassword) {
  const salt = await bcrypt.genSaltSync(saltRounds);
  return await bcrypt.hashSync(plainPassword, salt);
}

export async function comparePassword(plainPassword, hash) {
  return await bcrypt.compareSync(plainPassword, hash);
}
