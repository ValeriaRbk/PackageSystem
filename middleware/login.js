

module.exports.loginRequired = (req, res, next) => {

    try{
        if(req.session.isAuth){ next() }
        else{
            res.render('errorCard', {
                layout: 'index', 
                title: 'Account', 
                description: 'Сначала Вам нужно авторизоваться',
                action: 'Войти' 
            });
        }

    }catch(e){
        console.log(e);
    }
}

module.exports.logout = (req, res, next) => {
    try{
        if(req.session.isAuth){ next() }
        // next();
    }catch(e){
        console.log(e);
    }
}



