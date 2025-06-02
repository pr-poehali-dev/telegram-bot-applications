import { Card } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-rubik">
            Оставьте заявку
          </h1>
          <p className="text-lg text-muted-foreground font-rubik">
            Мы получим ваше сообщение в Telegram и свяжемся с вами
          </p>
        </div>

        <Card className="p-8 shadow-xl animate-scale-in">
          <ContactForm />
        </Card>
      </div>
    </section>
  );
};

export default HeroSection;
