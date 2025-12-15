const 

upload = require ('../middleware/upload'),

  // use the Router module in Express.js
  // This line creates a Router object that offers its own middleware
  // and routing alongside the Express.js app object.
  router = require("express").Router(),

  { PostCreatePack,
    GetListAllPackes,
    GetDeletePackCtrl,
    PutUpdatePackCtrl,
    GetSinglePackCtrl,
    PostDeleteImageCtrl,
    GetSinglePackByCodeCtrl
     } = require('../controllers/packController');
  

router.post('/',upload.single("image"), PostCreatePack);

router.get('/listAll', GetListAllPackes);
//delete Product route
router.delete('/delete-pack/:id', GetDeletePackCtrl);

//delete Image route
router.post('/delete-image', PostDeleteImageCtrl);

//update Pack route
router.put('/update-pack/:id', upload.single("image"), PutUpdatePackCtrl); 

//get Single Pack route
router.get('/get-single-pack/:id', GetSinglePackCtrl);

// Get Single Pack By Code Ctrl route
router.get('/get-single-packbycode/:code', GetSinglePackByCodeCtrl);


module.exports = router;