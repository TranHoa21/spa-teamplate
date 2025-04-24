import formidable from 'formidable';
import { IncomingMessage } from 'http';
import fs from 'fs';

export const parseForm = (req: IncomingMessage) => {
    const form = new formidable.IncomingForm();

    return new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
            }
            resolve({ fields, files });
        });

        form.on('fileBegin', (name, file) => {
            // Tùy chọn lưu file vào thư mục tạm thời
            const uploadDir = './tmp/uploads'; // Đảm bảo thư mục tồn tại
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            file.filepath = `${uploadDir}/${file.originalFilename}`; // Đổi đường dẫn file
        });
    });
};
