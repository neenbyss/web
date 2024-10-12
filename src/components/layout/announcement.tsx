"use client";
import { CloseIcon } from "@/icons/close-icon";
import { motion } from "framer-motion";
import { useState } from "react";

export function Announcement() {
  const [closed, setClosed] = useState(false);

  return (
    <motion.div
      className="absolute top-0 w-full z-20"
      initial={{ y: 0, opacity: 1, display: "block" }}
      animate={{
        y: closed ? "100%" : 0,
        opacity: closed ? 0 : 1,
        display: closed ? "hidden" : "block",
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="relative flex items-center py-2.5 px-20 border-b border-divider bg-primary text-sm">
        <span className="block text-center truncate">
          {" "}
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi soluta
          sequi atque esse rem aspernatur voluptate, fugit beatae, harum
          corrupti eum saepe, consequatur modi dignissimos dolores ducimus
          officiis consequuntur! Possimus. Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Corrupti animi repellat, rerum impedit
          inventore totam. Voluptatum recusandae quae esse modi debitis
          doloribus nisi excepturi explicabo officia. Nobis, quidem? Soluta,
          quod.{" "}
        </span>

        <button
          onClick={() => setClosed(true)}
          className="absolute right-10 block p-1 hover:bg-foreground/10 rounded-sm transition-colors"
        >
          <CloseIcon className="size-5" />
        </button>
      </div>
    </motion.div>
  );
}
