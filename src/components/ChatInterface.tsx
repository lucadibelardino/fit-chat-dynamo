import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Send, Bot, User, Loader2, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiEndpoint = import.meta.env.VITE_SUPABASE_EDGE_URL;
  const [showSettings, setShowSettings] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    if (!apiEndpoint) {
      toast({
        title: "Configurazione richiesta",
        description: "Configura l'endpoint API prima di iniziare.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error(`Errore API: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response || data.message || "Risposta non disponibile",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Errore",
        description: error instanceof Error ? error.message : "Errore nella comunicazione con l'API",
        variant: "destructive",
      });
      
      // Remove user message on error
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Settings Panel */}
      {showSettings && (
        <Card className="mb-4 border-primary/50 animate-slide-up">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="h-5 w-5 text-primary" />
              <h3 className="font-bold">Configurazione API</h3>
            </div>
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://api.esempio.com/chat"
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(false)}
                disabled={!apiEndpoint}
              >
                Salva
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Inserisci l'URL del tuo endpoint REST API per l'IA
            </p>
          </CardContent>
        </Card>
      )}

      {/* Messages Area */}
      <Card className="flex-1 flex flex-col border-border">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center animate-slide-up">
              <Bot className="h-16 w-16 text-primary mb-4 animate-pulse-glow" />
              <h3 className="text-xl font-bold mb-2">Assistente IA PowerGym</h3>
              <p className="text-muted-foreground max-w-md">
                Sono qui per aiutarti! Chiedi informazioni su allenamenti, nutrizione, 
                programmi o qualsiasi altra domanda sul fitness.
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 animate-slide-up ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <User className="h-5 w-5 text-accent-foreground" />
                  </div>
                )}
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex gap-3 animate-slide-up">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="bg-secondary text-secondary-foreground rounded-lg p-4">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input Area */}
        <div className="border-t border-border p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Scrivi un messaggio..."
              disabled={isLoading || !apiEndpoint}
              className="flex-1"
            />
            <Button
              type="submit"
              variant="hero"
              size="icon"
              disabled={isLoading || !input.trim() || !apiEndpoint}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </form>
          {!apiEndpoint && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Configura l'endpoint API per iniziare
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ChatInterface;
