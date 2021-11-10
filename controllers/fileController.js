import { userService } from "../services";
import multer from 'multer';
import multerS3 from 'multer-s3';
import env from 'dotenv';
import Jimp from 'jimp';

env.config();

import { awsService } from '../services';

const { AWS_UPLOAD_BUCKET, AWS_UPLOAD_FOLDER } = process.env;

const upload = multer({
  limits: {
    files: 1,
    fileSize: 40 * 1024 * 1024,
  },
  storage: multerS3({
    s3: awsService.s3,
    bucket: `${AWS_UPLOAD_BUCKET}/${AWS_UPLOAD_FOLDER}`,
    metadata:function(req, file, cb) {
      cb(null, Object.assign({}, req.body));
    },
    key: function(req, file, cb) {
      cb(null, `${Date.now().toString()}_${file.originalname}`);
    },
  }),
});

const add = async function(req, res) {
  try {
    await userService.update({ id:req.user.id, profileImg:req.file.location})
    return res.status(200).send({
      status: 'OK',
      location: req.file.location,
    });
  } catch (error) {
    return res.status(500).send({
      status: 'ERROR',
      message: 'There was problem uploading file.',
    });
  }
};

const deleteFile = async function(req, res) {
  try {
    await awsService.s3.deleteObject({
      Bucket: `${AWS_UPLOAD_BUCKET}/${AWS_UPLOAD_FOLDER}`,
      Key: req.body.fileUrl,
    });
    return res.status(200).send({ status: 'OK' });
  } catch (error) {
    return res.status(500).send({
      status: 'ERROR',
      message: 'There was problem deleting file.',
    });
  }
};

const processImage = async (file) => {
await Jimp.read(Buffer.from(file.buffer, 'base64'))
                          .then( async file => {
                            file.resize(Jimp.AUTO, 900);
                            return file.getBufferAsync(Jimp.AUTO);
                          })
                          .catch( e => {
                             throw Error(e.message);
                          })
                        }

export { upload, add, deleteFile };
