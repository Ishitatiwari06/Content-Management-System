import artifact from "../models/artifact.js";

export const createArtifactService = async (data) => {
    const { title, content, userId } = data;
    
    if(!title || !content) {
        throw new Error("Title and content are required");
    }

    const newArtifact = await artifact.create({
        title,
        content,
        author: userId
    });
    return newArtifact;
};

export const getArtifactsService = async ({ userId, role }) => {
  if (role === "ADMIN") {
    // Admin sees everything
    return await Artifact.find().populate("author", "name email role");
  }

  // Non-admin sees only their own artifacts
  return await Artifact.find({ author: userId });
};