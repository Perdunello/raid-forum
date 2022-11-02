const db = require('../DB')
const hash = require("../hash");

class LoginisationController {
    async signUp(req, res) {
        const {name, email, password} = req.body
        await hash(password).then(async hash => {
            const que = `INSERT INTO accounts(id, name, email, password) VALUES (NULL,'${name}','${email}','${hash.toString()}')`
            await db.query(que, async (err, response) => {
                if (err)
                    throw err;
                else
                    console.log('Account was signed up');
            })
        });
    }

    async isExistAccount(req, res) {
        const email = req.params.email
        const que = `SELECT COUNT(*) FROM accounts WHERE email='${email}'`
        await db.query(que, async (err, response) => {
            // console.log(response[0]['COUNT(*)']>0)
            res.header({
                "Access-Control-Allow-Origin": "*"
            })
            res.json({
                    isExistAccount: response[0]['COUNT(*)'] > 0
                }
            )
        })
    }
}

module.exports = new LoginisationController()