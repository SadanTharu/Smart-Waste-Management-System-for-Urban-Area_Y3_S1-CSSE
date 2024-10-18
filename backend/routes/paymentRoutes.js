import express from 'express'
import {payBank, payCard, allPayments, updateStatus} from '../controllers/paymentController.js'

const paymentRouter = express.Router()

//admin features
paymentRouter.post('/list', allPayments)
paymentRouter.post('/status', updateStatus)

//payment features
paymentRouter.post('bank',payBank)
paymentRouter.post('card', payCard)


export default paymentRouter