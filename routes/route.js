const db = require('../db-connection');
var models = require('../models');
const multer = require('multer');
var express = require('express');
const path = require('path');
const fs = require('fs')
const XLSX = require('xlsx');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const {or, and, gt, lt} = Sequelize.Op;

const DIR = 'uploads';
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({storage: storage});

/*******************************************/
let storageXLS = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let uploadXLS = multer({storage: storage});

var router = express.Router();

// respond with "hello world" when a GET request is made to the homepage
router.post('/register', function (req, res, next) {
    let user = req.body.user
    console.log(user);
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    models.User.findOne({where: {[or]: [{name: user.name}, {email: user.email}]}}).then((result) => {
        if (result) {
            res.status(400).send('Ce utilisateur existe déjà');
        }
        models.User.create(user).then((user) => {
            res.json({
                done: true,
                msg: 'le compte d\'utilisateur a été créée avec succès'
            })
        }).catch((e) => {
            res.status(400).send({msg: e.message});
        })
    }).catch((err) => {
        res.status(400).json({'msg': err.message});
    })
});
router.post('/user/store', function (req, res) {
    let user = req.body.user;
    models.User.create(user)
        .then(data => {
            res.json({data: data})
        })
        .catch(e => {
            console.log(e.message);
        })

});
router.get('/users', function (req, res) {
    models.User.findAll()
        .then(data => {
            res.json({users: data})
        })
        .catch(e => {
            console.log(e.message);
        })
});
router.put('/user/:id', function (req, res) {
    let user = req.body.user;
    let id = req.params.id;
    models.User.update(user, {
        where: {id: id}
    })
        .then(data => {
            res.json({data: data})
        })
        .catch(e => {
            console.log(e.message);
        })

});
router.delete('/user/:id', function (req, res) {
    console.log('asa');
    models.User.destroy({
        where: {id: req.params.id}
    })
        .then(data => {
            models.User.findAll().then((data) => {
                res.json({
                    result: true,
                    data: data
                });
            })

        })
        .catch(e => {
            res.json({result: false})
        })
});
// restaurant Route
router.get('/resto', function (req, res) {
    models.Resto.findAll()
        .then(data => {
            res.json({resto: data})
        })
        .catch(e => {
            console.log(e.message);
        })
});
router.post('/resto/store', function (req, res) {
    let resto = req.body.resto;
    models.Resto.create(resto)
        .then(data => {
            res.json({data: data})
        })
        .catch(e => {
            console.log(e.message);
        })

});
// restaurant Route
router.get('/plats/:id', function (req, res) {
    models.Plat.findAll({
        where: {id_resto: req.params.id}
    })
        .then(data => {
            res.json({plat: data})
        })
        .catch(e => {
            console.log(e.message);
        })
});
router.post('/plat/store', function (req, res) {
    let plat = req.body.plat;
    models.Plat.create(plat)
        .then(data => {
            res.json({data: data})
        })
        .catch(e => {
            console.log(e.message);
        })

});
// upload image
router.post('/upload', upload.single('image'), function (req, res, next) {
    if (req.file) {
        res.json(req.file);
    }
    else throw 'error';
});
router.get('/getImage/:path', function (req, res) {
    let path = req.params.path;
    if (path) {
        return res.sendFile(path.toString(), {root: 'uploads/'});
    }
    else throw 'error';
})
router.delete('/deleteImage/:path', function (req, res) {
    let path = req.params.path;
    fs.unlink('uploads/' + path.toString(), (err) => {
        if (err) {
            console.error(err)
            return
        }
        else {
            res.send({
                status: "200",
                response: "success"
            });
        }
        ;
    });

});
/***********************************/

