import * as planetService from '../services/planetService'
import { type Request, type Response } from 'express'

export const getPlanets = (req: Request, res: Response): void => {
	try {
		planetService
			.getPlanets(req.query)
			.then(result => res.status(200).json(result))
			.catch(err => res.status(500).send(err))
		return
	} catch (error) {
		res.status(500).send({ status: 'FAILED', data: { error } })
	}
}
