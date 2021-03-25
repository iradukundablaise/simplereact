const {Client} = require('pg');
const squel = require("squel");
const config = require('../config');
const client = new Client({
    connectionString: process.env.DATABASE_URL || config.dbstring,
    ssl: {
      rejectUnauthorized: false
    }
});
client.connect();

module.exports = {
    index: (req, res) => {
        let query = squel
            .select()
            .from('omar.users')
            .toString();

        client.query(query, (err, results) => {
            let data = {}
            if(!err){
                data['status'] = 'ok';
                data['rows'] = results.rowCount;
                data['users'] = results.rows;
            }else{
                data['status'] = 'error';
            }
            res.status(200).json(data);
        })
    },

    create: (req, res) => {
        let query = squel.insert()
            .into('omar.users')
            .set('nom', req.body.nom)
            .set('prenom', req.body.prenom)
            .set('telephone', req.body.telephone)
            .set('sexe', req.body.sexe)
            .set('adresse', req.body.adresse)
            .set('poste', req.body.poste)
            .set('age', parseInt(req.body.age))
            .toString();

        client.query(query, (err, results) => {
            let data = {}
            if(!err){
                data["status"] = "ok";
                data["rowCount"] = results.rowCount;
            }else{
                data["status"] = "error";
            }
            res.status(200).json(data);
        });
    },

    find: (req, res) => {
        let query = "SELECT * FROM omar.users WHERE id='"+req.params.id+"';";
        client.query(query, (err, results) => {
            let data = {}
            if(!err){
                data['status'] = 'ok';
                data['rows'] = results.rowCount;
                if(results.rows.length){
                    data['user'] = results.rows[0]
                }
            }else{
                data['status'] = 'error';
            }
            res.status(200).json(data);
        });        
    },

    update: (req, res) => {
        let query = squel.update()
            .set('nom', req.body.nom)
            .set('prenom', req.body.prenom)
            .set('telephone', req.body.telephone)
            .set('sexe', req.body.sexe)
            .set('adresse', req.body.adresse)
            .set('poste', req.body.poste)
            .set('age', req.body.age)
            .where("id="+req.params.id)
            .toString();

        client.query(query, (err, results) => {
            let data = {};
            if(!err){
                data["status"] = "ok";
                data["rowCount"] = results.rowCount;
            }else{
                data["status"] = "error";
            }
            res.status(200).json(data);
        });
    },

    destroy: (req, res) => {
        let query = squel.delete()
            .from('omar.users')
            .where("id="+req.params.id)
            .toString();
        client.query(query, (err, results) => {
            let data = {}
            if(!err){
                data['status'] = 'ok';
                data['rowCount'] = results.rowCount;
            }else{
                data['status'] = 'error';
            }
            res.status(200).json(data);
        }); 
    }
}