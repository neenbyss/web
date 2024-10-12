"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TopIcon } from "@/icons/top-icon";
import { Button } from "@/components/common/button";

export function TopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        display: isVisible ? "block" : "none",
        y: isVisible ? 0 : 50,
        rotate: isVisible ? 0 : 20,
      }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <Button
        isIconOnly
        onClick={scrollToTop}
        variant="shadow"
        color="secondary"
        className="hover:scale-125 active:scale-50 active:duration-0 backdrop-blur-3xl"
      >
        <TopIcon />
      </Button>
    </motion.div>
  );
}
