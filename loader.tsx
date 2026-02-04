"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

export function Loader() {
  const { t } = useLanguage()

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      {/* Greenish glow background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
        />
      </div>

      {/* Plant growth loader */}
      <div className="relative w-20 h-28 z-10">
        {/* Soil with green glow */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-4 bg-gradient-to-t from-primary/50 to-primary/20 rounded-full"
          animate={{ boxShadow: ["0 0 10px #2E7D32", "0 0 20px #2E7D32", "0 0 10px #2E7D32"] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        />
        
        {/* Growing stem with gradient */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1.5 bg-gradient-to-t from-primary to-secondary rounded-full origin-bottom"
          initial={{ height: 0 }}
          animate={{ height: 56 }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0.5,
          }}
          style={{ boxShadow: "0 0 8px #2E7D32" }}
        />
        
        {/* Leaves with glow */}
        <motion.div
          className="absolute bottom-14 left-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 1.2,
          }}
        >
          {/* Left leaf */}
          <motion.div
            className="absolute w-5 h-7 bg-gradient-to-br from-secondary to-primary/60 rounded-full -left-6 -top-2"
            style={{ transform: "rotate(-45deg)", boxShadow: "0 0 12px #A5D6A7" }}
            animate={{ boxShadow: ["0 0 8px #A5D6A7", "0 0 16px #A5D6A7", "0 0 8px #A5D6A7"] }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
          />
          {/* Right leaf */}
          <motion.div
            className="absolute w-5 h-7 bg-gradient-to-bl from-secondary to-primary/60 rounded-full left-1 -top-2"
            style={{ transform: "rotate(45deg)", boxShadow: "0 0 12px #A5D6A7" }}
            animate={{ boxShadow: ["0 0 8px #A5D6A7", "0 0 16px #A5D6A7", "0 0 8px #A5D6A7"] }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, delay: 0.3 }}
          />
        </motion.div>
      </div>

      {/* Loading text with green glow */}
      <motion.p
        className="mt-8 text-sm font-medium z-10"
        style={{ color: "#2E7D32", textShadow: "0 0 10px rgba(46, 125, 50, 0.5)" }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        {t("loading")}
      </motion.p>
    </div>
  )
}

export function LoaderInline() {
  return (
    <div className="flex items-center justify-center py-8">
      {/* Three green dots loader */}
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 bg-gradient-to-br from-primary to-secondary rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              repeat: Infinity,
              delay: i * 0.15,
            }}
            style={{ boxShadow: "0 0 8px #2E7D32" }}
          />
        ))}
      </div>
    </div>
  )
}

export function LoaderSpinner() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, ease: "linear", repeat: Infinity }}
        style={{ boxShadow: "0 0 12px rgba(46, 125, 50, 0.4)" }}
      />
    </div>
  )
}

export function LoaderPulse() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="w-12 h-12 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
        style={{ boxShadow: "0 0 20px rgba(46, 125, 50, 0.5)" }}
      />
    </div>
  )
}
