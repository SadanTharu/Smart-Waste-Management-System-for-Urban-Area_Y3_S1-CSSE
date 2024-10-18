// import paymentModel from "../models/paymentModel";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.SRIPE_SECRET_KEY)

// //bank transfer

// const payBank = async (req,res) => {

//     try {

//         const{residentID, residentName, amount} = req.body;

//         const paymentData ={
//             residentID,
//             residentName,
//             amount,
//             paymentMethod:"Bank Transfer",
//             payment: false,
//             date: Date.now()
//         }

//         const newPayment = new paymentModel(paymentData)
//         await newPayment.save()

//         res.json ({success:true,message:"Payment Placed"})

//     } catch (error) {
//         console.log(error)
//         res.json({success:false, message:error.message})
//     }

// }

// //card payment
// const payCard = async(req,res) =>{
//     try {
        
//         const{residentID, residentName, amount} = req.body;
//         const {origin} = req.headers;

//         const paymentData ={
//             residentID,
//             residentName,
//             amount,
//             paymentMethod:"Card",
//             payment: false,
//             date: Date.now()
//         }

//         const newPayment = new paymentModel(paymentData)
//         await newPayment.save()

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'], // Specify the payment method types
//             line_items: [
//                 {
//                     price_data: {
//                         currency: 'lkr', // Adjust currency as needed
//                         product_data: {
//                             name: 'Payment for Service', // Provide a description
//                         },
//                         unit_amount: amount * 100, // Amount is in cents for Stripe (multiply by 100)
//                     },
//                     quantity: 1,
//                 },
//             ],
//             mode: 'payment',
//             success_url: `${origin}/verify?success=true&paymentID=${newPayment._id}`,
//             cancel_url: `${origin}/verify?success=false&paymentID=${newPayment._id}`,
//         });

//         res.json({success:true,session_url:session.url});

//     } catch (error) {
//         console.log(error)
//         res.json({success:false, message:error.message})
//     }
// }


// //all payments for admin

// const allPayments = async(req,res) =>{

// }

// //update order status from admin

// const updateStatus = async (req,res) =>{

// }

// export {payBank, payCard, allPayments, updateStatus}
