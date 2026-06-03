import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, MessageSquare, Send } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [sending, setSending] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSending(true);
    // Simulate send delay for UX
    setTimeout(() => {
      setSending(false);
      toast({
        title: "Message sent",
        description: `Thanks, ${name.trim()}. We will get back to you soon.`,
      });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 900);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="py-14 md:py-20 bg-card/50 border-b border-border/50">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
                Get in Touch
              </p>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.05]">
                Contact us
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl mt-5 leading-relaxed">
                Have a question about a recipe, a correction, or just want to
                say hello? We read every message.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-4 md:px-6 py-14 md:py-20">
          <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12 md:gap-16">
            {/* Contact info */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-5 h-5 text-primary" />
                  <h2 className="font-serif text-xl font-semibold">
                    Email us
                  </h2>
                </div>
                <p className="text-foreground/85 leading-relaxed text-sm">
                  hello@southspice.recipes
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  We aim to respond within 48 hours.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h2 className="font-serif text-xl font-semibold">
                    Kitchens
                  </h2>
                </div>
                <p className="text-foreground/85 leading-relaxed text-sm">
                  Chennai, Tamil Nadu
                </p>
                <p className="text-foreground/85 leading-relaxed text-sm">
                  Kochi, Kerala
                </p>
                <p className="text-foreground/85 leading-relaxed text-sm">
                  Hyderabad, Telangana
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h2 className="font-serif text-xl font-semibold">
                    Recipe corrections
                  </h2>
                </div>
                <p className="text-foreground/85 leading-relaxed text-sm">
                  If you spot an error in a recipe, mention the recipe name
                  and the step in your message. We verify and update quickly.
                </p>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="md:col-span-3 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Name
                  </label>
                  <Input
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="h-11 rounded-xl"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="h-11 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium mb-1.5"
                >
                  Subject
                </label>
                <Input
                  id="contact-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What is this about?"
                  className="h-11 rounded-xl"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium mb-1.5"
                >
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message..."
                  required
                  className="min-h-[140px] rounded-xl resize-none"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={sending || !name.trim() || !email.trim() || !message.trim()}
                  className="rounded-full gap-2"
                >
                  <Send className="w-4 h-4" />
                  {sending ? "Sending..." : "Send message"}
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
