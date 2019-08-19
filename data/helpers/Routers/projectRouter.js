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

router.post('/', checkProj, async (req, res, next) => {
    try {
        const body = req.body
        const newProject = await projectDb.insert(body)
        res.status(201).json(newProject)
    } catch (error) {
        res.status(500).json({
            message: 'there was an error adding the project'
        })
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const projChanges = req.body
        const change = await projectDb.update(id, projChanges)
        res.status(200).json(change)
    } catch (error) {
        res.status(500).json({
            message: 'there was an error changing the projet'
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const remove = await projectDb.delete(id)
        res.status(200).json(remove)
    } catch (error) {
        res.status(500).json({
            message: 'there was an error deleting the project'
        })
    }
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