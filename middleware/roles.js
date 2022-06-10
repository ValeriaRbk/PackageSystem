const roleController = require('../controllers/roleController')

module.exports.adminRequired = (req, res, next) => {
    try{
        if(req.session.userRole == 'Administrator'){ next() }
        else{
            res.render('errorCard', {
                layout: 'index', 
                title: 'Account', 
                description: 'У Вас нет к этому доступа',
            });}

    }catch(e){
        console.log(e);
    }
}

module.exports.clientRequired = (req, res, next) => {
    try{
        if(req.session.userRole == 'Client'){ next() }
        else{
            res.render('errorCard', {
                layout: 'index', 
                title: 'Account', 
                description: 'У Вас нет к этому доступа',
            });}

    }catch(e){
        console.log(e);
    }
}

module.exports.staffRequired = (req, res, next) => {
    try{
        if(req.session.userRole == 'Staff'){ next() }
        else{
            res.render('errorCard', {
                layout: 'index', 
                title: 'Account', 
                description: 'У Вас нет к этому доступа',
            });}

    }catch(e){
        console.log(e);
    }
}

module.exports.productsList = (req, res, next) => {
    try{
        if(req.session.userRole == 'Client'){ next() }
        else{
            res.render('errorCard', {
                layout: 'index', 
                title: 'Account', 
                description: 'У Вас нет к этому доступа',
            });}

    }catch(e){
        console.log(e);
    }
}