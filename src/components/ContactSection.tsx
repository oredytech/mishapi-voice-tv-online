
import { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Message envoyé",
        description: "Merci de nous avoir contactés. Nous vous répondrons dès que possible.",
      });
      formRef.current?.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-12 bg-muted/30">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title text-center mb-8">Contactez-nous</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Coordonnées */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Nos coordonnées</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-muted-foreground">Goma, République Démocratique du Congo</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">mishapivoicetv.adg@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <div>
                    <p className="font-medium">Téléphones</p>
                    <p className="text-muted-foreground">+243 971 121 702</p>
                    <p className="text-muted-foreground">+243 852 920 441</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m6 8 4 4 4-4"/>
                  </svg>
                  <div>
                    <p className="font-medium">Télévision</p>
                    <p className="text-muted-foreground">CANAL+ (canal 373)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Envoyez-nous un message</h3>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                action="https://formsubmit.co/mishapivoicetv.adg@gmail.com"
                method="POST"
                className="space-y-4"
              >
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value="/merci" />

                <Input
                  name="name"
                  placeholder="Votre nom"
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Votre email"
                  required
                />
                <Input
                  name="subject"
                  placeholder="Sujet"
                  required
                />
                <Textarea
                  name="message"
                  placeholder="Votre message"
                  rows={5}
                  required
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
