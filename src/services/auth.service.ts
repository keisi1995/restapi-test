import * as repositoryUser from "../repositories/user.repository";
import { User } from "../models/user";
import { mapperToList, mapperToSave } from "../mappers/user.mapper";
import { config } from "../utils/config";
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
 
export const register = async (user: User) => {  
  const data = await mapperToSave(user);
  return await repositoryUser.create(data);
}

export const login = async (user: User) => {

  if (!user.email) { throw new Error("Debe ingresar el email"); }
  if (!user.password) { throw new Error("Debe ingresar el password"); }

  const result = await repositoryUser.findOneBy({email: user.email});
  
  if (!result || result.length <= 0) { throw new Error("El usuario no existe"); }
  
  const userExist = result[0];


  const isValid = await bcrypt.compare(user.password, userExist.password);

  if (!isValid) {
    return {
      success: false,
      message: "La credencia es incorrecta"
    }
  }

  const token = jwt.sign({ user_id: userExist.id }, config.JWT_SECRET, { expiresIn: config.JWT_TTL });
  return {
    jwt: token,    
    user: mapperToList(userExist)
  };
};
