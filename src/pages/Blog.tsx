import { Shield, BookOpen, Newspaper, MessageSquareQuote, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { blogPosts, BlogPost } from "@/data/blogPosts";
import { useState } from "react";

const categoryConfig = {
  "care-tips": { label: "Care Tips", icon: BookOpen, color: "bg-blue-500" },
  "industry-news": { label: "Industry News", icon: Newspaper, color: "bg-green-500" },
  "testimonials": { label: "Testimonials", icon: MessageSquareQuote, color: "bg-purple-500" },
};

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<BlogPost['category'] | "all">("all");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-royal-blue via-brand-primary to-black py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <BookOpen className="h-16 w-16 text-brand-gold mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              PPF <span className="text-brand-gold">Knowledge</span> Hub
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Expert tips, industry insights, and real customer experiences
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-12 py-6 text-lg bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-brand-gold text-brand-primary shadow-lg"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              All Articles
            </button>
            {(Object.keys(categoryConfig) as Array<BlogPost['category']>).map((category) => {
              const config = categoryConfig[category];
              const Icon = config.icon;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                    selectedCategory === category
                      ? "bg-brand-gold text-brand-primary shadow-lg"
                      : "bg-muted hover:bg-muted/80 text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {config.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No articles found matching your search.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredPosts.map((post) => {
                const config = categoryConfig[post.category];
                const Icon = config.icon;
                return (
                  <Link key={post.id} to={`/blog/${post.id}`}>
                    <Card className="h-full border-brand-royal-blue/30 shadow-lg hover:shadow-xl transition-all hover:border-brand-gold/50 group">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="mb-4">
                          <Badge className={`${config.color} text-white mb-3`}>
                            <Icon className="h-3 w-3 mr-1" />
                            {config.label}
                          </Badge>
                          <h3 className="text-xl font-bold text-brand-primary mb-2 group-hover:text-brand-gold transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {post.date} · {post.readTime}
                          </p>
                        </div>
                        
                        <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                          {post.excerpt}
                        </p>
                        
                        <div className="mt-auto">
                          <p className="text-sm font-medium text-brand-royal-blue">
                            By {post.author}
                          </p>
                          <div className="mt-3 flex items-center text-brand-gold font-semibold group-hover:translate-x-2 transition-transform">
                            Read More →
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-royal-blue/5 to-brand-gold/5">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-brand-primary mb-6">
            Ready to Protect Your Vehicle?
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get D2W Defenza PPF installed by authorized professionals
          </p>
          <Link to="/">
            <button className="bg-brand-gold hover:bg-brand-gold/90 text-brand-primary px-8 py-4 text-lg font-bold rounded-lg shadow-lg transition-all">
              Find an Installer
            </button>
          </Link>
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

export default Blog;
