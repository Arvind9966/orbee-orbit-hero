import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string | null;
  featured_image: string | null;
  author_name: string;
  category_name?: string;
  published_at: string | null;
  read_time_minutes: number | null;
  featured?: boolean;
}

const BlogCard = ({
  slug,
  title,
  excerpt,
  featured_image,
  author_name,
  category_name,
  published_at,
  read_time_minutes,
  featured = false,
}: BlogCardProps) => {
  const truncatedExcerpt = excerpt && excerpt.length > 150 ? excerpt.slice(0, 150) + "…" : excerpt;

  return (
    <Link
      to={`/blog/${slug}`}
      className={`group block rounded-2xl border border-border/40 bg-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
        featured ? "md:col-span-3 md:grid md:grid-cols-2 md:gap-0" : ""
      }`}
    >
      <div className={`overflow-hidden ${featured ? "md:h-full h-48" : "h-48"}`}>
        <img
          src={featured_image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className={`p-5 flex flex-col gap-3 ${featured ? "md:p-8 md:justify-center" : ""}`}>
        {category_name && (
          <Badge variant="secondary" className="w-fit text-xs">
            {category_name}
          </Badge>
        )}
        <h2 className={`font-display font-medium text-foreground leading-snug group-hover:text-accent transition-colors ${
          featured ? "text-2xl md:text-3xl" : "text-lg"
        }`}>
          {title}
        </h2>
        {truncatedExcerpt && (
          <p className="text-sm text-muted-foreground leading-relaxed">{truncatedExcerpt}</p>
        )}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-2">
          <span className="font-medium text-foreground/70">{author_name}</span>
          <span>·</span>
          {published_at && <span>{format(new Date(published_at), "MMM d, yyyy")}</span>}
          {read_time_minutes && (
            <>
              <span>·</span>
              <span>{read_time_minutes} min read</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
