import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import BlogNav from "@/components/blog/BlogNav";
import RichTextEditor from "@/components/blog/RichTextEditor";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const Write = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [bio, setBio] = useState(profile?.bio || "");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase.from("categories").select("id, name").then(({ data }) => {
      if (data) setCategories(data);
    });
  }, []);

  useEffect(() => {
    if (!authLoading && !user) navigate("/login");
  }, [user, authLoading, navigate]);

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 80);

  const estimateReadTime = (html: string) => {
    const text = html.replace(/<[^>]*>/g, "");
    return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title.trim() || !content.trim()) return;

    setSubmitting(true);
    const slug = generateSlug(title) + "-" + Date.now().toString(36);

    // Update bio if changed
    if (bio && bio !== profile?.bio) {
      await supabase.from("profiles").update({ bio }).eq("id", user.id);
    }

    const { error } = await supabase.from("blog_posts").insert({
      title: title.trim(),
      slug,
      content,
      excerpt: excerpt.trim() || content.replace(/<[^>]*>/g, "").slice(0, 150),
      featured_image: featuredImage || null,
      author_id: user.id,
      category_id: categoryId || null,
      read_time_minutes: estimateReadTime(content),
      status: "pending",
    });

    if (error) {
      toast({ title: "Error submitting", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Submitted for review!", description: "Your article is now pending approval." });
      navigate("/blog");
    }
    setSubmitting(false);
  };

  if (authLoading) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <BlogNav />
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl sm:text-4xl font-light text-foreground mb-2">Write an Article</h1>
        <p className="text-muted-foreground mb-8">Share your travel story with the Orbee community. All submissions are reviewed before publishing.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Your article title" className="rounded-xl" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Featured Image URL</Label>
            <Input id="image" value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} placeholder="https://example.com/image.jpg" className="rounded-xl" />
          </div>

          <div className="space-y-2">
            <Label>Content *</Label>
            <RichTextEditor value={content} onChange={setContent} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt (optional)</Label>
            <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Brief summary (auto-generated if left empty)" className="rounded-xl" rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Your Short Bio</Label>
            <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell readers about yourself" className="rounded-xl" rows={2} />
          </div>

          <Button type="submit" disabled={submitting || !title.trim() || !content.trim()} className="rounded-xl w-fit self-end gap-2">
            <Send className="h-4 w-4" />
            {submitting ? "Submitting…" : "Submit for Review"}
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Write;
