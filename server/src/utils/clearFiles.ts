import fs from 'fs';
export const clearFiles = (files: string[]): void => {
    files.forEach((image) => {
        fs.unlinkSync(`src/${image}`);
    });
};
