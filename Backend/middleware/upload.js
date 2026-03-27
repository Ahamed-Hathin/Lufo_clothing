import multer from "multer";

// Use memory storage — we'll upload to Cloudinary manually in the controller
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
    fileFilter: (req, file, cb) => {
        const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only jpg, png, webp images are allowed'), false);
        }
    }
});

export default upload;
