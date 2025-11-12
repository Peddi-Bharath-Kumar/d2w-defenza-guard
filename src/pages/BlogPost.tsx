import { Shield, Calendar, Clock, User, ArrowLeft, BookOpen, Newspaper, MessageSquareQuote } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getBlogPostById, getBlogPostsByCategory } from "@/data/blogPosts";
import { useEffect } from "react";

const categoryConfig = {
  "care-tips": { label: "Care Tips", icon: BookOpen, color: "bg-blue-500" },
  "industry-news": { label: "Industry News", icon: Newspaper, color: "bg-green-500" },
  "testimonials": { label: "Testimonials", icon: MessageSquareQuote, color: "bg-purple-500" },
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = id ? getBlogPostById(id) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Track blog post view with Meta Pixel
    if (post && typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'ViewContent', {
        content_name: post.title,
        content_category: post.category,
        content_type: 'blog_post',
        content_ids: [post.id]
      });
    }
  }, [id, post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-brand-primary mb-4">Article Not Found</h2>
          <Link to="/blog" className="text-brand-gold hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const config = categoryConfig[post.category];
  const Icon = config.icon;
  const relatedPosts = getBlogPostsByCategory(post.category)
    .filter(p => p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-brand-primary via-brand-royal-blue to-brand-primary border-b-4 border-brand-gold shadow-lg">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-gold rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(255,193,7,0.5)]">
                <Shield className="h-7 w-7 text-brand-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  <span className="text-brand-gold">D2W</span>defenza
                </h1>
                <p className="text-sm text-blue-200 font-medium">PAINT PROTECTION FILM</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Back Button */}
      <section className="py-6 bg-muted/20">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-brand-royal-blue hover:text-brand-gold transition-colors font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto">
            <Badge className={`${config.color} text-white mb-6`}>
              <Icon className="h-4 w-4 mr-2" />
              {config.label}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              {post.excerpt}
            </p>
          </article>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-gradient-to-br from-brand-royal-blue/5 to-brand-gold/5">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto">
            <Card className="border-brand-royal-blue/30 shadow-lg">
              <CardContent className="p-8 md:p-12">
                <div 
                  className="prose prose-lg max-w-none
                    prose-headings:text-brand-primary 
                    prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-8
                    prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-6
                    prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-3 prose-h3:mt-5
                    prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                    prose-ul:my-6 prose-ul:text-muted-foreground
                    prose-li:mb-2
                    prose-strong:text-brand-primary prose-strong:font-semibold
                    prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ 
                    __html: post.content
                      .split('\n')
                      .map(line => {
                        // Convert markdown headers
                        if (line.startsWith('# ')) return `<h1>${line.substring(2)}</h1>`;
                        if (line.startsWith('## ')) return `<h2>${line.substring(3)}</h2>`;
                        if (line.startsWith('### ')) return `<h3>${line.substring(4)}</h3>`;
                        // Convert bold
                        if (line.includes('**')) {
                          return `<p>${line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;
                        }
                        // Convert lists
                        if (line.startsWith('- ')) return `<li>${line.substring(2)}</li>`;
                        if (line.startsWith('* ')) return `<li>${line.substring(2)}</li>`;
                        // Regular paragraphs
                        if (line.trim()) return `<p>${line}</p>`;
                        return '';
                      })
                      .join('') 
                  }}
                />
              </CardContent>
            </Card>
          </article>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-3xl font-bold text-brand-primary mb-8 text-center">
                Related Articles
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => {
                  const relatedConfig = categoryConfig[relatedPost.category];
                  const RelatedIcon = relatedConfig.icon;
                  return (
                    <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                      <Card className="h-full border-brand-royal-blue/30 shadow-lg hover:shadow-xl transition-all hover:border-brand-gold/50 group">
                        <CardContent className="p-6">
                          <Badge className={`${relatedConfig.color} text-white mb-3`}>
                            <RelatedIcon className="h-3 w-3 mr-1" />
                            {relatedConfig.label}
                          </Badge>
                          <h4 className="text-lg font-bold text-brand-primary mb-2 group-hover:text-brand-gold transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {relatedPost.readTime}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-royal-blue/5 to-brand-gold/5">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-brand-primary mb-6">
            Ready to Protect Your Vehicle?
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get D2W Defenza PPF installed by authorized professionals
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/">
              <button className="bg-brand-gold hover:bg-brand-gold/90 text-brand-primary px-8 py-4 text-lg font-bold rounded-lg shadow-lg transition-all">
                Find an Installer
              </button>
            </Link>
            <Link to="/blog">
              <button className="bg-white hover:bg-muted text-brand-primary border-2 border-brand-royal-blue px-8 py-4 text-lg font-bold rounded-lg shadow-lg transition-all">
                More Articles
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-brand-primary via-brand-royal-blue to-brand-primary text-white py-12 border-t-4 border-brand-gold">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-brand-gold rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,193,7,0.4)]">
                  <Shield className="h-5 w-5 text-brand-primary" />
                </div>
                <span className="text-xl font-bold">
                  <span className="text-brand-gold">D2W</span> Defenza PPF
                </span>
              </div>
              <p className="text-blue-200">
                Premium paint protection film with comprehensive digital warranty coverage.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <p>support@d2wdefenza.com</p>
                <p>1800-XXX-XXXX</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <Link to="/warranty-claims" className="block text-gray-300 hover:text-brand-gold transition-colors">
                  Warranty Claims
                </Link>
                <Link to="/terms-conditions" className="block text-gray-300 hover:text-brand-gold transition-colors">
                  Terms & Conditions
                </Link>
                <Link to="/blog" className="block text-gray-300 hover:text-brand-gold transition-colors">
                  Blog
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-brand-secondary mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 D2W Defenza PPF. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;
