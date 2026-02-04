"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Package, Upload, Check, Info, AlertCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/lib/language-context"

const wasteTypes = [
  { id: "rice-husk", name: "Rice Husk", coins: 2 },
  { id: "coconut-shells", name: "Coconut Shells", coins: 3 },
  { id: "paddy-straw", name: "Paddy Straw", coins: 2 },
  { id: "banana-stems", name: "Banana Stems", coins: 1.5 },
  { id: "sugarcane-bagasse", name: "Sugarcane Bagasse", coins: 2.5 },
  { id: "other", name: "Other", coins: 1 },
]

export default function SubmitWastePage() {
  const { t } = useLanguage()
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [amount, setAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Mock agreement status - in real app, fetch from API
  const hasActiveAgreement = true // Change to false to test no-agreement state
  const agreementRemainingQuantity = 375

  const selectedWaste = wasteTypes.find((w) => w.id === selectedType)
  const estimatedCoins = selectedWaste
    ? Math.round(parseFloat(amount || "0") * selectedWaste.coins)
    : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedType || !amount) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Submission Received!
            </h2>
            <p className="text-muted-foreground mb-6">
              Your waste submission has been received and is pending
              verification. You'll earn approximately{" "}
              <span className="text-primary font-semibold">
                {estimatedCoins} Eco-Coins
              </span>{" "}
              once verified.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => {
                  setIsSubmitted(false)
                  setSelectedType(null)
                  setAmount("")
                }}
                className="bg-primary text-primary-foreground"
              >
                Submit Another
              </Button>
              <Button variant="outline" asChild>
                <a href="/dashboard/submissions">View Submissions</a>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

  // If no active agreement, show notice
  if (!hasActiveAgreement) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 text-center border-accent/30 bg-accent/5">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-accent-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Agreement Required
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {t("noActiveAgreement")}
            </p>
            <Link href="/dashboard/agreement">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                {t("createAgreement")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {t("submitWaste")}
        </h1>
        <p className="text-muted-foreground mt-1">
          Log your agricultural waste to earn Eco-Coins
        </p>
      </motion.div>

      {/* Agreement Remaining Quantity Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-primary" />
            <p className="text-sm text-foreground">
              <span className="font-medium">{t("remainingQuantity")}:</span>{" "}
              <span className="text-primary font-semibold">{agreementRemainingQuantity} kg</span>{" "}
              available in your current agreement
            </p>
          </div>
        </Card>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Waste Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6">
            <Label className="text-base font-semibold mb-4 block">
              Select Waste Type
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {wasteTypes.map((type) => (
                <motion.button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    selectedType === type.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Package
                      className={`w-5 h-5 ${
                        selectedType === type.id
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                    {selectedType === type.id && (
                      <Check className="w-4 h-4 text-primary ml-auto" />
                    )}
                  </div>
                  <p className="font-medium text-foreground text-sm">
                    {type.name}
                  </p>
                  <p className="text-xs text-primary mt-1">
                    {type.coins} coins/kg
                  </p>
                </motion.button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Amount & Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (kg)</Label>
              <Input
                id="amount"
                type="number"
                min="1"
                step="0.5"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter weight in kilograms"
                className="focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Pickup Location</Label>
              <Input
                id="location"
                placeholder="Enter your farm address"
                className="focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                rows={3}
                placeholder="Any special instructions or details"
                className="focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label>Upload Photo (Optional)</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Estimate Card */}
        {selectedType && amount && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 bg-secondary/30 border-primary/20">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">
                    Estimated Earnings
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on {amount} kg of {selectedWaste?.name}, you'll earn
                    approximately{" "}
                    <span className="text-primary font-semibold">
                      {estimatedCoins} Eco-Coins
                    </span>{" "}
                    after verification.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              disabled={!selectedType || !amount || isSubmitting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                  />
                  Submitting...
                </span>
              ) : (
                <>
                  <Package className="w-5 h-5 mr-2" />
                  {t("submitWaste")}
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>
      </form>
    </div>
  )
}
