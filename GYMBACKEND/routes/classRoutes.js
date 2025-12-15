const 

upload = require ('../middleware/upload'),

  // use the Router module in Express.js
  // This line creates a Router object that offers its own middleware
  // and routing alongside the Express.js app object.
  router = require("express").Router(),

  { PostCreateClass,
    GetListAllClasses,
    PostDeleteClassCtrl,
    PutUpdateClassCtrl,
    GetSingleClassCtrl,
    PostDeleteImageCtrl,
     } = require('../controllers/classController');
  

router.post('/',upload.single("image"), PostCreateClass);

router.get('/listAll', GetListAllClasses);
//delete Product route
router.delete('/delete-class/:id', PostDeleteClassCtrl);

//delete Image route
router.post('/delete-image', PostDeleteImageCtrl);


//updateProduct route
router.put('/update-class/:id', upload.single("image"), PutUpdateClassCtrl); 

//getSingleProduct route
router.get('/get-single-class/:id', GetSingleClassCtrl);


module.exports = router;