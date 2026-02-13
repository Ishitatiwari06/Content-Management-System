import cron from "node-cron";

export const testing = () => {
    // console.log("Testing function is running");
    cron.schedule("* * * * *", () => { // * * * * * - min-hour-day-month
    // console.log("running testing");
    
})
} 