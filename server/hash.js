const bcrypt = require('bcrypt');


const hash = async (password) => {
    const saltRounds = 2;
    const salt = await bcrypt.genSaltSync(saltRounds)
    return await bcrypt.hashSync(password, salt)
    //  bcrypt.compare(password, hash, function (err, result) {
    // console.log(result)
    //  });
}
module.exports = hash