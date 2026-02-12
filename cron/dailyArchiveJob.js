import cron from "node-cron";
import { archiveDraftArtifacts } from "./archiveDraftArtifacts.js";

// Runs every day at midnight
export const dailyArchiveJob = ()=>{
    cron.schedule("0 0 * * *", () => {
        console.log("Running daily artifact archiving job...");
  archiveDraftArtifacts();
});
}
