const db = require('../DB')

class ArtifactsController{
    async getAllArtifactsIcons(req, res) {
        const query = `SELECT * FROM sets`
        db.query(query, (req, response) => {
            res.header({
                "Access-Control-Allow-Origin": "*"
            })
            res.json(response)
        })
    }
    async getSet(req,res){
        const id = req.params.id
        const query = `SELECT * FROM equipments WHERE set_id=${id}`
        db.query(query, (req, response) => {
            res.header({
                "Access-Control-Allow-Origin": "*"
            })
            res.json(response)
        })
    }
}

module.exports = new ArtifactsController()