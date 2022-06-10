
class roleController{
    async renderClientAccount(req, res){
        try{
            const user = await User.findOne({ _id: req.session.userId });
            if(user){
                return res.render('account', {
                    layout: 'index', 
                    title: 'Account', 
                    firstname: user.firstname, 
                    lastname: user.lastname,
                    email: user.email,
                    login: user.login,
                    createdTime: user.createdAt,
                    productList: user.listOfProducts,
                    role: user.role
                })
                // return res.render('userAccount', userInfo)
            }

        }catch(e){
            console.log(e);
            res.status(400).json({message: 'User error'})
        }
    }
    

}