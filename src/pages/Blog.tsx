import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import BlogNav from "@/components/blog/BlogNav";
import BlogCard from "@/components/blog/BlogCard";
import Footer from "@/components/sections/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
  read_time_minutes: number | null;
  is_featured: boolean;
  profiles: { full_name: string } | null;
  categories: { name: string; slug: string } | null;
}

const POSTS_PER_PAGE = 9;

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [activeCategory, setActiveCategory] = useState(searchParams.get("cat") || "");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    supabase.from("categories").select("id, name, slug").then(({ data }) => {
      if (data) setCategories(data);
    });
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      let query = supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, featured_image, published_at, read_time_minutes, is_featured, profiles(full_name), categories(name, slug)", { count: "exact" })
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (activeCategory) {
        const cat = categories.find((c) => c.slug === activeCategory);
        if (cat) query = query.eq("category_id", cat.id);
      }
      if (search) {
        query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
      }

      query = query.range((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE - 1);

      const { data, count } = await query;
      setPosts((data as unknown as BlogPost[]) || []);
      setTotal(count || 0);
      setLoading(false);
    };
    fetchPosts();
  }, [activeCategory, search, page, categories]);

  const featuredPost = useMemo(() => posts.find((p) => p.is_featured), [posts]);
  const regularPosts = useMemo(() => posts.filter((p) => !p.is_featured || !featuredPost), [posts, featuredPost]);
  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  const handleCategoryClick = (slug: string) => {
    const next = activeCategory === slug ? "" : slug;
    setActiveCategory(next);
    setPage(1);
    setSearchParams((prev) => {
      if (next) prev.set("cat", next);
      else prev.delete("cat");
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <BlogNav />

      {/* Hero */}
      <header className="w-full px-6 sm:px-12 md:px-20 pt-16 pb-10">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Blog</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-foreground mt-6 leading-tight">
            Travel Stories & <span className="text-accent">Guides</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg mt-4 max-w-xl leading-relaxed">
            Real stories from real travelers. Discover tips, meet companions, and explore the world together with Orbee.
          </p>
        </div>
      </header>

      {/* Filters */}
      <section className="w-full px-6 sm:px-12 md:px-20 pb-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles…"
              className="pl-9 rounded-xl"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat.id}
                variant={activeCategory === cat.slug ? "default" : "secondary"}
                className="cursor-pointer transition-colors"
                onClick={() => handleCategoryClick(cat.slug)}
              >
                {cat.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <main className="flex-1 w-full px-6 sm:px-12 md:px-20 pb-16">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-72 rounded-2xl bg-muted/50 animate-pulse" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No articles found.</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featuredPost && page === 1 && (
                <div className="mb-8">
                  <BlogCard
                    slug={featuredPost.slug}
                    title={featuredPost.title}
                    excerpt={featuredPost.excerpt}
                    featured_image={featuredPost.featured_image}
                    author_name={featuredPost.profiles?.full_name || "Anonymous"}
                    category_name={featuredPost.categories?.name}
                    published_at={featuredPost.published_at}
                    read_time_minutes={featuredPost.read_time_minutes}
                    featured
                  />
                </div>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    slug={post.slug}
                    title={post.title}
                    excerpt={post.excerpt}
                    featured_image={post.featured_image}
                    author_name={post.profiles?.full_name || "Anonymous"}
                    category_name={post.categories?.name}
                    published_at={post.published_at}
                    read_time_minutes={post.read_time_minutes}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground px-4">
                    Page {page} of {totalPages}
                  </span>
                  <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
