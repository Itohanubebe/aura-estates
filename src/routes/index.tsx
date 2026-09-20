import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/components/HomePage";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Aurelis | Architecture With Presence" },
      { name: "description", content: "Aurelis creates singular residences shaped by material, light, and a lasting sense of place." },
      { property: "og:title", content: "Aurelis | Architecture With Presence" },
      { property: "og:description", content: "Discover a portfolio of landmark residences and enduring architecture by Aurelis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <HomePage />;
}
