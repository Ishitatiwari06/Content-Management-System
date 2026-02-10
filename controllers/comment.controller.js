import { addCommentService, getCommentsService } from "../services/comment.service.js";

export const addComment = async (req, res) => {
    try {
        const artifactId = req.params.id;
        const userId = req.user.id;
        const { text } = req.body;
        const comment = await addCommentService({ artifactId, userId, text });
        return res.status(201).json(comment);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const getComments= async (req, res) => {
    try {
        const comments = await getCommentsService(req.params.id);
        return res.status(200).json({
            success: true,
             comments
    });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};