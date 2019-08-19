const express = require('express')

const actionsDb = require('../actionModel.js')
const projectsDb = require('../projectModel.js')

const router = express.Router()

router.get('/', (req, res) => {
    actionsDb.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(error => {
            res.status(500).json({
                message: 'error getting the actions'
            })
        })
})

router.get('/:id/projects', async (req, res) => {
    try {
        const { id } = req.params
        const project = await projectsDb.getProjectActions(id)
        res.status(200).json(project)
    } catch (error) {
        res.status(500).json({
            message: 'there was an error processing the request'
        })
    }
})

router.post('/:id/projects', [checkActions, checkProjId], async (req, res, next) => {
    try {
        const action = {...req.body, project_id: req.params.id}
        const newAction = await actionsDb.insert(action)
        res.status(201).json(newAction)
    } catch (error) {
        res.status(500).json({
            message: 'your request could not be processed'
        })
    }
})

router.put('/:id', [checkActions, checkProjId], async (req, res, next) => {
    try {
        const { id } = req.params
        const body = req.body
        const changes = await actionsDb.update(id, body)
        res.status(200).json(changes)
    } catch (error) {
        res.status(500).json({
            message: 'there was an error updating the action'
        })
    }
})

router.delete('/:id', checkProjId, async (req, res, next) => {
    try {
        const { id } = req.params
        const remove = await actionsDb.remove(id)
        res.status(200).json(remove)
    } catch (error) {
        res.status(500).json({
            message: 'there was an error deleting the action'
        })
    }
})

// Lets Check some things first
function checkActions (req, res, next) {
    if (Object.keys(req.body.description).length > 128) {
        res.status(400).json({
            message: 'description must be less than 128 Characters'
        })
    } else if (!req.body.description) {
        res.status(400).json({
            message: 'a description is required'
        })
    } else if (!req.body.notes) {
        res.status(400).json({
            message: 'missing the notes'
        })
    } else {
        next()
    }
}

function checkProjId (req, res, next) {
    const { id } = req.params

    Project.getProjectActions(id)
        .then(proj => {
            if(proj) {
                req.project_id = proj
                next()
            } else {
                res.status(500).json({
                    message: 'you have entered an invalid id'
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                error: 'error processing request'
            })
        })
}


module.exports = router