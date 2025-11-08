import Navigation from "@/components/Navigation";
import ChatInterface from "@/components/ChatInterface";
import { Sparkles } from "lucide-react";

const AIAssistant = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-slide-up">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary animate-pulse-glow" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Assistente <span className="bg-gradient-hero bg-clip-text text-transparent">IA</span>
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Il tuo personal trainer virtuale sempre disponibile. Chiedi consigli su allenamenti, 
              nutrizione e benessere.
            </p>
          </div>

          {/* Chat Interface */}
          <div className="h-[600px] animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <ChatInterface />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIAssistant;
