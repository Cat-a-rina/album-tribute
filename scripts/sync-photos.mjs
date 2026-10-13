// Copies /photos (the source of truth) into /public/photos so Next can serve it.
import { cp, rm } from "node:fs/promises";

await rm("public/photos", { recursive: true, force: true });
await cp("photos", "public/photos", { recursive: true });
console.log("Synced photos -> public/photos");
