const db = require('../DB')

class ForumController {
    async getMessages(sockets) {
        const que = `SELECT * FROM (SELECT F.id, A.id as account_id, A.name, F.message, F.time, F.date FROM forum_messages as F, accounts as A WHERE A.id=F.account_id ORDER BY F.id DESC LIMIT 10) as F ORDER BY F.id`
        await db.query(que, async (err, response) => {
            if (sockets){
                sockets.map(sock => {
                    sock.emit('get-messages', response)
                })
            }
        })
    }

    async addMessage({userId, message, time, date}) {
        const que = `INSERT INTO forum_messages(id, account_id, message, time, date) VALUES (NULL,${userId},'${message}','${time}','${date}')`
        await db.query(que, async (err, response) => {
            console.log(response)
        })
    }
}


module.exports = new ForumController()