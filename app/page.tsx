import Link from "next/link";
import { ArrowRight, ShieldCheck, CreditCard, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <header className="w-full flex justify-between items-center px-8 py-6 max-w-6xl mx-auto">
        <div className="font-bold text-2xl tracking-tighter">VaultPaySafe</div>
        <nav className="flex gap-6 items-center font-medium">
          <Link href="/login" className="hover:text-muted transition-colors">Login</Link>
          <Link href="/signup" className="bg-primary text-white px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all">Open Account</Link>
        </nav>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-8 flex flex-col justify-center items-start pt-20 pb-32">
        <div className="max-w-3xl">
          <h1 className="text-6xl sm:text-8xl font-semibold tracking-[-0.04em] leading-[1.1] mb-8">
            Banking with absolute precision.
          </h1>
          <p className="text-xl text-muted mb-12 max-w-xl leading-relaxed">
            Experience high-utility minimalism. Virtual accounts in USD and EUR. Instant virtual cards. Secure, fast, and relentlessly reliable.
          </p>
          <div className="flex gap-4">
            <Link href="/signup" className="bg-primary text-white px-8 py-4 rounded-full text-lg font-medium flex items-center gap-2 hover:bg-primary/90 transition-transform hover:scale-[0.98]">
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/admin" className="bg-surface-container text-foreground px-8 py-4 rounded-full text-lg font-medium hover:bg-surface-dim transition-transform hover:scale-[0.98]">
              Admin Panel
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full">
          <FeatureCard 
            icon={<ShieldCheck className="w-8 h-8 text-accent-blue" />}
            title="Ironclad Security"
            description="Your funds are protected with bank-grade encryption and configurable withdrawal locks."
          />
          <FeatureCard 
            icon={<Globe className="w-8 h-8 text-accent-blue" />}
            title="Global Accounts"
            description="Instantly generate virtual account numbers in USD and EUR to receive international payments."
          />
          <FeatureCard 
            icon={<CreditCard className="w-8 h-8 text-accent-blue" />}
            title="Virtual Cards"
            description="Create active virtual cards instantly for secure online transactions across the globe."
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-[24px] bg-white border border-[#E7E8EA]">
      <div className="w-14 h-14 bg-accent-blueSoft rounded-full flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted leading-relaxed">{description}</p>
    </div>
  )
}
