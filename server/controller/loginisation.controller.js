const db = require('../DB')
const hash = require("../hash");
const bcrypt = require("bcrypt");

class LoginisationController {
    async signUp(req, res) {
        const {name, email, password} = req.body
        return await hash.toHash(password).then(async response => {
            const que = `INSERT INTO accounts(id, name, email, password,salt) VALUES (NULL,'${name}','${email}','${response.hash}','${response.salt}')`
            return await db.query(que, async (err, response) => {
                if (err) {
                    throw err;
                } else {
                    console.log('Account was signed up');
                    res.json()
                }
            })
        });
    }

    async isExistAccount(req, res) {
        const email = req.params.email
        const que = `SELECT COUNT(*) FROM accounts WHERE email='${email}'`
        await db.query(que, async (err, response) => {
            res.header({
                "Access-Control-Allow-Origin": "*"
            })
            res.json({
                    isExistAccount: response[0]['COUNT(*)'] > 0
                }
            )
        })
    }

    async login(req, res) {
        const {email, password} = req.params
        console.log(req.params)
        const queHashPassword = `SELECT password as hashPassword,salt FROM accounts WHERE email='${email}'`
        await db.query(queHashPassword, async (err, resp) => {
            res.header({
                "Access-Control-Allow-Origin": "*"
            })
            if (resp[0]) {
                const clientHash = await bcrypt.hashSync(password, resp[0].salt)
                if (clientHash === resp[0].hashPassword) {
                    const queData = `SELECT name,email FROM accounts WHERE email='${email}'`
                    await db.query(queData, async (err, respData) => {
                        res.json(respData)
                    })
                } else {
                    res.json({
                            result: 'Login or password are wrong'
                        }
                    )
                }
            } else {
                res.json({
                        result: 'Login or password are wrong'
                    }
                )
            }
        })
    }
}

module.exports = new LoginisationController()