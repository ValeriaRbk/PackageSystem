const Product = require('../models/Product');
const { findOneAndUpdate } = require('../models/User');
const User = require('../models/User');

class productController{
    async addNewProduct(req, res){
        try{
            const { name, description, price, weight, departureDate, departurePoint, deliveryPoint } = req.body;
            const estimatedDate = new Date(new Date(departureDate).setHours(24 * 15));
            const currentUser = await User.findOne({ _id: req.session.userId });
            

            const product = new Product({
                name: name,
                description: description,
                status: 'In processing',
                price: price,
                weight: weight,
                departureDate: departureDate,
                deliveryDate: estimatedDate,
                departurePoint: departurePoint,
                deliveryPoint: deliveryPoint,
                completed: false,
                user: currentUser,
                deliveryMan: null
            })
        
            await product.save();
            return res.render('successCard', {layout: 'index', title: 'Shipping', message: 'Новая посылка успешно создана'})

        }catch(e){
            console.log(e);
            res.status(400).json({ message: 'Error' })
        }
    }

    async clientUpdateProduct(req, res){
        try{
            const action = req.body.btn;

            if(action == 'cancel'){
                await findAndUpdate({ _id: req.body.id}, {status: 'Cancelled' })
            }else if(action == 'restore'){
                // update info from user
                await findAndUpdate({ _id: req.body.id}, {status: 'In processing' })
            }
            return res.redirect('/productList')

        }catch(e){
            console.log(e)
            res.status(400).json({ message: 'Error' })
        }
    }
    
    async adminUpdateProduct(req, res){
        try{
            const action = req.body.btn;

            if(action == 'confirm'){
                await findAndUpdate({ _id: req.body.id}, {status: 'Confirmed' })
            }
            else if(action == 'refused'){
                await findAndUpdate({ _id: req.body.id}, {status: 'Refused' })
            }
            return res.redirect('/productList')

        }catch(e){
            console.log(e)
            res.status(400).json({ message: 'Error' })
        }
    }

    async staffUpdateProduct(req, res){
        try{
            const action = req.body.btn;
            
            if(action == 'accept'){
                await findAndUpdate({_id: req.body.id}, {status: 'Accepted by delivery person', deliveryMan: req.session.userId})
            }else if(action == 'cancel'){
                await findAndUpdate({ _id: req.body.id}, {status: 'Confirmed', deliveryMan: null })
            }
            return res.redirect('/productList')
            
        }catch(e){
            console.log(e);
            res.status(400).json({ message: 'Error' })
        }
    }
    
}


async function findAndUpdate(query, update){
    await Product.findOneAndUpdate(query, update)
}

module.exports = new productController();
