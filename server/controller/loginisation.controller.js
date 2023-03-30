const db = require('../DB')
const hash = require("../hash");
const bcrypt = require("bcrypt");
const fs = require('fs')

class LoginisationController {
    async signUp(req, res) {
        const {name, email, password} = req.body
        return await hash.toHash(password).then(async response => {
            const que = `INSERT INTO accounts(id, name, avatar, email, password,salt) VALUES (NULL,'${name}', '','${email}','${response.hash}','${response.salt}')`
            return await db.query(que, async (err, response) => {
                if (err) {
                    throw err;
                } else {
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
        const queHashPassword = `SELECT password as hashPassword,salt FROM accounts WHERE email='${email}'`
        await db.query(queHashPassword, async (err, resp) => {
            res.header({
                "Access-Control-Allow-Origin": "*"
            })
            if (resp[0]) {
                const clientHash = await bcrypt.hashSync(password, resp[0].salt)
                if (clientHash === resp[0].hashPassword) {
                    const queData = `SELECT id,name,email FROM accounts WHERE email='${email}'`
                    await db.query(queData, async (err, respData) => {
                        const path = `avatars/${respData[0].id}/avatar/${respData[0].id}_avatar.png`
                        if (fs.existsSync(path)) {
                            await fs.readFile(path, function (err, avatar) {
                                if (err) throw err;
                                res.json({...respData[0], avatar})//send all user data and avatar from server page
                            });
                        } else {
                            res.json(respData[0])
                        }

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

    async avatarUpload(req, res) {
        try {
            const avatar = req.files
            const userId = req.params.userId
            const path = `avatars/${userId}/avatar`
            if (!fs.existsSync(path)) {//check if exist folder of this user
                fs.mkdirSync(path, {recursive: true}, err => {
                    if (err) throw err; // не удалось создать папку
                });
            }
            fs.writeFileSync(`${path}/${userId}_avatar.png`, avatar.image.data);
            res.json({message:'Avatar is uploaded'})
        } catch (e) {
            return res.status(500).json({message: 'Upload error'})
        }
    }

    async getAvatar(req, res) {
        try {
            const userId = req.params.userId
            const path = `avatars/${userId}/avatar/${userId}_avatar.png`
            if (fs.existsSync(path)) {//check if exist folder of this user
                const avatar = fs.readFileSync(path, err => {
                    if (err) throw err; // не удалось создать папку
                });
                res.json({avatar})
            } else {
                res.json({message: 'Avatar is none'})
            }
        } catch (e) {
            return res.status(500).json({message: 'Upload error'})
        }
    }
}

module.exports = new LoginisationController()