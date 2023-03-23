import cloudinary from "cloudinary";
import multer from "multer";

const cloudinaryv2 = cloudinary.v2;


cloudinaryv2.config({
    cloud_name: 'dkahvlzze',
    api_key: '257882253418781',
    api_secret: 'pchtOuw44t1kP03HnCweRNHkugU'
})
const upload = multer({ storage: multer.memoryStorage(), limits: {
    fileSize: 1024 * 1024 * 5 // límite de 5MB
  }});

export {cloudinaryv2};
export {upload}