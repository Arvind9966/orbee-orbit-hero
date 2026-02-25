import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import BlogNav from "@/components/blog/BlogNav";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Check, X, Trash2, Ban, Eye, Flag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface PostRow {
  id: string;
  title: string;
  slug: string;
  status: string;
  created_at: string;
  rejection_reason: string | null;
  is_featured: boolean;
  profiles: { id: string; full_name: string; is_banned: boolean } | null;
  categories: { name: string } | null;
}

interface Report {
  id: string;
  reason: string;
  created_at: string;
  blog_posts: { title: string; slug: string } | null;
  profiles: { full_name: string } | null;
}

const Admin = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectPostId, setRejectPostId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) navigate("/blog");
  }, [user, isAdmin, authLoading, navigate]);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("blog_posts")
      .select("id, title, slug, status, created_at, rejection_reason, is_featured, profiles(id, full_name, is_banned), categories(name)")
      .order("created_at", { ascending: false });
    setPosts((data as unknown as PostRow[]) || []);

    const { data: reps } = await supabase
      .from("post_reports")
      .select("id, reason, created_at, blog_posts(title, slug), profiles(full_name)")
      .order("created_at", { ascending: false });
    setReports((reps as unknown as Report[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchPosts();
  }, [isAdmin]);

  const approve = async (id: string) => {
    await supabase.from("blog_posts").update({ status: "published", published_at: new Date().toISOString() }).eq("id", id);
    toast({ title: "Post approved" });
    fetchPosts();
  };

  const reject = async () => {
    if (!rejectPostId) return;
    await supabase.from("blog_posts").update({ status: "rejected", rejection_reason: rejectReason }).eq("id", rejectPostId);
    toast({ title: "Post rejected" });
    setRejectDialogOpen(false);
    setRejectReason("");
    setRejectPostId(null);
    fetchPosts();
  };

  const deletePost = async (id: string) => {
    await supabase.from("blog_posts").delete().eq("id", id);
    toast({ title: "Post deleted" });
    fetchPosts();
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    await supabase.from("blog_posts").update({ is_featured: !current }).eq("id", id);
    fetchPosts();
  };

  const banUser = async (userId: string) => {
    await supabase.from("profiles").update({ is_banned: true }).eq("id", userId);
    toast({ title: "User banned" });
    fetchPosts();
  };

  const filterByStatus = (status: string) => posts.filter((p) => p.status === status);

  const PostTable = ({ items }: { items: PostRow[] }) => (
    <div className="space-y-3">
      {items.length === 0 && <p className="text-sm text-muted-foreground py-8 text-center">No posts.</p>}
      {items.map((p) => (
        <div key={p.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-xl border border-border/40 bg-card">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground text-sm truncate">{p.title}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <span>{p.profiles?.full_name || "Unknown"}</span>
              <span>·</span>
              <span>{format(new Date(p.created_at), "MMM d, yyyy")}</span>
              {p.categories && (
                <>
                  <span>·</span>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{p.categories.name}</Badge>
                </>
              )}
              {p.profiles?.is_banned && <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Banned</Badge>}
            </div>
            {p.rejection_reason && <p className="text-xs text-destructive mt-1">Reason: {p.rejection_reason}</p>}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {p.status === "pending" && (
              <>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600" onClick={() => approve(p.id)}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => { setRejectPostId(p.id); setRejectDialogOpen(true); }}>
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
            {p.status === "published" && (
              <Button size="sm" variant={p.is_featured ? "default" : "outline"} className="h-7 text-xs" onClick={() => toggleFeatured(p.id, p.is_featured)}>
                {p.is_featured ? "★ Featured" : "Feature"}
              </Button>
            )}
            <a href={`/blog/${p.slug}`} target="_blank" rel="noreferrer">
              <Button size="icon" variant="ghost" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
            </a>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => deletePost(p.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
            {p.profiles && !p.profiles.is_banned && (
              <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => banUser(p.profiles!.id)}>
                <Ban className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  if (authLoading || loading) return (
    <div className="min-h-screen bg-background flex flex-col">
      <BlogNav />
      <div className="flex-1 flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <BlogNav />
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl font-light text-foreground mb-8">Admin Dashboard</h1>

        <Tabs defaultValue="pending">
          <TabsList className="mb-6">
            <TabsTrigger value="pending">Pending ({filterByStatus("pending").length})</TabsTrigger>
            <TabsTrigger value="published">Published ({filterByStatus("published").length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({filterByStatus("rejected").length})</TabsTrigger>
            <TabsTrigger value="reports">Reports ({reports.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending"><PostTable items={filterByStatus("pending")} /></TabsContent>
          <TabsContent value="published"><PostTable items={filterByStatus("published")} /></TabsContent>
          <TabsContent value="rejected"><PostTable items={filterByStatus("rejected")} /></TabsContent>
          <TabsContent value="reports">
            <div className="space-y-3">
              {reports.length === 0 && <p className="text-sm text-muted-foreground py-8 text-center">No reports.</p>}
              {reports.map((r) => (
                <div key={r.id} className="flex items-start gap-3 p-4 rounded-xl border border-border/40 bg-card">
                  <Flag className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.blog_posts?.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">Reported by {r.profiles?.full_name} · {format(new Date(r.created_at), "MMM d, yyyy")}</p>
                    <p className="text-xs text-muted-foreground mt-1">{r.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Post</DialogTitle>
            <DialogDescription>Provide a reason for rejection.</DialogDescription>
          </DialogHeader>
          <Textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="Reason for rejection…" className="rounded-xl" />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={reject}>Reject</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Admin;
