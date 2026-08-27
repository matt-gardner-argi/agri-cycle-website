import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { BlogBrowser } from "@/components/blog/BlogBrowser";
import { PostCard } from "@/components/blog/PostCard";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { posts } from "@/content/posts";
import { blogIntro } from "@/content/site";

export const metadata: Metadata = {
  title: "Blog",
  description: blogIntro,
  alternates: { canonical: "/blog" },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const featured = posts[0];

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Food waste recycling news, tips and research"
        highlight={["research"]}
        image="/img/site/restaurant.jpg"
        crumbs={[{ label: "Blog" }]}
        intro={blogIntro}
      />

      {/* Featured post */}
      <section className="bg-paper pt-16 lg:pt-20">
        <div className="container-page">
          <Reveal>
            <Eyebrow>Latest article</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-6">
              <PostCard post={featured} featured priority headingLevel={2} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Browser */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="container-page">
          <Reveal>
            <div className="border-t border-ink/10 pt-12">
              <BlogBrowser initialCategory={category ?? "all"} headingLevel={2} />
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Ready to take your food full circle?"
        body="Contact us to see how Agri-Cycle can turn your food waste into renewable energy and compost."
        image="/img/site/energy18.jpg"
      />
    </>
  );
}
