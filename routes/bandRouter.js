const express = require('express')
const bandRouter = express.Router()
const Band = require('../models/bands.js')

//get all request mongoose
bandRouter.get('/', (req, res, next) => {
    Band.find((error, bands) => {
        if(error){
            res.status(500)
            return next(error)
        }
        return res.status(200).send(bands)
    })
})

//get one by id mongoose
bandRouter.get('/:bandId', (req, res, next) => {
    Band.findOne({_id: req.params.bandId}, (error, band) => {
        if(error){
            res.status(500)
            return next(error)
        }
        res.status(200).send(band)
    })
})

//get request by genre mongoose
bandRouter.get('/search/genre', (req, res, next) => {
    Band.find({genre: req.query.genre}, (error, bands) => {
        if(error){
            res.status(500)
            return next(error)
        }
        return res.status(200).send(bands)
    })
})

//post one mongoose
// http://localhost:8000/bands/
bandRouter.post('/', (req, res, next) => {
    const newBand = new Band(req.body)
    newBand.save((error, savedBand) => {
        if(error){
            res.status(500)
            return next(error)
        }
        return res.status(201).send(savedBand)
    })
})

//delete one mongoose
bandRouter.delete('/:bandId', (req, res, next) => {
    Band.findByIdAndDelete({_id: req.params.bandId}, (error, deletedItem) => {
        if(error){
            res.status(500)
            return next(error)
        }
        return res.status(200).send(`You have successfully deleted the band ${deletedItem.artist} from the database`)
    })
})

//put request mongoose
bandRouter.put('/:bandId', (req, res, next) => {
    Band.findByIdAndUpdate(
        {_id: req.params.bandId},
        req.body,
        {new: true},
        (error, updatedband) => {
            if(error){
                res.status(500)
                return next(error)
            }
            return res.status(201).send(updatedband)
        }
    )
})

module.exports = bandRouter