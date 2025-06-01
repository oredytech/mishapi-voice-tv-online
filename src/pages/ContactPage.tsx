
import { Helmet } from "react-helmet-async";
import { ContactSection } from "@/components/ContactSection";

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact - MISHAPI VOICE TV</title>
        <meta name="description" content="Contactez MISHAPI VOICE TV - Votre chaîne de référence dans l'Est de la RDC" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container-custom py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nous sommes à votre écoute. N'hésitez pas à nous contacter pour toute question, 
              suggestion ou collaboration.
            </p>
          </div>
        </div>
        
        <ContactSection />
      </div>
    </>
  );
}
