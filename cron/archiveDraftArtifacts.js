import Artifact from "../models/artifact.js";

export async function archiveDraftArtifacts() {
  try {
    const result = await Artifact.updateMany(
      { status: "DRAFT" },
      { $set: { status: "ARCHIVED" } }
    );
    console.log(`Archived ${result.modifiedCount} draft artifacts.`);
  } catch (error) {
    console.error("Error archiving draft artifacts:", error);
  }
}
