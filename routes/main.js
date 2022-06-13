const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const listController = require('../controllers/productListController');
const login = require('../middleware/login');
const roles = require('../middleware/roles');
const { session } = require('passport/lib');


router.get('/', (req, res) => {
    console.log(req.sessionID)
    res.render('main', {layout: 'index', title: 'Shipping'});
});

router.get('/back', (req, res)=>{
    res.redirect('..');
})

//loginRequired - middleware, then acc
router.get('/account', login.loginRequired, userController.renderUser)

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});
;

router
    .route('/authorization')
    .get((req, res) => {
        if(req.session.isAuth){
            res.render('errorCard', {layout: 'index', title: 'Authorization', description: 'Вы уже вошли в систему'})
        }else{ res.render('authorization', {layout: 'index', title: 'Authorization'}); }})
    .post( userController.authorization )


router
    .route('/registration')
    .get((req, res)=>{
        if(req.session.isAuth){
            res.render('errorCard', {layout: 'index', title: 'Authorization', description: 'Вы уже вошли в систему'})
        }else{ res.render('registration', {layout: 'index', title: 'Registration'}); }})
    .post( userController.registration )


router
    .route('/newProduct')
    .get( login.loginRequired, roles.clientRequired, (req, res)=>{
        res.render('newProduct', {layout: 'index', title: 'New Product'});
    })
    .post( productController.addNewProduct )


router.get('/delete', userController.deleteAcc );

router.get('/productList', listController.renderProducts )

router.get('/allUserProducts', roles.clientRequired, listController.renderOwnProducts )
router.get('/cancelUserProducts', roles.clientRequired, listController.renderCancelProducts )
router.get('/refuseUserProducts', listController.renderRefusedProducts )

router.get('/acceptedProductList', roles.staffRequired, listController.renderAcceptedProducts )
router.get('/confirmedProductList', roles.staffRequired, listController.renderConfirmedProducts )
router.get('/cancelProductList', roles.staffRequired, listController.renderCancelProducts )

router.get('/adminProductList', roles.adminRequired, listController.renderAdminProducts )
router.get('/refusedProductList', listController.renderRefusedProducts )

// router
//     .route('/productStaffList')
//     .get( roles.staffRequired, listController.renderStaffProducts )
//     .post( roles.staffRequired, listController.renderStaffProducts)


router
    .route('/detailed')
    .get()
    .post( listController.renderDetailedProduct )


router.post('/adminUpdateProduct', roles.adminRequired, productController.adminUpdateProduct )
router.post('/clientUpdateProduct', roles.clientRequired, productController.clientUpdateProduct )
router.post('/staffUpdateProduct', roles.staffRequired, productController.staffUpdateProduct )

// router.get('/userProductList', userController.updateUser)



module.exports = router;