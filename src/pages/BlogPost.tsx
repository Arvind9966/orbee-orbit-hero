import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import BlogNav from "@/components/blog/BlogNav";
import BlogCard from "@/components/blog/BlogCard";
import ShareButtons from "@/components/blog/ShareButtons";
import Footer from "@/components/sections/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { format } from "date-fns";
import { Flag, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
  read_time_minutes: number | null;
  meta_title: string | null;
  meta_description: string | null;
  tags: string[] | null;
  is_pillar: boolean;
  profiles: { id: string; full_name: string; bio: string | null; avatar_url: string | null } | null;
  categories: { name: string; slug: string } | null;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  profiles: { full_name: string } | null;
}

interface RelatedPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
  read_time_minutes: number | null;
  profiles: { full_name: string } | null;
  categories: { name: string } | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [related, setRelated] = useState<RelatedPost[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchPost = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, slug, content, excerpt, featured_image, published_at, read_time_minutes, meta_title, meta_description, tags, is_pillar, profiles(id, full_name, bio, avatar_url), categories(name, slug)")
        .eq("slug", slug)
        .eq("status", "published")
        .single();
      setPost(data as unknown as Post | null);

      if (data) {
        // Comments
        const { data: cmts } = await supabase
          .from("comments")
          .select("id, content, created_at, profiles(full_name)")
          .eq("post_id", data.id)
          .order("created_at", { ascending: true });
        setComments((cmts as unknown as Comment[]) || []);

        // Related posts (same category) - fetch category_id separately
        const catData = data.categories;
        if (catData) {
          const { data: catRow } = await supabase
            .from("categories")
            .select("id")
            .eq("slug", (catData as any).slug)
            .single();
          if (catRow) {
            const { data: rel } = await supabase
              .from("blog_posts")
              .select("id, slug, title, excerpt, featured_image, published_at, read_time_minutes, profiles(full_name), categories(name)")
              .eq("status", "published")
              .eq("category_id", catRow.id)
              .neq("id", data.id)
              .limit(3);
            setRelated((rel as unknown as RelatedPost[]) || []);
          }
        }
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  const submitComment = async () => {
    if (!user || !post || !newComment.trim()) return;
    const { error } = await supabase.from("comments").insert({
      post_id: post.id,
      author_id: user.id,
      content: newComment.trim(),
    });
    if (error) {
      toast({ title: "Error posting comment", description: error.message, variant: "destructive" });
    } else {
      setNewComment("");
      // Refresh comments
      const { data } = await supabase
        .from("comments")
        .select("id, content, created_at, profiles(full_name)")
        .eq("post_id", post.id)
        .order("created_at", { ascending: true });
      setComments((data as unknown as Comment[]) || []);
    }
  };

  const reportPost = async () => {
    if (!user || !post) return;
    const { error } = await supabase.from("post_reports").insert({
      post_id: post.id,
      reporter_id: user.id,
      reason: "Flagged by reader",
    });
    if (error) toast({ title: "Already reported", variant: "destructive" });
    else toast({ title: "Report submitted. Thank you." });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <BlogNav />
        <div className="flex-1 flex items-center justify-center">
          <div className="h-8 w-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <BlogNav />
        <div className="flex-1 flex items-center justify-center flex-col gap-4">
          <p className="text-xl text-foreground">Article not found</p>
          <Link to="/blog"><Button variant="outline">Back to Blog</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>{post.meta_title || post.title} | Orbee Blog</title>
        <meta name="description" content={post.meta_description || post.excerpt || ""} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta property="og:description" content={post.meta_description || post.excerpt || ""} />
        {post.featured_image && <meta property="og:image" content={post.featured_image} />}
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: post.featured_image,
            datePublished: post.published_at,
            author: { "@type": "Person", name: post.profiles?.full_name },
          })}
        </script>
      </Helmet>

      <BlogNav />

      <article className="flex-1">
        {/* Featured Image */}
        {post.featured_image && (
          <div className="w-full max-w-5xl mx-auto px-6 pt-8">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-64 sm:h-80 md:h-[420px] object-cover rounded-2xl"
            />
          </div>
        )}

        <div className="max-w-5xl mx-auto px-6 sm:px-12 pt-8 pb-16 flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="/blog">Blog</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>{post.title}</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center gap-3 mt-6 mb-4">
              {post.categories && <Badge variant="secondary">{post.categories.name}</Badge>}
              {post.is_pillar && <Badge className="bg-accent text-accent-foreground">Pillar</Badge>}
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-6">
              {post.title}
            </h1>

            {/* Author & meta */}
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border/50">
              <Avatar className="h-11 w-11">
                <AvatarFallback className="bg-secondary text-foreground font-medium">
                  {post.profiles?.full_name?.charAt(0) || "?"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-foreground">{post.profiles?.full_name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {post.published_at && <span>{format(new Date(post.published_at), "MMM d, yyyy")}</span>}
                  {post.read_time_minutes && (
                    <>
                      <span>·</span>
                      <span>{post.read_time_minutes} min read</span>
                    </>
                  )}
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <ShareButtons url={pageUrl} title={post.title} />
                {user && (
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground" onClick={reportPost}>
                    <Flag className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Content */}
            <div
              className="prose prose-sm sm:prose max-w-none text-foreground [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_a]:text-accent [&_img]:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border/50">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>
            )}

            {/* Author Bio */}
            {post.profiles?.bio && (
              <div className="mt-10 p-6 rounded-2xl bg-muted/30 border border-border/30">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-secondary text-foreground">
                      {post.profiles.full_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{post.profiles.full_name}</p>
                    <p className="text-xs text-muted-foreground">Author</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{post.profiles.bio}</p>
              </div>
            )}

            {/* Comments */}
            <section className="mt-12">
              <h2 className="font-display text-xl font-medium text-foreground mb-6">Comments ({comments.length})</h2>
              {user ? (
                <div className="flex flex-col gap-3 mb-8">
                  <Textarea
                    placeholder="Share your thoughts…"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="rounded-xl"
                  />
                  <Button onClick={submitComment} disabled={!newComment.trim()} className="w-fit rounded-xl" size="sm">
                    Post Comment
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mb-8">
                  <Link to="/login" className="text-accent hover:underline">Sign in</Link> to leave a comment.
                </p>
              )}
              <div className="flex flex-col gap-4">
                {comments.map((c) => (
                  <div key={c.id} className="p-4 rounded-xl bg-muted/20 border border-border/30">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-foreground">{c.profiles?.full_name || "Anonymous"}</span>
                      <span className="text-xs text-muted-foreground">{format(new Date(c.created_at), "MMM d, yyyy")}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{c.content}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-24 flex flex-col gap-6">
              {/* CTA */}
              <div className="p-6 rounded-2xl bg-secondary/50 border border-border/30">
                <h3 className="font-display text-lg font-medium text-foreground mb-2">Find Travel Companions</h3>
                <p className="text-sm text-muted-foreground mb-4">Connect with like-minded travelers on Orbee.</p>
                <a href="/#" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
                  Download Orbee <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="w-full px-6 sm:px-12 md:px-20 pb-16">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-display text-2xl font-medium text-foreground mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((r) => (
                  <BlogCard
                    key={r.id}
                    slug={r.slug}
                    title={r.title}
                    excerpt={r.excerpt}
                    featured_image={r.featured_image}
                    author_name={r.profiles?.full_name || "Anonymous"}
                    category_name={r.categories?.name}
                    published_at={r.published_at}
                    read_time_minutes={r.read_time_minutes}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="w-full px-6 sm:px-12 md:px-20 pb-16">
          <div className="max-w-3xl mx-auto text-center p-10 rounded-3xl bg-secondary/30 border border-border/30">
            <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground mb-3">
              Ready to find your travel companion?
            </h2>
            <p className="text-muted-foreground mb-6">Download Orbee and connect with travelers who share your vibe.</p>
            <div className="flex items-center justify-center gap-3">
              <Button className="rounded-xl">Download Orbee</Button>
            </div>
          </div>
        </section>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
