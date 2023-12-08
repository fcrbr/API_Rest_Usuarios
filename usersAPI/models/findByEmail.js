var knex = require("../database/connection");
const User = require('./User');


async function findByEmail(email) {
  try{
  const result = await knex.select(['id', 'email', 'password', 'role', 'nome']).where({ email: email }).table('users');

 // if (result.length > 0) {
 //   const user = result[0];
 //   return user;
 // } else {
 //   return undefined;
 // }
//} 

if(result.length > 0){
  return result[0];
}else{
  return undefined;
}

}catch(err){
console.log(err);
return undefined;
}
}



module.exports = findByEmail;

