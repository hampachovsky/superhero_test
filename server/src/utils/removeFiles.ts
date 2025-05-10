import fs from 'fs';
export const removeFiles = (files: Express.Multer.File[]) => {
  if (files) {
    (files as Express.Multer.File[]).forEach((file: Express.Multer.File) => {
      fs.unlinkSync(file.path);
    });
  }
};
