const bcrypt = require('bcrypt');
const {response} = require("express");

const hash = {
    async toHash(password) {
        const saltRounds = 2;
        const salt = await bcrypt.genSaltSync(saltRounds)
        return {hash: bcrypt.hashSync(password, salt), salt: salt}
    },
    async comparePassword(password, hash) {
        return bcrypt.compare(password.toString(), hash);
    }

}
// const hash = async (password) => {
//     const saltRounds = 2;
//     const salt = await bcrypt.genSaltSync(saltRounds)
//     return await bcrypt.hashSync(password, salt)
//     //  bcrypt.compare(password, hash, function (err, result) {
//     // console.log(result)
//     //  });
// }
module.exports = hash