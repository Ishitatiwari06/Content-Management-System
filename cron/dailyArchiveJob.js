import cron from "node-cron";
import { archiveDraftArtifacts } from "./archiveDraftArtifacts.js";

export const dailyArchiveJob = ()=>{
    cron.schedule("0 0 * * *", () => {
        console.log("Running daily artifact archiving job...");
  archiveDraftArtifacts();
});
}
