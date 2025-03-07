import express from 'express'
import analysisCntlr from '../controllers/analysis-cntlr.js'

const router = express.Router()

router.post('/analysis/calculate', analysisCntlr.calculate)
router.get('/analysis/compare', analysisCntlr.compare)
router.get('/analysis/cities', analysisCntlr.cityWiseRankings)

export default router