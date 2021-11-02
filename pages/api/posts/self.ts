import type { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '../../../service/models';
import { getPostsByUser } from '../../../service/db/dummy-data';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<object|Post[]>
) => {
    try {
        if (req.method === 'GET') {
            const posts = await getPostsByUser('21490993-8c96-4709-9ec6-31df9e30589e');
            res.status(200).json(posts);
            return;
        }

        res.status(405).json({
            error: `${req.method?.toLocaleUpperCase()} Method Not Allowed!`
        });
        return;
    } catch (err) {
        console.error(err);
        return;
    }
};

export default handler;