import type { FileWithPath } from 'react-dropzone';

export function validateFiles(files?: File[] | readonly FileWithPath[]): boolean {
    if (!files || files.length === 0) return true;

    const maxSize = 5 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png'];

    return files.every((file) => allowedTypes.includes(file.type) && file.size <= maxSize);
}
