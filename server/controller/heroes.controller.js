const db = require('../DB')

class HeroesController {
    async getAllChampionsAvatars(req, res) {
        const que = `SELECT id,name,avatar_link,affinity,rarity FROM hero`
        // const que1 = `--SELECT H.id, H.name,H.avatar,H.affinity,H.rarity,H.role, P.HP,P.Attack,P.Defense,P.Speed,P.CritRate,P.CritDamage,P.Resistance,P.Accuracy,S.name,S.image,S.text,S.cooldown FROM hero as H, param as P,skill as S WHERE H.param_id=P.id AND H.id=S.hero_id`
        await db.query(que, async (err, response) => {
            res.header({
                "Access-Control-Allow-Origin": "*"
            })
            res.json(response.map(item => {
                        return {
                            id: item.id,
                            name: item.name,
                            avatar: item.avatar_link,
                            // Buffer.from(item.avatar).toString('base64'),
                            affinity: item.affinity,
                            rarity: item.rarity
                        }
                    }
                )
            )
        })
    }

    async getAllChampionData(req, res) {
        const id = req.params.id.replace(/[^0-9]/, "")

        const queryMainInfo = `SELECT H.id, H.name, H.avatar_link,H.faction,H.affinity, H.rarity,H.role FROM hero as H WHERE id=${id}`
        await db.query(queryMainInfo, async (err, response1) => {
            if (!err) {
                const queryParams = `SELECT P.* FROM param as P, hero as H WHERE H.param_id=P.id AND H.id=${id}`
                await db.query(queryParams, async (err, response2) => {
                    if (!err) {
                        const querySkills = `SELECT S.id,S.hero_id,S.name,S.image_link,S.text,S.cooldown FROM skill as S, hero as H WHERE S.hero_id=H.id AND H.id=${id};`
                        await db.query(querySkills, (err, response3) => {
                            if (!err) {
                                const queryLevels = `SELECT L.* FROM levels as L, skill as S WHERE S.id=L.skill_id AND S.hero_id=${id} `
                                db.query(queryLevels, (err, response4) => {
                                    if (!err) {
                                        const queryBuffDebuff = `SELECT B.id, B.name,B.image_link, K.skill_id FROM buffdebuff as B, skill as S, skill_buffdebuff as K WHERE S.id=K.skill_id AND B.id=K.buff_id AND S.hero_id=${id}`
                                        db.query(queryBuffDebuff, (err, response5) => {
                                            res.header({
                                                "Access-Control-Allow-Origin": "*"
                                            })
                                            res.json({
                                                ...response1[0],
                                                param: response2[0],
                                                skills: [...response3.map(skill => {
                                                    return {
                                                        ...skill,
                                                        buffdebuff: response5.filter(item => {
                                                            if (item.skill_id === skill.id) {
                                                                return item
                                                            }
                                                        }),
                                                        levels: response4.filter(level => {
                                                            if (level.skill_id === skill.id) {
                                                                return level
                                                            }
                                                        })
                                                    }
                                                })]
                                            })
                                        })
                                    }
                                })
                            }
                        })

                    }
                })
            }
        })
    }

    async getSkills(req, res) {
        const id = req.params.id
        // const id = req.params.id.replace(/[^0-9]/, "")
        const query = `SELECT S.id,S.name,S.image_link,S.text,S.cooldown FROM hero as H,skill as S WHERE H.id=S.hero_id AND H.id=${id};`
        db.query(query, (req, response) => {
            console.log(response)
            res.header({
                "Access-Control-Allow-Origin": "*"
            })
            res.json(response)
        })
    }
}

module.exports = new HeroesController()