import Comment from "../models/comment.js";

export const addCommentService = async (data) => {
    const { artifactId, userId, text } = data;
    if(!text) {
        throw new Error("Text is required");
    }
    
    return await Comment.create({
        artifact: artifactId,
        user: userId,
        text
    });
}

export const getCommentsService = async (artifactId) => {
    return await Comment.find({ artifact: artifactId })
    .populate("user","name")
    .sort({ createdAt: -1 });
}
