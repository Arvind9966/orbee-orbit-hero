import { Link } from "react-router-dom";
import orbeeLogo from "@/assets/orbee-logo.png";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const BlogNav = () => {
  const { user, profile, isAdmin, signOut } = useAuth();

  return (
    <nav className="w-full border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/">
            <img src={orbeeLogo} alt="Orbee" className="h-10 w-auto" />
          </Link>
          <div className="hidden sm:flex items-center gap-6">
            <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
            {user && (
              <Link to="/write" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Write
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="text-sm text-accent hover:text-accent/80 transition-colors font-medium">
                Admin
              </Link>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground hidden sm:block">
                {profile?.full_name || user.email}
              </span>
              <Button variant="ghost" size="sm" onClick={signOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="rounded-xl">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default BlogNav;
