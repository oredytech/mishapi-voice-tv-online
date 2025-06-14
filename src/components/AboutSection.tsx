
export function AboutSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center mb-12">À propos de nous</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="À propos de MISHAPI VOICE TV"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            
            {/* Contenu */}
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold mb-6 text-primary">
                La vision Africaine dans le Monde
              </h3>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  MISHAPI VOICE TV est une chaîne de télévision et radio basée à Goma, 
                  en République Démocratique du Congo, qui s'engage à promouvoir 
                  la vision africaine à travers le monde.
                </p>
                
                <p>
                  Nous nous consacrons à l'information, au divertissement et à l'éducation 
                  de nos communautés locales et de la diaspora africaine. Notre mission 
                  est de donner une voix authentique aux réalités africaines et de 
                  contribuer au développement socio-économique de notre continent.
                </p>
                
                <p>
                  Avec nos programmes diversifiés allant de l'actualité aux débats 
                  politiques, en passant par la culture et la musique, nous offrons 
                  une programmation riche qui reflète la diversité et la richesse 
                  de l'Afrique.
                </p>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Nos valeurs</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Authenticité et intégrité journalistique
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Promotion de la culture africaine
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Éducation et sensibilisation des communautés
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Connexion de la diaspora africaine
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
