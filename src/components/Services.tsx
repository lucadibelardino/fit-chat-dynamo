import { Card, CardContent } from "./ui/card";
import { Dumbbell, Users, Zap, Heart } from "lucide-react";

const services = [
  {
    icon: Dumbbell,
    title: "Allenamento Personalizzato",
    description: "Programmi su misura creati dai nostri trainer certificati per i tuoi obiettivi specifici.",
  },
  {
    icon: Users,
    title: "Classi di Gruppo",
    description: "Allenati con energia in classi dinamiche: HIIT, CrossFit, Yoga e molto altro.",
  },
  {
    icon: Zap,
    title: "Tecnologia Avanzata",
    description: "Attrezzature all'avanguardia e tracking digitale per monitorare i tuoi progressi.",
  },
  {
    icon: Heart,
    title: "Benessere Totale",
    description: "Programmi nutrizionali e supporto per un percorso completo di trasformazione.",
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Cosa Offriamo
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Servizi completi per portare il tuo fitness al livello successivo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-card border-border hover:border-primary transition-smooth hover:shadow-glow group cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <service.icon className="h-12 w-12 text-primary mb-4 group-hover:animate-pulse-glow transition-smooth" />
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
