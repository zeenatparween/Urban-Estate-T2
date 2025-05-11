import path from "path";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

export const uploadSingle = (dir, fieldName) => {
    const absolutePath = path.resolve(dir);

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, absolutePath);
        },

        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));
        },
    });

    const upload = multer({ storage });

    return upload.single(fieldName);
};

export const uploadMultiple = (dir, fieldName) => {
    const absolutePath = path.resolve(dir);

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, absolutePath);
        },

        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));
        },
    });

    const upload = multer({ storage });

    return upload.array(fieldName, 10);
};
