import { LeafIcon, ShieldCheckIcon, ClockIcon, ZapIcon } from "lucide-react";

const reasons = [
  {
    icon: <LeafIcon className="w-6 h-6 text-[var(--greenon)]" />,
    title: "Saves Energy, Saves Earth",
    description:
      "Every match we make promotes solar adoption and reduces carbon emissions — helping fight climate change.",
  },
  {
    icon: <ShieldCheckIcon className="w-6 h-6 text-[var(--greenon)]" />,
    title: "Verified Vendors Only",
    description:
      "We vet every vendor manually to ensure you only get matched with trustworthy solar installers and sellers.",
  },
  {
    icon: <ClockIcon className="w-6 h-6 text-[var(--greenon)]" />,
    title: "Faster Decisions",
    description:
      "With instant solar recommendations via email, you get clear guidance without the stress or confusion.",
  },
  {
    icon: <ZapIcon className="w-6 h-6 text-[var(--greenon)]" />,
    title: "Built for Nigerians",
    description:
      "Tailored to your home or business in Nigeria — we consider real appliances, power issues, and solar loan options.",
  },
];

export default function WhyChoose() {
  return (
    <section id="why-choose" className="py-24 bg-[--greenon-tint]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="h2 mb-4">Why Choose GreenOn</h2>
        <p className="p2 max-w-xl mx-auto mb-12 text-[--text-secondary]">
          We’re more than just a calculator — GreenOn helps you save money, power up with clean energy, and connect with people you can trust.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white border border-[--gray-border] rounded-xl p-6 text-left hover:shadow-md transition"
            >
              <div className="mb-4">{reason.icon}</div>
              <h3 className="h4 mb-2">{reason.title}</h3>
              <p className="p2 text-[--text-secondary]">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
