import {
    BoltIcon,
    MailIcon,
    MessageCircleIcon,
    UsersIcon,
  } from "lucide-react";
  
  const steps = [
    {
      title: "Estimate Your Energy Needs",
      icon: <BoltIcon className="w-6 h-6 text-[var(--greenon)]" />,
      description:
        "Use our calculator to select your appliances and get a tailored estimate of your energy consumption.",
    },
    {
      title: "Get Your Summary via Email",
      icon: <MailIcon className="w-6 h-6 text-[var(--greenon)]" />,
      description:
        "Receive a clear, beginner-friendly breakdown of your recommended inverter, solar panel size, and runtime.",
    },
    {
      title: "Reach Us on WhatsApp",
      icon: <MessageCircleIcon className="w-6 h-6 text-[var(--greenon)]" />,
      description:
        "Click the link in your email to message our team directly and request vendor referrals or guidance.",
    },
    {
      title: "Get Matched with Verified Vendors",
      icon: <UsersIcon className="w-6 h-6 text-[var(--greenon)]" />,
      description:
        "We’ll connect you to trusted solar vendors near you that suit your energy needs and budget.",
    },
  ];
  
  export default function HowItWorks() {
    return (
      <section id="how-it-works" className="py-24 bg-[--background]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="h2 mb-4">How GreenOn Works</h2>
          <p className="p2 max-w-2xl mx-auto text-muted-foreground mb-14">
            From calculating your power needs to connecting you with trusted solar vendors — everything happens in minutes.
          </p>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 border border-[--gray-border] shadow-md hover:shadow-lg transition-all duration-300 hover:border-[var(--greenon)]"
              >
                {/* Step number */}
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-[var(--greenon-light)] text-[var(--greenon)] border-2 border-[var(--greenon)] rounded-full flex items-center justify-center font-semibold text-sm shadow-md z-10">
                  {index + 1}
                </div>
  
                {/* Icon */}
                <div className="mb-4">
                  {step.icon}
                </div>
  
                <h3 className="h4 mb-2">{step.title}</h3>
                <p className="p2 text-[--text-secondary]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  