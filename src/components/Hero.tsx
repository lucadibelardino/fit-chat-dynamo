import { Button } from "./ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-gym.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 pt-16">
        <div className="max-w-3xl animate-slide-up">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="h-6 w-6 text-primary animate-pulse-glow" />
            <span className="text-sm font-bold text-primary uppercase tracking-wider">
              Trasforma il Tuo Corpo
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Supera i Tuoi
            <br />
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Limiti Ogni Giorno
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            Allenati con i migliori trainer, tecnologie all'avanguardia e un'energia contagiosa. 
            La tua migliore versione ti aspetta.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" className="group">
              Inizia Oggi
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-smooth" />
            </Button>
            <Link to="/ai-assistant">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Prova l'Assistente IA
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Animated Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
