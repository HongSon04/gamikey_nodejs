const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: 'dlpvcsewd',
  api_key: '862668637738348',
  api_secret: 'evsgSN4-RGb40NKOwoQyFmNe3gI',
});

const upload = async (req) => {
  let result = await streamUpload(req);
  return result;
};

const streamUpload = (req) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
};

const uploadCloud = async (req, res, next) => {
  try {
    const result = await upload(req);
    req.body.image = result.secure_url;
    console.log('Helper:' + req.body.image);
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadCloud,
};
