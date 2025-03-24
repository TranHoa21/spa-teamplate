import { IncomingForm, Files, Fields } from 'formidable';
import type { IncomingMessage } from 'http';

export function parseForm(req: IncomingMessage): Promise<{ fields: Fields; files: Files }> {
    return new Promise((resolve, reject) => {
        const form = new IncomingForm({ multiples: true, keepExtensions: true });
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
}
