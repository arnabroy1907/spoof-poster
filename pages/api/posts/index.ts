import type { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '../../../service/models';
import { getAllPosts } from '../../../service/db/dummy-data';
import * as uuid from 'uuid';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<object|Post[]>
) => {
    try {
        if (req.method === 'GET') {
            const posts = await getAllPosts(50);
            res.status(200).json(posts);
            return;
        }

        if (req.method === 'POST') {
            setTimeout(() => {
                res.status(201).json({
                    postId: uuid.v4(),
                });
            }, 100);
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