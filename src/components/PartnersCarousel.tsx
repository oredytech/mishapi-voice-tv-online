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
  },
  {
    name: "RT",
    logo: "/lovable-uploads/8972c0f7-2b1a-473a-8a37-dae2d6195119.png"
  },
  {
    name: "IGF",
    logo: "/lovable-uploads/7f2a4b07-0e4d-4e01-a1f0-4f38382fc6f5.png"
  },
  {
    name: "Angel Cosmetics",
    logo: "/lovable-uploads/8b3f571d-0f37-4c79-af87-3d674966cad0.png"
  },
  {
    name: "FONAREV",
    logo: "/lovable-uploads/3711706f-65ec-4e29-8a33-90caf47f2903.png"
  },
  {
    name: "Kanny",
    logo: "/lovable-uploads/b3108f2c-b03b-4676-9ede-91ffcd769003.png"
  },
  {
    name: "SUNU Group",
    logo: "/lovable-uploads/d3812958-4569-42ff-b2c6-72fc28c4c007.png"
  },
  {
    name: "HEAL Africa",
    logo: "/lovable-uploads/9d2563ba-a254-4134-b947-b6b3b65127b3.png"
  },
  {
    name: "SNEL",
    logo: "/lovable-uploads/64224176-889b-4649-88bd-829ca56c4bb4.png"
  },
  {
    name: "Africell",
    logo: "/lovable-uploads/87874423-6c71-4f6e-8b2d-796ebfde77d5.png"
  },
  {
    name: "World Vision",
    logo: "/lovable-uploads/b513f2a4-7cf2-4e4b-8c72-375d7a7d00c2.png"
  },
  {
    name: "CMG",
    logo: "/lovable-uploads/6bdd0fdc-29f3-4482-ac94-ad0180083c2c.png"
  },
  {
    name: "GM Tours and Travel",
    logo: "/lovable-uploads/450ac773-bbbb-47d2-bb37-8433d91855a8.png"
  },
  {
    name: "Brasimba",
    logo: "/lovable-uploads/3b3a81a2-ea61-4e9f-a9e8-bd127234cbe8.png"
  },
  {
    name: "Eyano Santé Clinic",
    logo: "/lovable-uploads/375a772f-40eb-4be9-8634-9f5c42d35435.png"
  },
  {
    name: "REGIDESO",
    logo: "/lovable-uploads/5799d11d-b37d-4bf0-b425-f24b6c2be34a.png"
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
