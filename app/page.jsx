import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Calendar } from "lucide-react";

export default function Home() {
  return (
   
    <section className="relative w-full pt-4 md:pt-8 pb-20 -mt-10">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        
        {/* LEFT CONTENT - Now tightly aligned to the left */}
        <div className="flex flex-col items-start text-left space-y-5 md:space-y-7 mx-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-xs font-medium text-purple-200 tracking-wide">
              The Ultimate Event Experience
            </span>
          </div>

          {/* Heading - Left Aligned */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[1.1] text-left">
            Create <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Moments
            </span>
          </h1>

          <p className="max-w-md text-lg text-gray-400 leading-relaxed text-left">
            Spott gives you the stage to host unforgettable events. 
            Join a community of creators building the next generation of meetups.
          </p>

          {/* Buttons - Left Aligned */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/explore" className="w-full sm:w-auto">
              <Button size="xl" className="w-full sm:w-auto rounded-full px-8 h-12 text-md font-bold bg-purple-600 hover:bg-purple-500 text-white transition-all border-none">
                Start Hosting <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/events" className="w-full sm:w-auto">
              <Button variant="outline" size="xl" className="w-full sm:w-auto rounded-full px-8 h-12 text-md font-semibold border-white/10 hover:bg-white/5 text-white">
                Browse Events
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 pt-4">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">50k+</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Attendees</span>
            </div>
            <div className="h-8 w-[1px] bg-gray-800" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">1k+</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Events</span>
            </div>
          </div>
        </div>

        {/* RIGHT*/}
        <div className="relative group flex flex-col lg:flex justify-end items-center pt-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-[2.5rem] blur-2xl" />
          
          <div className="relative w-[450px] aspect-square rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900/50">
            <Image 
              src="/hero.png"
              alt="Spott Platform"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}