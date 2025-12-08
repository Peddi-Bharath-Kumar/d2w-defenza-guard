import { Shield, Award, CheckCircle, Verified } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "10-Year Warranty",
    description: "Industry-leading coverage",
  },
  {
    icon: Verified,
    title: "100% Genuine",
    description: "Authentic TPU material",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Superior craftsmanship",
  },
  {
    icon: CheckCircle,
    title: "Easy Claims",
    description: "Hassle-free warranty process",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-8 bg-brand-primary border-y-2 border-brand-gold/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className="flex items-center gap-3 group cursor-default"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-brand-gold/20 rounded-xl flex items-center justify-center group-hover:bg-brand-gold/30 transition-all duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-brand-gold" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm md:text-base">
                    {badge.title}
                  </h3>
                  <p className="text-blue-200 text-xs md:text-sm">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
