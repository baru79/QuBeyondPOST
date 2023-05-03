import express from 'express'
import planetRouter from './routes/planetRouter'
import cors from 'cors'

const PORT = 3001

const app = express()

app.use(express.json())

app.use(
	cors({
		origin: '*',
	})
)

app.use('/api/planets', planetRouter)

app.listen(PORT, () => {
	console.info(`Server running on PORT ${PORT}`)
})
