'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Zap, Sun, Calculator } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden md:mt-6 mt-10" style={{
      background: `linear-gradient(135deg, var(--greenon-tint) 0%, var(--greenon-light) 50%, #f0fdf4 100%)`
    }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full opacity-10 animate-bounce delay-500" style={{backgroundColor: `var(--greenon)`}}></div>
      </div>
      
      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sun className="absolute top-1/4 left-1/4 text-yellow-400 w-8 h-8 animate-spin opacity-60" style={{animationDuration: '20s'}} />
        <Zap className="absolute top-1/3 right-1/3 w-6 h-6 animate-pulse" style={{color: `var(--greenon)`}} />
        {/* <Calculator className="absolute bottom-1/4 left-1/3 w-7 h-7 animate-bounce" style={{color: `var(--greenon-dark)`}} /> */}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-12 lg:py-20">
          
          {/* Left: Enhanced Text Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border shadow-sm hover:shadow-md transition-all duration-300" style={{
              backgroundColor: `var(--greenon-light)`,
              color: `var(--greenon-dark)`,
              borderColor: `var(--greenon)`
            }}>
              <Zap className="w-4 h-4 mr-2" />
              Nigeria's #1 Solar Calculator
            </div>
            
            {/* Main Heading */}
            <h1 className="h1 leading-tight">
              <span className="bg-gradient-to-r bg-clip-text text-transparent animate-gradient" style={{
                backgroundImage: `linear-gradient(90deg, var(--greenon), var(--greenon-dark), var(--greenon))`
              }}>
                Empowering Nigerians
              </span>
              <br />
              <span style={{color: `var(--text-main)`}}>
                with Smart Solar Solutions
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="p3 max-w-2xl leading-relaxed">
              GreenOn helps you calculate your exact solar & inverter needs and connects you to 
              <span className="font-semibold" style={{color: `var(--greenon)`}}> trusted vendors</span> and 
              <span className="font-semibold" style={{color: `var(--greenon-dark)`}}> financing options</span>.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{backgroundColor: `var(--greenon)`}}></div>
                <span className="p2">10,000+ Calculations</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full animate-pulse delay-300" style={{backgroundColor: `var(--greenon-dark)`}}></div>
                <span className="p2">500+ Vendors</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full animate-pulse delay-600" style={{backgroundColor: `var(--greenon)`}}></div>
                <span className="p2">All 36 States</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/estimator" className="group">
                <Button 
                  size="lg" 
                  className="text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, var(--greenon), var(--greenon-dark))`,
                    fontFamily: `var(--font-inter)`
                  }}
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Solar Needs
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              {/* <Link href="/learn" className="group">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-6 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  style={{
                    borderColor: `var(--greenon)`,
                    color: `var(--greenon)`,
                    fontFamily: `var(--font-inter)`
                  }}
                >
                  Learn More
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link> */}
            </div>
            
          </div>
          
          {/* Right: Enhanced Image Section */}
          <div className="relative lg:order-last order-first">
            <div className="relative group">
              {/* Decorative elements */}
              <div className="absolute -inset-4 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity blur-xl" style={{
                background: `linear-gradient(135deg, var(--greenon), var(--greenon-dark))`
              }}></div>
              <div className="absolute -inset-2 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity" style={{
                background: `linear-gradient(135deg, var(--greenon), var(--greenon-dark))`
              }}></div>
              
              {/* Main image container */}
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
                <div className="aspect-w-16 aspect-h-12 sm:aspect-w-4 sm:aspect-h-3">
                  <Image
                    src="/solar2.webp"
                    alt="Solar panels and modern home in Nigeria"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                
                {/* Overlay content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                
                {/* Floating card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="p2">Average Monthly Savings</p>
                      <p className="h4" style={{color: `var(--greenon)`, fontSize: '24px'}}>₦45,000</p>
                    </div>
                    <div className="p-3 rounded-full" style={{backgroundColor: `var(--greenon-light)`}}>
                      <Sun className="w-6 h-6" style={{color: `var(--greenon)`}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
    </div>
  );
}