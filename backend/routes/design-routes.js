import express from 'express'
import designCntlr from '../controllers/design-cntlr.js'
import { checkSchema } from 'express-validator';
import designValidation from '../validators/design-validation.js';
import idValidation from '../validators/id-validation.js';
const router = express.Router()

router.post('/designs', checkSchema(designValidation), designCntlr.create);
router.get('/designs/:id', checkSchema(idValidation), designCntlr.getDesign);
router.get('/designs', designCntlr.list);
router.put('/designs/:id', checkSchema(idValidation, designValidation), designCntlr.update)
router.delete('/designs/:id', checkSchema(idValidation), designCntlr.remove)

export default router