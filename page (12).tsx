"use client"

import { motion } from "framer-motion"
import {
  UserPlus,
  Package,
  CheckCircle2,
  Coins,
  BarChart3,
  ArrowRight,
  ArrowDown,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/language-context"

export default function HowItWorksPage() {
  const { t } = useLanguage()

  const steps = [
    {
      number: 1,
      icon: UserPlus,
      title: t("step1"),
      description: t("step1Desc"),
    },
    {
      number: 2,
      icon: Package,
      title: t("step2"),
      description: t("step2Desc"),
    },
    {
      number: 3,
      icon: CheckCircle2,
      title: t("step3"),
      description: t("step3Desc"),
    },
    {
      number: 4,
      icon: Coins,
      title: t("step4"),
      description: t("step4Desc"),
    },
    {
      number: 5,
      icon: BarChart3,
      title: t("step5"),
      description: t("step5Desc"),
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 bg-secondary/50 text-primary text-sm font-medium rounded-full mb-6">
                {t("howItWorks")}
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
                Simple Steps to Get Started
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join thousands of farmers already benefiting from our platform
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-xl"
            >
              <Image
                src="/images/farmer-collecting-waste.jpg"
                alt="Farmer collecting agricultural waste"
                width={600}
                height={400}
                className="w-full h-[300px] sm:h-[350px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-start gap-6">
                    {/* Step Number */}
                    <div className="flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-14 h-14 sm:w-16 sm:h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg"
                      >
                        <span className="text-xl sm:text-2xl font-bold text-primary-foreground">
                          {step.number}
                        </span>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <step.icon className="w-5 h-5 text-primary flex-shrink-0" />
                        <h3 className="text-xl font-semibold text-foreground">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Connector Arrow */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center py-2"
                  >
                    <ArrowDown className="w-6 h-6 text-primary/40" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Join EcoHarvest?
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Earn Extra Income",
                description:
                  "Convert your agricultural waste into valuable Eco-Coins that can be redeemed for rewards",
              },
              {
                title: "Protect Environment",
                description:
                  "Reduce pollution and contribute to a cleaner, healthier environment for your community",
              },
              {
                title: "Track Your Impact",
                description:
                  "See exactly how much CO2 you've helped reduce with detailed environmental reports",
              },
              {
                title: "Easy to Use",
                description:
                  "Simple, farmer-friendly interface available in Sinhala, Tamil, and English",
              },
              {
                title: "Free to Join",
                description:
                  "No registration fees or hidden costs. Start earning from day one",
              },
              {
                title: "Verified Collection",
                description:
                  "Our verified collectors ensure your waste is properly recycled and processed",
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="p-6 h-full hover:shadow-md transition-shadow duration-300">
                  <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Start?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Join thousands of farmers already making a difference
            </p>
            <Link href="/register">
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block"
              >
                <Button
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-10"
                >
                  {t("register")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
