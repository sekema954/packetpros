
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import useFetchBlogs, {
  type Blog,
} from "../hooks/fetchhighlevelblogs";
import { LoadingSpinner } from "../components/loading";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2200&q=90";

type NamedValue =
  | string
  | {
      name?: string;
      label?: string;
    };

const getName = (value?: NamedValue): string => {
  if (!value) return "";

  return typeof value === "string"
    ? value
    : value.name || value.label || "";
};

const getSlug = (blog: Blog): string =>
  blog.urlSlug || blog.slug || blog._id || blog.id || "";

const getImage = (blog: Blog): string =>
  blog.imageUrl || FALLBACK_IMAGE;

const getAuthor = (blog: Blog): string => {
  const author = blog.author;

  if (typeof author === "string" && author.trim()) {
    return author;
  }

  if (author && typeof author === "object") {
    const name =
      author.name ||
      [author.firstName, author.lastName]
        .filter(Boolean)
        .join(" ");

    if (name) return name;
  }

  return blog.updatedBy || "PacketPros";
};


const formatDate = (date?: string): string => {
  if (!date) return "Recently";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Recently";
  }

  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const getInitials = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const {
    blogs,
    isLoading,
    error,
    refetch,
  } = useFetchBlogs();

  const decodedSlug = useMemo(() => {
    if (!slug) return "";

    try {
      return decodeURIComponent(slug);
    } catch {
      return slug;
    }
  }, [slug]);

  // Find the article by its HighLevel URL slug.
  // Example: /blog/new-blog-post
  const blog = useMemo(
    () =>
      blogs.find(
        (item) =>
          getSlug(item) === decodedSlug ||
          item._id === decodedSlug ||
          item.id === decodedSlug
      ),
    [blogs, decodedSlug]
  );

  const relatedBlogs = useMemo(
    () =>
      blog
        ? blogs
            .filter(
              (item) =>
                item._id !== blog._id &&
                item.id !== blog.id
            )
            .slice(0, 3)
        : [],
    [blogs, blog]
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08050D] text-white">
        <LoadingSpinner title="Blog" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#08050D] px-6 text-center text-white">
        <h1 className="text-3xl font-black">
          Unable to load article
        </h1>

        <p className="mt-4 max-w-lg text-sm text-[#95899F]">
          {error}
        </p>

        <button
          type="button"
          onClick={() => void refetch()}
          className="mt-7 rounded-xl bg-[#7C3AED] px-6 py-3 text-sm font-bold"
        >
          Try again
        </button>

        <a
          href="/blogs"
          className="mt-4 text-sm text-[#C084FC] hover:text-white"
        >
          ← Back to Blog
        </a>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#08050D] px-6 text-center text-white">
        <h1 className="text-4xl font-black">
          Blog not found
        </h1>

        <p className="mt-4 max-w-lg text-[#95899F]">
          No article matches the URL slug "{decodedSlug}".
          Check that your API returns the published article
          with its urlSlug field.
        </p>

        <a
          href="/blog"
          className="mt-7 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#6D28D9] px-6 py-3 text-xs font-bold"
        >
          ← Back to Blog
        </a>
      </div>
    );
  }

  const category =
    (blog.categories ?? [])
      .map(getName)
      .find(Boolean) || "Networking";

  const author = getAuthor(blog);
  const image = getImage(blog);

  return (
    <div className="min-h-screen bg-[#08050D] text-white">
      {/* ARTICLE HERO */}
      <section className="relative min-h-[580px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${image}")`,
          }}
        />

        <div className="absolute inset-0 bg-[#08040D]/85" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#12061E]/70 via-[#09040D]/85 to-[#08050D]" />

        <div className="absolute -top-40 left-1/3 h-[650px] w-[650px] rounded-full bg-[#7C3AED]/20 blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1100px] px-6 pb-24 pt-28 lg:px-10">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#B7A9C4] transition hover:text-white"
          >
            ← Back to Blog
          </a>

          <div className="mt-12">
            <span className="inline-flex items-center rounded-full border border-[#A855F7]/30 bg-[#7C3AED]/15 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[2px] text-[#C084FC]">
              {category}
            </span>
          </div>

          <h1 className="mt-7 max-w-[900px] text-[42px] font-black leading-[1.02] tracking-[-2px] sm:text-[56px] lg:text-[70px]">
            {blog.title}
          </h1>

          <p className="mt-7 max-w-[720px] whitespace-pre-line text-[15px] leading-8 text-[#BDB2C7] sm:text-[17px]">
            {blog.description ||
              "Explore practical networking knowledge and IT skills."}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#A855F7] to-[#5B21B6] font-bold">
                {getInitials(author)}
              </div>

              <div>
                <div className="text-xs font-bold text-white">
                  {author}
                </div>

                <div className="text-[10px] text-[#95899F]">
                  Network Engineer & Educator
                </div>
              </div>
            </div>

            <div className="hidden h-7 w-px bg-white/10 sm:block" />

            <div className="text-[11px] text-[#95899F]">
              {formatDate(
                blog.publishedAt ||
                  blog.createdAt ||
                  blog.updatedAt
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <main className="relative">
        <div className="mx-auto max-w-[1150px] px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[1fr_300px]">
            <article className="max-w-[760px] py-16">
              <div className="mb-10 rounded-[22px] border border-white/10 bg-white/[0.035] p-7">
                <div className="text-[10px] font-bold uppercase tracking-[2px] text-[#A855F7]">
                  In this article
                </div>

                <div className="mt-5 space-y-3">
                  <a
                    href="#article-content"
                    className="block text-[13px] text-[#C7BDC9] transition hover:text-[#C084FC]"
                  >
                    1. Article
                  </a>

                  <a
                    href="#article-tags"
                    className="block text-[13px] text-[#C7BDC9] transition hover:text-[#C084FC]"
                  >
                    2. Topics covered
                  </a>
                </div>
              </div>

              <section id="article-content">
                <h2 className="text-2xl font-black sm:text-3xl">
                  {blog.title}
                </h2>

                {blog.description && (
                  <p className="mt-6 whitespace-pre-line text-[16px] leading-8 text-[#D5CCD9]">
                    {blog.description}
                  </p>
                )}

                {blog.rawHTML ? (
                  <div
                    className="blog-article-content mt-8 break-words text-[15px] leading-8 text-[#BEB3C9] [&_a]:text-[#C084FC] [&_a]:underline [&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-[#7C3AED] [&_blockquote]:pl-5 [&_h1]:mb-5 [&_h1]:mt-10 [&_h1]:text-3xl [&_h1]:font-black [&_h2]:mb-4 [&_h2]:mt-9 [&_h2]:text-2xl [&_h2]:font-black [&_h3]:mb-3 [&_h3]:mt-7 [&_h3]:text-xl [&_h3]:font-bold [&_img]:my-7 [&_img]:h-auto [&_img]:max-w-full [&_li]:ml-6 [&_li]:list-disc [&_ol]:my-5 [&_p]:mb-5 [&_ul]:my-5"
                    dangerouslySetInnerHTML={{
                      __html: blog.rawHTML,
                    }}
                  />
                ) : (
                  <p className="mt-6 text-[15px] leading-8 text-[#9F94A8]">
                    The API returned this article's title and
                    description, but no rawHTML article body.
                    Add the content field returned by your API
                    if you want the full article displayed here.
                  </p>
                )}
              </section>

              {/* FEATURED IMAGE */}
              {blog.imageUrl && (
                <div className="mt-10 overflow-hidden rounded-[24px] border border-white/10">
                  <img
                    src={blog.imageUrl}
                    alt={blog.imageAltText || blog.title}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = FALLBACK_IMAGE;
                    }}
                    className="h-auto max-h-[480px] w-full object-cover"
                  />
                </div>
              )}

              {/* TOPICS */}
              {((blog.tags ?? []).length > 0 ||
                (blog.categories ?? []).length > 0) && (
                <section id="article-tags" className="mt-12">
                  <h2 className="text-xs font-bold uppercase tracking-[2px] text-[#A855F7]">
                    Topics covered
                  </h2>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      ...(blog.categories ?? []),
                      ...(blog.tags ?? []),
                    ]
                      .map(getName)
                      .filter(Boolean)
                      .map((tag, index) => (
                        <span
                          key={`${tag}-${index}`}
                          className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2 text-[10px] text-[#C8BECF]"
                        >
                          #{tag}
                        </span>
                      ))}
                  </div>
                </section>
              )}

              {/* AUTHOR */}
              <div className="mt-16 border-t border-white/10 pt-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#A855F7] to-[#5B21B6] text-lg font-black">
                    {getInitials(author)}
                  </div>

                  <div>
                    <div className="text-sm font-bold">
                      {author}
                    </div>

                    <div className="mt-1 text-[11px] text-[#837887]">
                      Network Engineer · Educator · Content Creator
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* SIDEBAR */}
            <aside className="hidden pt-20 lg:block">
              <div className="sticky top-24 space-y-5">
                <div className="overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-[#1B0C2D] to-[#0D0814]">
                  <div
                    className="h-[150px] bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80')",
                    }}
                  />

                  <div className="p-6">
                    <span className="text-[9px] font-bold uppercase tracking-[2px] text-[#A855F7]">
                      PacketPros Academy
                    </span>

                    <h3 className="mt-3 text-lg font-black">
                      Want a structured path?
                    </h3>

                    <p className="mt-3 text-[11px] leading-5 text-[#928697]">
                      Learn networking through structured lessons,
                      hands-on labs, and career preparation.
                    </p>

                    <a
                      href="/academy"
                      className="mt-5 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#9333EA] to-[#6D28D9] py-3 text-[11px] font-bold"
                    >
                      Explore PacketPros →
                    </a>
                  </div>
                </div>

                {/* RELATED ARTICLES */}
                <div className="rounded-[22px] border border-white/10 bg-white/[0.025] p-6">
                  <div className="text-[10px] font-bold uppercase tracking-[2px] text-[#A855F7]">
                    Related Articles
                  </div>

                  <div className="mt-5 space-y-5">
                    {relatedBlogs.map((article, index) => {
                      const articleSlug = getSlug(article);

                      return (
                        <a
                          key={
                            article._id ||
                            article.id ||
                            articleSlug ||
                            index
                          }
                          href={`/blog/${encodeURIComponent(articleSlug)}`}
                          className="group block"
                        >
                          <h4 className="text-xs font-bold leading-5 text-[#D1C7D5] transition group-hover:text-[#C084FC]">
                            {article.title}
                          </h4>

                          <span className="mt-1 block text-[9px] text-[#746B79]">
                            Read article →
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* BOTTOM CTA */}
      <section className="relative overflow-hidden border-t border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-[#0B0612]/90" />

        <div className="relative z-10 mx-auto max-w-[850px] px-6 py-24 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#C084FC]">
            Ready to Start?
          </span>

          <h2 className="mt-5 text-[38px] font-black leading-[1] tracking-[-2px] sm:text-[54px]">
            Stop wondering what
            <br />
            <span className="bg-gradient-to-r from-[#E9D5FF] to-[#9333EA] bg-clip-text text-transparent">
              to learn next.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-[600px] text-sm leading-7 text-[#A99DAF]">
            Follow a structured path, build real networking skills,
            and prepare yourself for the Network Engineer career you want.
          </p>

          <a
            href="/academy"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#9333EA] to-[#6D28D9] px-8 py-4 text-[13px] font-bold shadow-[0_15px_45px_-12px_rgba(124,58,237,.8)] transition-all hover:-translate-y-1"
          >
            Explore PacketPros Academy →
          </a>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;