import { useState, FormEvent } from "react";
import { Loader2 } from "lucide-react";

const WEBHOOK_URL = "https://YOUR-N8N-WEBHOOK-URL-HERE";

type Status = { type: "idle" | "success" | "error"; message?: string };

const Index = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ type: "idle" });

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      setStatus({ type: "error", message: "⚠️ Please fill in both fields." });
      return;
    }
    if (!isValidEmail(trimmedEmail)) {
      setStatus({ type: "error", message: "⚠️ Please enter a valid email address." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, email: trimmedEmail }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus({ type: "success", message: "✅ Registration received! Check your inbox." });
      setName("");
      setEmail("");
    } catch {
      setStatus({ type: "error", message: "⚠️ Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden px-4 py-10">
      {/* Radial glow background */}
      <div className="pointer-events-none absolute inset-0 bg-radial-glow animate-pulse-glow" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />

      {/* Spacer */}
      <div />

      <main className="relative z-10 w-full max-w-md animate-fade-up">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex flex-col items-center">
            <span className="font-mono-brand text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Belight Tech
            </span>
            <span className="mt-2 h-[2px] w-10 bg-primary shadow-glow" />
          </div>
        </div>

        {/* Card */}
        <div className="relative rounded-2xl bg-card/80 backdrop-blur-xl border border-border shadow-card overflow-hidden">
          {/* Glowing top border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-glow" />

          <div className="p-8 sm:p-10">
            <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-foreground">
              Student{" "}
              <span className="text-primary">Registration</span>
            </h1>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Hosted by Belight Tech · Fill the form to enroll. A confirmation email will be sent to you.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={255}
                  placeholder="jane@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-[hsl(var(--primary-glow))] hover:shadow-glow hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Registration"
                )}
              </button>

              {status.type === "success" && (
                <div className="rounded-lg border border-[hsl(var(--success))]/40 bg-[hsl(var(--success))]/10 px-4 py-3 text-sm text-[hsl(var(--success))] animate-fade-up">
                  {status.message}
                </div>
              )}
              {status.type === "error" && (
                <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive animate-fade-up">
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </main>

      <footer className="relative z-10 mt-10 text-center animate-fade-up-delay">
        <p className="text-xs text-muted-foreground font-mono-brand">
          © 2025 Belight Tech · All rights reserved
        </p>
      </footer>
    </div>
  );
};

export default Index;
