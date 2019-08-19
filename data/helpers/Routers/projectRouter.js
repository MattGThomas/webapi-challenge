const express = require('express')

const projectDb = require('../projectModel.js')
const router = express.Router()

router.get('/', (req, res) => {
    projectDb.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            res.status(500).json({
                message: 'error getting the projects'
            })
        })
})

// more middleware :)
function checkProj (req, res, next) {
    if(!req.body.name && !req.body.description) {
        res.status(400).json({
            message: 'missing request body'
        })
    } else if(!req.body.name) {
        res.status(400).json({
            message: 'the name field is required'
        })
    } else if(!req.body.description) {
        res.status(400).json({
            message: 'a description is required'
        })
    } else {
        next()
    }
}
module.exports = router