import { User } from '../models/user';
const bcrypt = require('bcryptjs'); 

export const mapperToList = (user: User): Omit<User, 'first_name' | 'last_name' | 'password'> => {     
  return {
    id: user.id || '',
    email: user.email || '',
    full_name: user.first_name + ', ' + user.last_name    
  };
}

export const mapperToSave = async (user: User): Promise<User> => {
  return {
    email: user.email || '',
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    password: await bcrypt.hash(user.password, 10)
  };
} 