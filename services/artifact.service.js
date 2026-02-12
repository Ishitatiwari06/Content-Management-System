import artifact from "../models/artifact.js";
import cloudinary from "../config/cloudinary.js";
import FileSystem from "fs";
export const createArtifactService = async (data) => {
    const { title, content, userId,filePath } = data;
    if(!title || !content) {
        throw new Error("Title and content are required");
    }
    let mediaUrl=null
    if(filePath){
      const uploadResult=await cloudinary.uploader.upload(
        filePath,
        {
          folder:"cms-artifacts"
        }
      );
      mediaUrl=uploadResult.secure_url
      FileSystem.unlinkSync(filePath);
    }
    const newArtifact = await artifact.create({
        title,
        content,
        author: userId,
        media: mediaUrl || null
    });
    return newArtifact;
};

export const getArtifactsService = async ({ userId, role }) => {
  if (role === "ADMIN") {
    // Admin sees everything
    return await artifact.find().populate("author", "name email role");
  }

  // Non-admin sees only their own artifacts
  return await artifact.find({ author: userId });
};