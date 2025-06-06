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
            <div>{/* ... même contenu que dans ton code actuel ... */}</div>

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
