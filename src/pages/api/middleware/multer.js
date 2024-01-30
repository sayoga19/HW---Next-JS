import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, Date.now() + '-' + fileName);
  }
});

const upload = multer({
  storage: storage, limits: { fileSize: 10000000 } // 10MB limit
});

export default upload;