router.get('/getexcel/:path', function (req, res) {
    var workbook = XLSX.readFile('./LESLIVRESDEDIRECTEUR.xlsx');
    var nsWorksheet = workbook.SheetNames;
    let data = XLSX.utils.sheet_to_json(workbook.Sheets[nsWorksheet[0]]);
    //return res.send(data);
    let category1 = '';
    let category2 = 'cat2';
    let livres = [];
    for (let i = 0; i < data.length; i++) {
        let ref = data[i].ref.split('.');
        ref = ref[1].split('/');
        category1 = ref[0];
        if (category1 != category2) {
            models.Category.create({name: category1})
            category2 = category1;
        }
        if (i == data.length - 1) {
            setTimeout(() => {
                for (let j = 0; j < data.length; j++) {
                    let ref = data[i].ref.split('.');
                    ref = ref[1].split('/');
                    db.query(`INSERT INTO livres (name,qnt,ref,id_categorie)
                     VALUES ("${data[j].name}",1,null,(SELECT id from categories WHERE name="${ref[0]}"))`);
                }
            }, 10000);
        }
    }
});

router.get('/Livres', passport.authenticate('jwt', {session: false}), function (req, res) {
    db.query(`SELECT L.id,L.name,L.qnt,c.name as ref , L.qnt- IFNULL(E.qntCmd,0) as disp FROM livres L 
    LEFT join categories c on c.id= l.id_categorie 
    left join (select count(*) as qntCmd,E.idLivre 
    from empruntes E GROUP BY E.idLivre) E on L.id = E.idLivre 
    ORDER BY l.id desc`, {type: db.QueryTypes.SELECT})
        .then(data => {
            res.json({livres: data})
        })
        .catch(e => {
            console.log(e.message);
        })
});

router.post('/livre/store', function (req, res) {
    let livre = req.body.livre;
    models.Livre.create({
        name: livre.name,
        id_categorie: livre.category,
        qnt: livre.qnt
    })
        .then(data => {
            res.json({data: data})
        })
        .catch(e => {
            console.log(e.message);
        })

});

router.delete('/delete/livre/:id', function (req, res) {
    console.log(req.params.id)
    models.Livre.destroy({where: {id: req.params.id}})
        .then(() => {
            res.send(true)
        })
        .catch(e => {
            res.send(false)
        })
});
/*****category*******/
router.get('/Categorys', function (req, res) {
    models.Category.findAll({
        order: [['id', 'DESC']]
    })
        .then(data => {
            res.json({category: data})
        })
        .catch(e => {
            console.log(e.message);
        })
});
router.post('/category/store', function (req, res) {
    models.Category.create(req.body.category)
        .then(data => {
            res.send(true)
        })
        .catch(e => {
            res.send(false)
        })
});
router.put('/category/update/:id', function (req, res) {
    models.Category.update(req.body.category,
        {where: {id: req.params.id}})
        .then(() => {
            res.send(true)
        })
        .catch((e) => {
            res.send(false)
        })
});
router.delete('/category/delete/:id', function (req, res) {
    models.Category.destroy({where: {id: req.params.id}})
        .then(() => {
            res.send({delete: true});
        })
        .catch((e) => {
            res.send({delete: false, msg: e.message});
        })
});
/*********Emprunteur********/
router.get('/emprunteur/:id', function (req, res) {
    models.emprunteur.findOne({
        where: {id: req.params.id}, include: 'emprunte'
    })
        .then(data => {
            res.json({emprunteur: data})
        })
        .catch(e => {
            console.log(e.message);
        })
});
router.get('/emprunteurs', function (req, res) {
    models.emprunteur.findAll({
        include: [
            {association: 'etablis', attributes: ['id', 'name']},
            {association: 'filiere', attributes: ['id', 'name']}
        ],
        order: [['id', 'DESC']]
    })
        .then(data => {
            res.json({emprunteurs: data})
        })
        .catch(e => {
            console.log(e.message);
        })
});
router.post('/emprunteur/store', function (req, res) {
    models.emprunteur.create(req.body.emprunteur)
        .then(data => {
            res.send(data)
        })
        .catch(e => {
            res.send(false)
        })
});
router.post('/emprunteur/update/:id', function (req, res) {
    console.log(req.body.emprunteur, req.params.id);
    models.emprunteur.update(req.body.emprunteur,
        {where: {id: req.params.id}})
        .then(() => {
            res.send(true)
        })
        .catch(e => {
            res.send(false)
        })
});
router.delete('/emprunteur/delete/:id', function (req, res) {
    models.emprunteur.destroy({where: {id: req.params.id}})
        .then(() => {
            res.send({delete: true});
        })
        .catch((e) => {
            console.log(e.message);
            res.send({delete: false, msg: e.message});
        })

})
/*********Etablissement********/
router.get('/etablissements', function (req, res) {
    models.Etablissement.findAll()
        .then(data => {
            res.json({etablissements: data})
        })
        .catch(e => {
            console.log(e.message);
        })
});
router.post('/etablissement/store', function (req, res) {
    models.Etablissement.create(req.body.etablissement)
        .then(data => {
            res.send(true)
        })
        .catch(e => {
            res.send(false)
        })
});

