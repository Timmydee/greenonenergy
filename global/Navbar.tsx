'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Zap, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#vendors', label: 'Vendors' },
  { href: '#support', label: 'Support' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b' 
        : 'bg-white/80 backdrop-blur-sm'
    }`} style={{
      borderColor: scrolled ? 'var(--gray-border)' : 'transparent'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-2">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300" style={{
                background: `linear-gradient(135deg, var(--greenon), var(--greenon-dark))`
              }}>
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" style={{
                background: `linear-gradient(135deg, var(--greenon), var(--greenon-dark))`
              }}></div>
            </div>
            <span className="text-xl lg:text-2xl font-bold transition-colors duration-300" style={{
              color: `var(--greenon)`,
              fontFamily: `var(--font-gelasio)`
            }}>
              GreenOn Energy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group px-3 py-2 text-sm font-medium transition-colors duration-300 hover:scale-105 transform"
                style={{
                  color: `var(--text-secondary)`,
                  fontFamily: `var(--font-inter)`
                }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{
                  backgroundColor: `var(--greenon)`
                }}></span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-sm font-medium transition-colors duration-300"
              style={{
                color: `var(--text-secondary)`,
                fontFamily: `var(--font-inter)`
              }}
            >
              <Link href="/login">Sign In</Link>
            </Button>
            
            <Link href="/estimator" className="group">
              <Button 
                size="sm"
                className="px-6 py-2 text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, var(--greenon), var(--greenon-dark))`,
                  color: 'white',
                  fontFamily: `var(--font-inter)`
                }}
              >
                <Zap className="w-4 h-4 mr-1.5" />
                Estimate Now
                <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  <Menu className="h-5 w-5" style={{color: `var(--text-main)`}} />
                </Button>
              </SheetTrigger>
              
              <SheetContent side="right" className="w-80 p-0 bg-white border-l" style={{
                borderColor: `var(--gray-border)`
              }}>
                <div className="flex flex-col h-full">
                  
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-6 border-b" style={{
                    borderColor: `var(--gray-border)`
                  }}>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{
                        background: `linear-gradient(135deg, var(--greenon), var(--greenon-dark))`
                      }}>
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-lg font-bold" style={{
                        color: `var(--greenon)`,
                        fontFamily: `var(--font-gelasio)`
                      }}>
                        GreenOn
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setOpen(false)}
                      className="w-8 h-8 rounded-lg hover:bg-gray-100"
                    >
                      <X className="h-4 w-4" style={{color: `var(--text-secondary)`}} />
                    </Button>
                  </div>
                  
                  {/* Mobile Navigation */}
                  <nav className="flex-1 px-6 py-8 space-y-6">
                    {navLinks.map((link, index) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block py-3 text-lg font-medium transition-colors duration-300 hover:translate-x-2 transform"
                        style={{
                          color: `var(--text-main)`,
                          fontFamily: `var(--font-inter)`,
                          animationDelay: `${index * 100}ms`
                        }}
                      >
                        {link.label}
                      </Link>
                    ))}
                    
                    <div className="pt-6 space-y-4">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-left p-3 text-lg font-medium"
                        style={{
                          color: `var(--text-secondary)`,
                          fontFamily: `var(--font-inter)`
                        }}
                      >
                        <Link href="/login">Sign In</Link>
                      </Button>
                      
                      <Link href="/estimator" className="block">
                        <Button 
                          className="w-full py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                          style={{
                            background: `linear-gradient(135deg, var(--greenon), var(--greenon-dark))`,
                            color: 'white',
                            fontFamily: `var(--font-inter)`
                          }}
                        >
                          <Zap className="w-5 h-5 mr-2" />
                          Get Solar Estimate
                          <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </nav>
                  
                  {/* Mobile Footer */}
                  <div className="p-6 border-t" style={{
                    borderColor: `var(--gray-border)`,
                    backgroundColor: `var(--greenon-tint)`
                  }}>
                    <div className="text-center">
                      <p className="text-sm" style={{
                        color: `var(--text-secondary)`,
                        fontFamily: `var(--font-inter)`
                      }}>
                        Powering Nigeria's Solar Future
                      </p>
                    </div>
                  </div>
                  
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
        </div>
      </div>
    </header>
  );
}