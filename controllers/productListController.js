const User = require('../models/User');
const Product = require('../models/Product');

class productListController{
    
    async renderOwnProducts(req, res){
        try{
            const status = ['In processing','Confirmed','Accepted by delivery person','Executed']
            const productList = await findProducts({ user: req.session.userId, completed: false, status: status});
            if(!productList){ return res.redirect('account'); }
        
            return res.render('productList', {layout: 'index', title: 'Shipping', productList: productList });

        }catch(e){ console.log(e); }
    }

    async renderCancelProducts(req, res){
        try{
            const productList = await findProducts({ user: req.session.userId, completed: false, status: 'Cancelled'});
            if(!productList){ return res.redirect('account'); }
            
            return res.render('productList', {layout: 'index', title: 'Shipping', productList: productList });

        }catch(e){ console.log(e); }
    }

    async renderRefusedProducts(req, res){
        try{
            let productList;
            if(req.session.userRole == "Administrator"){
                productList = await findProducts({ completed: false, status: 'Refused'});
            }else if(req.session.userRole == "Client"){
                productList = await findProducts({ user: req.session.userId, completed: false, status: 'Refused'});
            }
            if(!productList){ return res.redirect('account'); }
            
            return res.render('productList', {layout: 'index', title: 'Shipping', productList: productList });

        }catch(e){ console.log(e); }
    }

    async renderProducts(req, res){
        try{
            let productList;
            const user = req.session.userId;

            if(req.session.userRole == 'Administrator'){
                productList = await findProducts({ completed: false });
            }else if(req.session.userRole == 'Client'){
                productList = await findProducts({ user: user });
            }else if(req.session.userRole == 'Staff'){
                productList = await findProducts({ completed: false, deliveryMan: null, status: 'Confirmed' })
            }
            if(!productList){ return res.redirect('account'); }
            
            return res.render('productList', {layout: 'index', title: 'Shipping', productList: productList });


        }catch(e){ console.log(e);}
    }    
    
    async renderAdminProducts(req, res){
        try{
            const status = ['In processing','Confirmed','Accepted by delivery person','Executed']
            const productList = await findProducts({ completed: false, status: status });

            if(!productList){ return res.redirect('account'); }
            
            return res.render('productList', {layout: 'index', title: 'Shipping', productList: productList });


        }catch(e){ console.log(e);}
    }

    async renderAcceptedProducts(req, res){
        try{
            let productList;

            if(req.session.userRole == 'Staff'){
                productList = await findProducts({ completed: false, deliveryMan: req.session.userId, status: 'Accepted by delivery person' });
            }

            if(!productList){ return res.redirect('account') }
            
            console.log(req.url)
            console.log(req.originalUrl )

            // if(action == 'confirm'){
            //     productList[0].accept = false;
            // }else if(action == 'accept'){
            //     productList = await Product.find({ completed: false, deliveryMan: user, status: 'Accepted by delivery person' });
            // }
            
            return res.render('productList', {layout: 'index', title: 'Shipping', productList: productList });

        }catch(e){console.log(e);}
    }

    
    async renderConfirmedProducts(req, res){
        try{
            let productList;
            if(req.session.userRole == 'Staff'){
                productList = await findProducts({ completed: false, deliveryMan: null, status: 'Confirmed' });
            }
            if(!productList){ return res.redirect('account'); }
            
            return res.render('productList', {layout: 'index', title: 'Shipping', productList: productList });

        }catch(e){console.log(e);}
    }

    async renderDetailedProduct(req, res){
        try{
            const product = await Product.find({ _id: req.body.id });
            const currentProductDeliver = await User.findOne({ _id: product[0].deliveryMan });
            const currentProduct = convertList(product);
 
            if(req.session.userRole == 'Administrator'){
                currentProduct[0].admin = true
            }else if(req.session.userRole == 'Client'){
                currentProduct[0].client = true
                if(currentProduct[0].status == 'Cancelled'){
                    currentProduct[0].toCancel = true;
                }
            }else if(req.session.userRole == 'Staff'){
                currentProduct[0].staff = true
                if(currentProductDeliver){
                    if(currentProductDeliver._id == req.session.userId){
                        currentProduct[0].toCancel = true;
                    }
                }
            }

            return res.render('detailed', {layout: 'index', title: 'Detailed', product: currentProduct });

        }catch(e){console.log(e)}
    }
}

async function findProducts(query){
    const productList = await Product.find(query);
    const readyList = convertList(productList)
    return readyList;
}

function convertList(productList){
    let list = [];
    
    productList.forEach((p)=>{
        let product = {}
        product.id = p._id
        product.name = p.name
        product.description = p.description
        product.status = p.status
        product.price = p.price
        product.weight = p.weight
        product.departureDate = p.departureDate
        product.deliveryDate = p.deliveryDate
        product.departurePoint = p.departurePoint
        product.deliveryPoint = p.deliveryPoint
        product.completed = p.completed

        list.push(product);
    })
    return list;
}


module.exports = new productListController();