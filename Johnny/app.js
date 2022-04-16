const express = require('express');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

app.use(express.static("public"));

app.set('view engine', 'ejs');
app.use(express.json());

app.get('/', (req, res) => res.render('homepage'));

const storeItems = new Map([
    [1,{priceInCents: 200000, name: 'Yeezy Boost 350 V2'}],
    [2, {priceInCents:200000, name: 'Yeezy Boost 350 V2'}],
    [3, {priceInCents:200000, name: 'Yeezy Boost 700 V2'}],
    [4, {priceInCents:200000, name: 'Yeezy Boost 350 V2'}],
    [5, {priceInCents:200000, name: 'Yeezy Boost 350 V2'}],
    [6, {priceInCents:200000, name: 'Yeezy Boost 350 V2'}]
]);

app.post('/create-checkout-session',async (req,res) =>{

    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode: `payment`,
            line_items: req.body.items.map(items => {
                const storeItem = storeItems.get(items.id)
                return{
                    price_data: {
                        currency:'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents  //always use price in cents for stripe 
                    },
                    quantity: items.quantity
                }
            }),
            success_url:`${process.env.SERVER_URL}`,
            cancel_url: `${process.env.SERVER_URL}`

        })
        res.json({url:session.url})
    }catch(e){
        res.status(500).json({ error: e.message })
    }
    
})

app.listen(port, console.log(`server started on ${port}`));