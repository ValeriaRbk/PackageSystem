const User = require('../models/User');
const bcrypt = require('bcryptjs');


class userController{
    async registration(req, res){
        try{
            const { login, password, first_name, last_name, role } = req.body;

            console.log(login)
            console.log(password)
            
            const duplicate = await User.findOne({ login }).where('role').equals(role);
            if( duplicate ){
                return res.render('errorCard', {layout: 'index', title: 'Registration', description: `Пользователь с таким логином существует`, reg_action: 'Вернуться'})
            }

            const hashPassword = bcrypt.hashSync(password, 3);

            const user = new User({
                firstname: first_name,
                lastname: last_name,
                role: role, 
                login: login, 
                password: hashPassword,
            });
            if(role == 'Client') { user.listOfProducts = [] }

            await user.save();
            return res.render('successCard', {layout: 'index', title: 'Shipping', message: 'Регистрация прошла успешно'});

        }catch(e){
            console.log(e);
            res.status(400).json({message: 'Registration error'})
        }
    }

    async authorization(req, res){
        try{
            const { login, password, role } = req.body;
            const user = await User.findOne( { login } );

            //redirect to card unsuccess to registration
            if(!user || user.role != role){
                return res.render('errorCard', {layout: 'index', title: 'Authorization', description: `Пользователь ${login} не найден`, action: 'Вернуться'})
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if(!validPassword){
                return res.render('errorCard', {layout: 'index', title: 'Authorization', description: 'Пароль неверный', action: 'Вернуться'})
            }
            
            req.session.userId = user._id;
            req.session.userRole = user.role;
            req.session.isAuth = true;

            console.log(user.role);
            console.log(req.session.userRole);

            //redirect
            return res.render('successCard', {layout: 'index', title: 'Shipping', message: 'Авторизация прошла успешно'});

        }catch(e){
            console.log(e);
            res.status(400).json({message: 'Authorization error'})
        }
    }

    async deleteAcc(req, res){
        try{
            const user = await User.findOne({ _id: req.session.userId });
            
            if(user){ 
                console.log(user)
                User.deleteOne({ _id: user._id }, ()=>
                {
                    console.log("Deleted successful")
                }) 
            };
            
            req.session.destroy();

            return res.render('successCard', {layout: 'index', title: 'Shipping', message: 'Аккаунт удален'});

        }catch(e){
            console.log(e);
            res.status(400).json({message: 'Delete error'})
        }
    }

    async renderUser(req, res){
        try{
            const user = await User.findOne({ _id: req.session.userId });
            if(user){
                const userInfo = {
                    layout: 'index', 
                    title: 'Account', 
                    firstname: user.firstname, 
                    lastname: user.lastname,
                    email: user.email,
                    login: user.login,
                    createdTime: user.createdAt,
                    productList: user.listOfProducts,
                    role: user.role,
                    admin: false,
                    staff: false,
                    client: false,
                }
                if(user.role == 'Client'){ userInfo.client = true }
                else if(user.role == 'Staff') { userInfo.staff = true }
                else{ userInfo.admin = true }
                
                return res.render('account', userInfo)

                // return res.render('userAccount', userInfo)
            }

        }catch(e){
            console.log(e);
            res.status(400).json({message: 'User error'})
        }
    }

    async updateUser (req, res) {
        try{
            

            
        }catch(e){
            console.log(e);
            res.status(400).json({message: 'Update error'})
        }
    }   
    
    
    //loginRequired


}





module.exports = new userController();