import { db } from "@/db";
import { usersTable } from "@/db/schema";
import "dotenv/config";

async function seed() {
  await db.insert(usersTable).values([
    { name: "Alice", age: 30, email: "alice@example.com" },
    { name: "Bob", age: 25, email: "bob@example.com" },
    { name: "Charlie", age: 35, email: "charlie@example.com" },
  ]);
  console.log("Seeding completed.");
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
});
