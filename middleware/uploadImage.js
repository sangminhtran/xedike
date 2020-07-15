const multer = require('multer');

const uploadImage = (type)=>{
    const storage = multer.diskStorage({
      destination: function(req, file, cb) {
        // const uploadPath = path.join(__dirname + "../../../upload/avatar");
        cb(null, `./upload/${type}`);
      },
      filename: function(req, file, cb) {
        console.log(file);
        cb(null, Date.now() + "-" + file.originalname);
      }
    });
    
    const upload = multer({ storage: storage });
  
    return upload.single(type);
  }

  module.exports = {
      uploadImage
  }