/*********Filiere********/
router.get('/filieres/:idetablis', function (req, res) {
    models.Filiere.findAll({
        where: {idetablis: req.params.idetablis}
    })
        .then(data => {
            res.json({filieres: data})
        })
        .catch(e => {
            console.log(e.message);
        })
});
router.post('/filiere/store', function (req, res) {
    let data = req.body.filiere;
    models.Filiere.create(data)
        .then(data => {
            if (data != null) {
                res.send(data)
            }
        })
        .catch(e => {
            res.send(false)
        })
});
/*********Emprunte********/
router.get('/emprunte/:id', function (req, res) {
    models.emprunte.findOne({
        where: {id: req.params.id}
    })
        .then(data => {
            res.json({emprunte: data})
        })
        .catch(e => {
            console.log(e.message);
        })
});
router.get('/empruntes', function (req, res) {
    models.emprunte.findAll({
        include: ['Emprunteur', 'Livre'],
        order: [['createdAt', 'desc']]
    })
        .then(data => {
            res.json({empruntes: data})
        })
        .catch(e => {
            console.log(e.message);
        })
});
router.post('/emprunte/store', function (req, res) {
    models.emprunte.create(req.body.emprunte)
        .then(data => {
            res.send(true)
        })
        .catch(e => {
            res.send(false)
        })
});
router.post('/emprunte/update/:id', function (req, res) {
    console.log(req.body.emprunte);
    models.emprunte.update(req.body.emprunte,
        {where: {id: req.params.id}})
        .then(() => {
            res.send(true)
        })
        .catch(e => {
            res.send(false)
        })
});
router.delete('/emprunte/delete/:id', function (req, res) {
    models.emprunte.destroy({where: {id: req.params.id}})
        .then(() => {
            res.send({delete: true});
        })
        .catch((e) => {
            console.log(e.message);
            res.send({delete: false, msg: e.message});
        })

})
/******** upload XLS ******/
router.post('/uploadxls/category', uploadXLS.single('file'), function (req, res, next) {
    if (req.file) {
        var workbook = XLSX.readFile('./uploads/' + req.file.filename);
        var nsWorksheet = workbook.SheetNames;
        let data = XLSX.utils.sheet_to_json(workbook.Sheets[nsWorksheet[0]]);
        models.Category.bulkCreate(data, {returning: true})
            .then(() => {
                res.send(true);
            })
            .catch((e) => {
                res.send(false);
            })
    }
    else throw 'error';
});
router.post('/uploadxls/book', uploadXLS.single('file'), function (req, res, next) {
    if (req.file) {
        var workbook = XLSX.readFile('./uploads/' + req.file.filename);
        var nsWorksheet = workbook.SheetNames;
        let data = XLSX.utils.sheet_to_json(workbook.Sheets[nsWorksheet[0]]);
        models.Livre.bulkCreate(data, {returning: true})
            .then(() => {
                res.send(true);
            })
            .catch(() => {
                res.send(false);
            })
    }
    else throw 'error';
});

/****** auth *******/
router.post('/login', function (req, res) {
    const {email, password} = req.body.user;

    if (email && password) {
        models.User.findOne({where: {email: email}}).then(async (user) => {
            if (!user) {
                res.send({done: false, msg: 'Aucun utilisateur trouvé'});
            } else {
                const isCompare = await bcrypt.compare(password, user.password);
                if (isCompare) {
                    let payload = {id: user.id, email: user.email, username: user.username};
                    let token = jwt.sign(payload, 'todo-app-super-shared-secret', {expiresIn: '2h'});
                    res.status(201).send({done: true, token: token});
                } else {
                    res.json({done: false, msg: 'Mot de passe incorrect'});
                }
            }
        });
    }
});

module.exports = router;

