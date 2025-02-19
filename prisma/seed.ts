import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.issue.createMany({
    data: [
      {
        title: "Fix login system",
        description: "Users are unable to log in due to an authentication error.",
        status: "OPEN"
      },
      {
        title: "Improve database performance",
        description: "Database queries are slow; indexes need optimization.",
        status: "OPEN"
      },
      {
        title: "Add dark mode",
        description: "Users request a dark mode option for better accessibility.",
        status: "IN_PROGRESS"
      },
      {
        title: "Price calculation bug",
        description: "Discounts are not being applied correctly in the shopping cart.",
        status: "OPEN"
      },
      {
        title: "Implement password reset",
        description: "Users need a way to reset their passwords via email.",
        status: "CLOSED"
      },
      {
        title: "Fix mobile responsiveness",
        description: "Some pages are not displaying properly on mobile devices.",
        status: "IN_PROGRESS"
      },
      {
        title: "Optimize image loading",
        description: "Images take too long to load; implement lazy loading.",
        status: "OPEN"
      },
      {
        title: "Security vulnerability in API",
        description: "Potential security flaw in the authentication endpoint.",
        status: "IN_PROGRESS"
      },
      {
        title: "Enhance search functionality",
        description: "Search results are not accurate; implement fuzzy search.",
        status: "CLOSED"
      },
      {
        title: "Fix broken links",
        description: "Several links across the site are leading to 404 pages.",
        status: "OPEN"
      }
    ]
  });

  console.log("✅ Issues seeded successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
