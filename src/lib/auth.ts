import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';

export function verifyToken(req: Request) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return null;

    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded as { userId: string; role: string };
    } catch (error) {
        console.log("check err >>>", error)
        return null;
    }
}
