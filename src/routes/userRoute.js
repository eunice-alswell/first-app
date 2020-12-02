const {Router} = require('express')

const router = Router()

const {
    createUser,
    getUserDetails,
    UpdateUserDetail,
    deleteUserDetails
} = require('../controllers/userController')


//route for creating and account
router.post('/api/user/new',createUser)

//route for getting an ccount details

router.get('/api/user/username',getUserDetails)

//route for updating an account details
router.put('/api/user/update',UpdateUserDetail)

//route for deleting an account 
router.delete('/api/user/delete',deleteUserDetails)

module.exports = router