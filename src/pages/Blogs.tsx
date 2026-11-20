
import { useMemo, useState } from "react";
import useFetchBlogs, {
  type Blog,
} from "../hooks/fetchhighlevelblogs";
import { LoadingSpinner } from "../components/loading";

// IMPORTANT: Replace this with your actual published HighLevel blog URL.
// Example format: https://your-domain.com/blog
const HIGHLEVEL_BLOG_URL = "http://localhost:3400/blog";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85";

type NamedValue = {
  name?: string;
  label?: string;
};

const getName = (
  value: string | NamedValue | undefined
): string => {
  if (!value) return "";

  return typeof value === "string"
    ? value
    : value.name || value.label || "";
};

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

const getSlug = (blog: Blog): string =>
  blog.urlSlug || blog.slug || blog._id || blog.id || "";

const getImage = (blog: Blog): string =>
  blog.imageUrl || FALLBACK_IMAGE;

const getDate = (blog: Blog): string | undefined =>
  blog.publishedAt || blog.createdAt || blog.updatedAt;

const formatDate = (date?: string): string => {
  if (!date) return "Recently";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Recently";
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Build the external URL for an article hosted on HighLevel.
const getHighLevelBlogUrl = (blog: Blog): string => {
  const slug = getSlug(blog);

  if (!slug) return HIGHLEVEL_BLOG_URL;

  return `${HIGHLEVEL_BLOG_URL.replace(/\/+$/, "")}/${encodeURIComponent(slug)}`;
};

export const Blogs = () => {
  const { blogs, isLoading, error, refetch } = useFetchBlogs();

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 6;

  const categories = useMemo(() => {
    const allCategories = blogs.flatMap((blog) =>
      (blog.categories ?? [])
        .map(getName)
        .filter(Boolean)
    );

    return ["All", ...Array.from(new Set(allCategories))];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return blogs.filter((blog) => {
      const blogCategories = (blog.categories ?? []).map(getName);
      const blogTags = (blog.tags ?? []).map(getName);
      const author = getAuthor(blog);

      const matchesCategory =
        activeCategory === "All" ||
        blogCategories.includes(activeCategory);

      const searchableText = [
        blog.title,
        blog.description,
        author,
        ...blogCategories,
        ...blogTags,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !searchText || searchableText.includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [blogs, activeCategory, search]);

  const featuredBlog =
    activeCategory === "All" && !search.trim()
      ? blogs[0]
      : undefined;

  const totalPages = Math.ceil(
    filteredBlogs.length / blogsPerPage
  );

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const changeCategory = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const changeSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("All");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#08050D] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=90')",
          }}
        />

        <div className="absolute inset-0 bg-[#08050D]/90" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#12071F]/70 via-[#09050D]/90 to-[#08050D]" />

        <div className="absolute -top-40 left-1/4 h-[650px] w-[650px] rounded-full bg-[#7C3AED]/20 blur-[160px]" />

        <div className="absolute right-[-200px] top-40 h-[500px] w-[500px] rounded-full bg-[#A855F7]/15 blur-[150px]" />

        <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-24 pt-28 lg:px-10">
          <div className="max-w-[800px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.07] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[2px] text-[#D8B4FE]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7]" />
              PacketPros Blog
            </span>

            <h1 className="mt-7 text-[46px] font-black leading-[.98] tracking-[-3px] sm:text-[60px] lg:text-[72px]">
              Learn the skills.
              <br />
              <span className="bg-gradient-to-r from-[#E9D5FF] via-[#C084FC] to-[#9333EA] bg-clip-text text-transparent">
                Build the career.
              </span>
            </h1>

            <p className="mt-7 max-w-[700px] text-[15px] leading-8 text-[#BEB3C9] sm:text-[17px]">
              Practical networking guides, career advice,
              troubleshooting strategies, interview preparation,
              and real-world IT knowledge for aspiring Network Engineers.
            </p>
          </div>

          <div className="mt-10 max-w-[680px]">
            <input
              type="search"
              value={search}
              onChange={(event) => changeSearch(event.target.value)}
              placeholder="Search networking, careers, labs..."
              aria-label="Search blog articles"
              className="h-14 w-full rounded-2xl border border-white/[0.14] bg-white/[0.08] px-5 text-white outline-none placeholder:text-[#81768D] focus:border-[#A855F7]/70"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="sticky top-0 z-30 border-y border-white/[0.07] bg-[#0B0712]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="flex gap-2 overflow-x-auto py-4">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => changeCategory(category)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-[11px] font-bold ${
                  activeCategory === category
                    ? "bg-[#7C3AED] text-white"
                    : "border border-white/[0.09] bg-white/[0.05] text-[#AFA4BA] hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LOADING */}
      {isLoading && (
        <section className="py-20">
          <LoadingSpinner title="Blogs" />
        </section>
      )}

      {/* ERROR */}
      {!isLoading && error && (
        <section className="px-6 py-20 text-center">
          <h2 className="text-2xl font-black">
            Unable to load articles
          </h2>

          <p className="mt-3 text-sm text-[#BEB3C9]">
            {error}
          </p>

          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-6 rounded-xl bg-[#7C3AED] px-6 py-3 font-bold"
          >
            Try again
          </button>
        </section>
      )}

      {/* FEATURED */}
      {!isLoading && !error && featuredBlog && (
        <section className="bg-[#0B0712] py-20 sm:py-24">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#A855F7]">
              Featured
            </p>

            <h2 className="mb-8 mt-2 text-[34px] font-black sm:text-[40px]">
              Start here.
            </h2>

            <a
              href={getHighLevelBlogUrl(featuredBlog)}
              rel="noopener noreferrer"
              className="group relative block min-h-[460px] overflow-hidden rounded-[30px] border border-white/10 bg-[#120C1A]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
                style={{
                  backgroundImage: `url("${getImage(featuredBlog)}")`,
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#08050D] via-[#08050D]/85 to-transparent" />

              <div className="relative flex min-h-[460px] items-end p-8 sm:p-12">
                <div className="max-w-[680px]">
                  <span className="rounded-full bg-[#7C3AED] px-3 py-1.5 text-[9px] font-bold uppercase">
                    Featured
                  </span>

                  <h3 className="mt-5 text-[34px] font-black leading-tight sm:text-[48px]">
                    {featuredBlog.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-[#C0B6C9]">
                    {featuredBlog.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-4 text-[10px] text-[#C2B7CB]">
                    <span>
                      {formatDate(getDate(featuredBlog))}
                    </span>

                    <span>{getAuthor(featuredBlog)}</span>

                    <span className="font-bold text-[#C084FC]">
                      Read article →
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* BLOG GRID */}
      {!isLoading && !error && (
        <section className="bg-[#F8F6FB] py-20 text-[#181526] sm:py-24">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#7C3AED]">
                  Latest Articles
                </p>

                <h2 className="mt-2 text-[32px] font-black sm:text-[40px]">
                  Knowledge for the journey.
                </h2>
              </div>

              <p className="text-[11px] text-[#7A7283]">
                {filteredBlogs.length} articles
              </p>
            </div>

            {paginatedBlogs.length > 0 ? (
              <>
                <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {paginatedBlogs.map((blog, index) => {
                    const slug = getSlug(blog);
                    const category = (blog.categories ?? [])
                      .map(getName)
                      .find(Boolean);

                    return (
                      <a
                        key={
                          blog._id ||
                          blog.id ||
                          slug ||
                          `${blog.title}-${index}`
                        }
                        href={getHighLevelBlogUrl(blog)}
                        rel="noopener noreferrer"
                        className="group overflow-hidden rounded-[22px] border border-[#E4DDEB] bg-white transition hover:-translate-y-1 hover:shadow-xl"
                      >
                        <div className="relative h-[205px] overflow-hidden">
                          <img
                            src={getImage(blog)}
                            alt={blog.imageAltText || blog.title}
                            loading="lazy"
                            onError={(event) => {
                              const image = event.currentTarget;

                              if (
                                !image.src.endsWith(
                                  "photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85"
                                )
                              ) {
                                image.src = FALLBACK_IMAGE;
                              }
                            }}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />

                          <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1.5 text-[9px] font-bold uppercase text-white">
                            {category || "Networking"}
                          </span>
                        </div>

                        <div className="p-6">
                          <div className="flex flex-wrap gap-2 text-[9px] text-[#8B8293]">
                            <span>{formatDate(getDate(blog))}</span>
                            <span>•</span>
                            <span>{getAuthor(blog)}</span>
                          </div>

                          <h3 className="mt-3 text-[17px] font-extrabold leading-6 group-hover:text-[#7C3AED]">
                            {blog.title}
                          </h3>

                          <p className="mt-3 line-clamp-3 text-[11px] leading-5 text-[#777080]">
                            {blog.description}
                          </p>

                          {blog.tags && blog.tags.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-1.5">
                              {blog.tags.slice(0, 3).map((tag, tagIndex) => {
                                const name = getName(tag);

                                if (!name) return null;

                                return (
                                  <span
                                    key={`${name}-${tagIndex}`}
                                    className="rounded-md bg-[#F1ECF6] px-2 py-1 text-[8px] font-semibold text-[#81758D]"
                                  >
                                    #{name}
                                  </span>
                                );
                              })}
                            </div>
                          )}

                          <div className="mt-5 text-[10px] font-bold text-[#7C3AED]">
                            Read article →
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() =>
                        setCurrentPage((page) =>
                          Math.max(1, page - 1)
                        )
                      }
                      className="rounded-xl border border-[#E4DDEB] bg-white px-4 py-3 text-xs disabled:opacity-40"
                    >
                      ← Previous
                    </button>

                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    ).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`h-10 w-10 rounded-xl text-xs font-bold ${
                          currentPage === page
                            ? "bg-[#7C3AED] text-white"
                            : "border border-[#E4DDEB] bg-white"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        setCurrentPage((page) =>
                          Math.min(totalPages, page + 1)
                        )
                      }
                      className="rounded-xl border border-[#E4DDEB] bg-white px-4 py-3 text-xs disabled:opacity-40"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-12 rounded-[25px] border border-[#E5DEEC] bg-white py-20 text-center">
                <h3 className="text-xl font-black">
                  No articles found
                </h3>

                <p className="mt-2 text-sm text-[#777080]">
                  Try another search or category.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-xl bg-[#7C3AED] px-5 py-3 text-xs font-bold text-white"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ACADEMY CTA */}
      <section className="relative overflow-hidden bg-[#0B0712] py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0712] via-[#10071B] to-[#0B0712]" />

        <div className="relative z-10 mx-auto max-w-[850px] px-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#C084FC]">
            Go Beyond Reading
          </span>

          <h2 className="mt-5 text-[38px] font-black leading-tight sm:text-[52px]">
            Don't just learn
            <br />
            <span className="bg-gradient-to-r from-[#E9D5FF] via-[#C084FC] to-[#9333EA] bg-clip-text text-transparent">
              networking. Practice it.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-[620px] text-sm leading-7 text-[#B6AABC]">
            The PacketPros Academy gives you a structured path,
            hands-on labs, realistic scenarios, and career preparation
            designed to turn knowledge into practical skills.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href="/academy"
              className="rounded-xl bg-gradient-to-r from-[#9333EA] to-[#6D28D9] px-7 py-4 text-sm font-bold text-white"
            >
              Explore PacketPros Academy →
            </a>

            <a
              href="/signup"
              className="rounded-xl border border-white/15 bg-white/[0.06] px-7 py-4 text-sm font-bold text-white"
            >
              Start Learning
            </a>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-[#F3EFF8] py-20 text-[#181526]">
        <div className="mx-auto max-w-[900px] px-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#7C3AED]">
            Stay Ahead
          </span>

          <h2 className="mt-4 text-[32px] font-black sm:text-[42px]">
            Get networking knowledge in your inbox.
          </h2>

          <p className="mx-auto mt-4 max-w-[570px] text-sm leading-6 text-[#716978]">
            Get practical networking tips, career advice, interview
            questions, and new PacketPros resources delivered to you.
          </p>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="mx-auto mt-8 flex max-w-[600px] flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              aria-label="Email address"
              className="h-13 flex-1 rounded-xl border border-[#DDD4E6] bg-white px-5 text-xs outline-none focus:border-[#A855F7]"
            />

            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] px-7 py-3.5 text-xs font-bold text-white"
            >
              Join Free →
            </button>
          </form>

          <p className="mt-4 text-[9px] text-[#8A8291]">
            No spam. Just useful networking and career content.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Blogs;