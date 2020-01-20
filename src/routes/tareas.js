const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('tareas-db', ['tarea']);
const ObjectID = require('mongodb').ObjectID;

router.get('/tareas', (req, res, next) => {
    db.tarea.find((err, tareas) => {
        console.log(tareas);
        if (err) return next(err);
        res.json(tareas);
    });
});

router.get('/tareas/:id', (req, res, next) => {
    db.tarea({_id: mongojs.ObjectId(req.params.id)}, (err, tarea) => {
        if (err) return next(err);
        res.json(tarea);
    });
});

router.post('/tareas', (req, res, next) => {
    const tarea = req.body;
    
    if(!tarea.title || !(tarea.isDone + '')) {
        res.status(400).json ({
            error: 'Sin data'
        });
    } else {
        db.tarea.save(tarea, (err, tarea) => {
            if (err) return next(err);
            res.json(tarea);
        })
    }
});

router.delete('/tareas/:id', (req, res, next) => {
    db.tarea.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result) => {
        if (err) return next(err);
        res.json(result);
    });
});

router.put('/tareas/:id', (req, res, next) => {
    const tarea = req.body;
    
    if (!tarea) {
        res.status(400).json({
            error: 'Bad request'
        });
    } else {
        db.tarea.updateOne(
            { _id: new ObjectID(req.params.id) },
            { $set: { title: tarea.title, isDone: tarea.isDone } },
            { upsert: true },
            (err, tarea) => {
                console.log(err)
                if (err) return next(err);
                res.json(tarea);
            }
        );
    }
}); 
module.exports = router;
