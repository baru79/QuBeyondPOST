import express from 'express'
import * as planetController from '../controllers/planetController'

const router = express.Router()

router.get('/', planetController.getPlanets)

export default router
