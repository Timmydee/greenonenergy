'use client'
import { Leaf, ShieldCheck, Clock, Zap } from "lucide-react";
import { useState } from "react";

const reasons = [
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Saves Energy, Saves Earth",
    description:
      "Every match we make promotes solar adoption and reduces carbon emissions — helping fight climate change.",
    gradient: "from-green-400 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50",
    shadow: "shadow-green-500/20",
    hoverColor: "hover:bg-green-50",
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Verified Vendors Only",
    description:
      "We vet every vendor manually to ensure you only get matched with trustworthy solar installers and sellers.",
    gradient: "from-blue-400 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
    shadow: "shadow-blue-500/20",
    hoverColor: "hover:bg-blue-50",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Faster Decisions",
    description:
      "With instant solar recommendations via email, you get clear guidance without the stress or confusion.",
    gradient: "from-amber-400 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50",
    shadow: "shadow-amber-500/20",
    hoverColor: "hover:bg-amber-50",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Built for Nigerians",
    description:
      "Tailored to your home or business in Nigeria — we consider real appliances, power issues, and solar loan options.",
    gradient: "from-purple-400 to-violet-500",
    bgGradient: "from-purple-50 to-violet-50",
    shadow: "shadow-purple-500/20",
    hoverColor: "hover:bg-purple-50",
  },
];

export default function WhyChoose() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section 
      id="why-choose" 
      className="relative overflow-hidden"
      style={{ 
        padding: 'var(--section-padding) 0',
        background: 'var(--greenon-tint)'
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-20 w-64 h-64 rounded-full blur-3xl animate-pulse"
             style={{ background: 'linear-gradient(135deg, var(--greenon-light), var(--greenon))' }}></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000"
             style={{ background: 'linear-gradient(135deg, var(--greenon-tint), var(--greenon-light))' }}></div>
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 opacity-10 animate-bounce">
          <Leaf className="w-16 h-16" style={{ color: 'var(--greenon)' }} />
        </div>
        <div className="absolute top-1/3 right-1/3 opacity-10 animate-bounce delay-1000">
          <Zap className="w-12 h-12" style={{ color: 'var(--greenon)' }} />
        </div>
        <div className="absolute bottom-1/4 right-1/4 opacity-10 animate-bounce delay-2000">
          <ShieldCheck className="w-14 h-14" style={{ color: 'var(--greenon)' }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: 'linear-gradient(135deg, var(--greenon), var(--greenon-dark))' }}
            >
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div 
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{ 
                background: 'var(--greenon-light)',
                color: 'var(--greenon-dark)',
                fontFamily: 'var(--font-inter)'
              }}
            >
              Why Choose Us
            </div>
          </div>
          
          <h2 className="h2 mb-6">Why Choose GreenOn</h2>
          <p className="p2 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            We're more than just a calculator — GreenOn helps you save money, power up with clean energy, and connect with people you can trust.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card */}
              <div 
                className={`relative bg-white/95 backdrop-blur-sm border rounded-2xl text-left transition-all duration-500 hover:shadow-2xl ${reason.shadow} hover:scale-105 hover:-translate-y-2 overflow-hidden`}
                style={{ 
                  padding: 'var(--card-padding)',
                  borderColor: 'var(--gray-border)',
                  borderWidth: '1px'
                }}
              >
                {/* Gradient background overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${reason.bgGradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}></div>
                
                {/* Icon container with gradient background */}
                <div className="relative z-10 mb-6">
                  <div 
                    className="inline-flex p-4 rounded-2xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ 
                      background: index === 0 || index === 3 
                        ? 'linear-gradient(135deg, var(--greenon), var(--greenon-dark))'
                        : index === 1
                          ? 'linear-gradient(135deg, #60a5fa, #06b6d4)'
                          : 'linear-gradient(135deg, #fbbf24, #f97316)'
                    }}
                  >
                    <div className="text-white">
                      {reason.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="h4 mb-3 group-hover:opacity-90 transition-opacity">
                    {reason.title}
                  </h3>
                  <p className="p2 group-hover:opacity-90 transition-opacity" style={{ color: 'var(--text-secondary)' }}>
                    {reason.description}
                  </p>
                </div>

                {/* Hover glow effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{ background: 'linear-gradient(135deg, var(--greenon-light), var(--greenon-tint))' }}
                ></div>

                {/* Animated border on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ 
                    background: 'linear-gradient(135deg, var(--greenon), var(--greenon-dark))',
                    padding: '2px',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor'
                  }}
                ></div>
              </div>

              {/* Floating number indicator */}
              <div 
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shadow-lg z-20 transform transition-all duration-300 group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, var(--greenon), var(--greenon-dark))' }}
              >
                <span className="text-sm">{index + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16">
          <div 
            className="inline-flex items-center gap-4 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border"
            style={{ borderColor: 'var(--gray-border)' }}
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                  style={{ 
                    background: i === 0 
                      ? 'linear-gradient(135deg, var(--greenon), var(--greenon-dark))'
                      : i === 1
                        ? 'linear-gradient(135deg, #60a5fa, #06b6d4)'
                        : i === 2
                          ? 'linear-gradient(135deg, #fbbf24, #f97316)'
                          : 'linear-gradient(135deg, #a855f7, #8b5cf6)'
                  }}
                >
                  {i === 0 && <Leaf className="w-5 h-5 text-white" />}
                  {i === 1 && <ShieldCheck className="w-5 h-5 text-white" />}
                  {i === 2 && <Clock className="w-5 h-5 text-white" />}
                  {i === 3 && <Zap className="w-5 h-5 text-white" />}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="h4 mb-1">Ready to go solar?</p>
              <p className="p2" style={{ color: 'var(--text-secondary)' }}>
                Join thousands of Nigerians making the switch
              </p>
            </div>
            <button 
              className="text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ 
                background: 'linear-gradient(135deg, var(--greenon), var(--greenon-dark))',
                fontFamily: 'var(--font-inter)'
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-pulse opacity-30"
            style={{
              background: 'var(--greenon)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>
    </section>
  );
}