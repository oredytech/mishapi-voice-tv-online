
import { useEffect, useRef } from 'react';

const partners = [
  {
    name: "Vodacom",
    logo: "/lovable-uploads/91248e10-df5e-438b-921b-ef568ab46a5e.png"
  },
  {
    name: "TMB",
    logo: "/lovable-uploads/da5b7887-1fdf-4477-a95c-0c1d712d21a3.png"
  },
  {
    name: "Winner.bet",
    logo: "/lovable-uploads/86ea1412-ffcd-449a-87ef-047aade76c0c.png"
  },
  {
    name: "Orange",
    logo: "/lovable-uploads/5e09557e-8cf3-4fa9-bf24-7cde06864046.png"
  },
  {
    name: "Rawsur",
    logo: "/lovable-uploads/cabcce17-6aad-42ec-a44a-bb86e1367334.png"
  },
  {
    name: "Betika",
    logo: "/lovable-uploads/c6513d3c-ef38-41ed-af83-2bae93ca452a.png"
  },
  {
    name: "Sanru",
    logo: "/lovable-uploads/f3c274fa-49bc-4a80-a398-68ce0b262ccd.png"
  },
  {
    name: "RawBank",
    logo: "/lovable-uploads/6986c2f0-fd50-458c-b3ad-9d6e7c0a53e4.png"
  },
  {
    name: "Dover Cosmetics",
    logo: "/lovable-uploads/46fc1ac3-c14c-45be-ade9-2a52b8180cf5.png"
  },
  {
    name: "VOA",
    logo: "/lovable-uploads/476b2987-f0df-4557-9a59-4fc437c3baf8.png"
  }
];

export function PartnersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 1;
    const scrollDelay = 50;

    const scroll = () => {
      if (scrollContainer) {
        scrollAmount += scrollStep;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
        scrollContainer.scrollLeft = scrollAmount;
      }
    };

    const intervalId = setInterval(scroll, scrollDelay);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div 
        ref={scrollRef}
        className="flex gap-8 overflow-hidden"
        style={{ scrollBehavior: 'auto' }}
      >
        {/* Premier ensemble de logos */}
        {partners.map((partner, index) => (
          <div key={`first-${index}`} className="flex-shrink-0">
            <img 
              src={partner.logo} 
              alt={partner.name} 
              className="h-12 opacity-70 hover:opacity-100 transition-opacity object-contain"
            />
          </div>
        ))}
        {/* Duplication pour l'effet de défilement continu */}
        {partners.map((partner, index) => (
          <div key={`second-${index}`} className="flex-shrink-0">
            <img 
              src={partner.logo} 
              alt={partner.name} 
              className="h-12 opacity-70 hover:opacity-100 transition-opacity object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
