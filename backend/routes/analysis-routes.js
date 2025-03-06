import express from 'express'
import analysisCntlr from '../controllers/analysis-cntlr.js'

const router = express.Router()

router.post('/analysis/calculate', analysisCntlr.calculate)

export default router