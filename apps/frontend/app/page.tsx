
"use client"

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Arrow7 from "@/components/svg";

export default function Index() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  const phrases = [" call with Six", " introduction"];

  useEffect(() => {
    const handleTyping = () => {
      const currentIndex = loopNum % phrases.length;
      const fullText = phrases[currentIndex];

      const updatedText = isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }

      setTypingSpeed(isDeleting ? 60 : 25);
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, phrases]);

  const scrollToSection = () => {
    scrollSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-[30vh] min-h-scxreen w-full text-center px-4">
        <div className="absolute top-4 right-4 z-10"></div>

        <div className="relative z-10">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-500">
            Six
          </h1>
          <div className="max-w-xl mx-auto">
            <p className="text-xl mb-1">Your AI matchmaker.</p>
            <p className="text-xl mb-4">A friend or a date — you pick</p>
            <div className="h-16 flex items-center justify-center">
              <p className="text-xl font-medium">
                <span>One </span>
                <span
                  className={`bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-500 ${
                    isDeleting ? "invisible" : ""
                  }`}
                >
                  {text}
                  <span className="animate-pulse text-blue-500">|</span>
                </span>
              </p>
            </div>
          </div>

          <div className="relative mt-4">
            <Link href="/prefrence">
              <Button className="rounded-full bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white px-8 py-6 text-lg h-auto">
                Join The Waitlist
              </Button>
            </Link>
            <div className="absolute left-2/4  top-[200%] w-2/4">(you can also scroll for more info)</div>
            <div className="absolute   top-full  left-1/3  ">  <Arrow7 className="rotate-stroke-fuchsia-500 fill-fuchsia-500" style={{transform:'rotateY(45deg)'}}/>
            </div>
            {/* Arrow positioning restored to original but with increased size */}
          
          </div>
        </div>
      </section>
      <section
        ref={scrollSectionRef}
        className="mt-80 w-full max-w-3xl mx-auto px-6 py-16 pt-0 flex flex-col justify-center relative"
      >
        <div className="space-y-8 text-left max-w-2xl mx-auto">
          {/* Text content */}
          <div className="w-full">
            <div className="relative w-full">
              <img
                src="/text.jpg" 
                alt="Six AI matchmaker description"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot Widget Placeholder */}
      <div className="fixed bottom-4 right-4 z-50"></div>
    </main>
  );
}