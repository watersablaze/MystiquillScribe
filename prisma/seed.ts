// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Essay (public-site)
  await prisma.post.upsert({
    where: { slug: "gutters-gate-threshold" },
    update: {},
    create: {
      slug: "gutters-gate-threshold",
      title: "Gutter’s Gate: A Threshold",
      excerpt: "A public breath before the plunge.",
      body: `# Gutter’s Gate\n\nThe outer altar. Mauve ink under indigo skies. Gold glints, silver whispers.`,
      site: "com",
      section: "essays",
      publishedAt: new Date(),
      isPublic: true,
      tags: ["threshold"]
    }
  });

  // Codex Channel page content (xyz)
  await prisma.post.upsert({
    where: { slug: "codex-channel-00078" },
    update: {},
    create: {
      slug: "codex-channel-00078",
      title: "Channel 00078 — GHMS Fragments",
      excerpt: "Fruit snippets from the inner corridors.",
      body: `# Channel 00078\n\nFragments gathered at dawn. The quill listens.`,
      site: "xyz",
      section: "codex",
      channel: "Channel 00078",
      publishedAt: new Date(),
      isPublic: false,
      tags: ["codex", "ghms"]
    }
  });

  // Odyssey entry (xyz)
  await prisma.post.upsert({
    where: { slug: "odyssey-first-ember" },
    update: {},
    create: {
      slug: "odyssey-first-ember",
      title: "Odyssey — First Ember",
      excerpt: "A moving entry from the road between horizons.",
      body: `# First Ember\n\nA scribble in motion; a breath that became a chord.`,
      site: "xyz",
      section: "odyssey",
      publishedAt: new Date(),
      isPublic: true,
      tags: ["odyssey"]
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });