const fs = require("fs");
const path = require("path");

async function deleteOldImages(imagePaths) {
  for (const filePath of imagePaths) {
    try {
      await fs.promises.unlink(path.join(__basedir, `uploads/${filePath}`));
    } catch (err) {
      console.error(`Failed to delete image at ${filePath}:`, err);
    }
  }
}
async function deleteImages(doc) {
  const imagePaths = doc.images.map((image) => image.url);
  for (const filePath of imagePaths) {
    try {
      await fs.promises.unlink(path.join(__basedir, `uploads/${filePath}`));
    } catch (err) {
      console.error(`Failed to delete image at ${filePath}:`, err);
    }
  }
}

async function uploadImages(type, req) {
  if (req.files[type]) {
    const filenames = req.files[type].map((file) => ({ url: file.filename }));
    req.body[type] = filenames;
  } else {
    console.log(`No files uploaded for type: ${type}`);
  }
}

async function updateAndSet(doc, type, req) {
  const oldImagePaths = doc[type] ? doc[type].map((image) => image.url) : [];
  await uploadImages(type, req);
  doc[type] = req.body[type];
  const newImagePaths = req.body[type]
    ? req.body[type].map((image) => image.url)
    : [];

  const imagesToDelete = oldImagePaths.filter(
    (path) => !newImagePaths.includes(path)
  );
  await deleteOldImages(imagesToDelete);
}

module.exports = { deleteOldImages, deleteImages, uploadImages, updateAndSet };
