"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Package,
  MapPin,
  Calendar,
  DollarSign,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  History,
  Leaf,
  Info,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLanguage } from "@/lib/language-context"

type AgreementStatus = "none" | "pending" | "active" | "expired" | "rejected"

export default function AgreementPage() {
  const { t, language } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // Form state
  const [wasteType, setWasteType] = useState("")
  const [quantity, setQuantity] = useState(100)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [location, setLocation] = useState("")

  // Mock current agreement status - in real app, fetch from API
  const [currentAgreement, setCurrentAgreement] = useState<{
    status: AgreementStatus
    wasteType?: string
    declaredQuantity?: number
    remainingQuantity?: number
    startDate?: string
    endDate?: string
  }>({
    status: "none", // Change to "active", "pending", etc. to test different states
  })

  const wasteTypes = [
    { value: "paddy-straw", label: t("paddyStraw") },
    { value: "rice-husk", label: t("riceHusk") },
    { value: "coconut-shells", label: t("coconutShells") },
    { value: "sugarcane", label: t("sugarcaneWaste") },
  ]

  const handleSubmit = async () => {
    if (!agreedToTerms || !wasteType || !quantity || !startDate || !endDate || !location) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setCurrentAgreement({
      status: "pending",
      wasteType: wasteTypes.find((w) => w.value === wasteType)?.label,
      declaredQuantity: quantity,
      remainingQuantity: quantity,
      startDate,
      endDate,
    })

    setIsSubmitting(false)
    setShowSuccess(true)

    setTimeout(() => setShowSuccess(false), 3000)
  }

  const usedPercentage =
    currentAgreement.declaredQuantity && currentAgreement.remainingQuantity
      ? Math.round(
          ((currentAgreement.declaredQuantity - currentAgreement.remainingQuantity) /
            currentAgreement.declaredQuantity) *
            100
        )
      : 0

  // If farmer has an active or pending agreement, show status card
  if (currentAgreement.status !== "none") {
    return (
      <div className="space-y-6 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t("myAgreement")}</h1>
            <p className="text-muted-foreground mt-1">
              {currentAgreement.status === "pending"
                ? t("pendingApproval")
                : currentAgreement.status === "active"
                  ? t("active")
                  : t("expired")}
            </p>
          </div>
          <Link href="/dashboard/agreement/history">
            <Button variant="outline" className="gap-2 bg-transparent">
              <History className="w-4 h-4" />
              {t("agreementHistory")}
            </Button>
          </Link>
        </div>

        {/* Success Animation */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-4 bg-primary/10 border-primary/20">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <p className="text-sm font-medium text-primary">
                    {t("agreementSubmitted")}
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Agreement Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 border-2 border-primary/20">
            {/* Status Badge */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    currentAgreement.status === "active"
                      ? "bg-primary/10"
                      : currentAgreement.status === "pending"
                        ? "bg-accent/20"
                        : "bg-muted"
                  }`}
                >
                  {currentAgreement.status === "active" ? (
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  ) : currentAgreement.status === "pending" ? (
                    <Clock className="w-6 h-6 text-accent-foreground" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    {t("agreementStatus")}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {currentAgreement.wasteType}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1.5 text-sm font-medium rounded-full ${
                  currentAgreement.status === "active"
                    ? "bg-primary/10 text-primary"
                    : currentAgreement.status === "pending"
                      ? "bg-accent/20 text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {currentAgreement.status === "active"
                  ? t("active")
                  : currentAgreement.status === "pending"
                    ? t("pending")
                    : t("expired")}
              </span>
            </div>

            {/* Quantity Progress */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("declaredQuantity")}</span>
                <span className="font-medium text-foreground">
                  {currentAgreement.declaredQuantity} kg
                </span>
              </div>
              <Progress value={usedPercentage} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  {t("usedQuantity")}:{" "}
                  {(currentAgreement.declaredQuantity || 0) -
                    (currentAgreement.remainingQuantity || 0)}{" "}
                  kg
                </span>
                <span>
                  {t("remainingQuantity")}: {currentAgreement.remainingQuantity} kg
                </span>
              </div>
            </div>

            {/* Date Range */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>
                {currentAgreement.startDate} - {currentAgreement.endDate}
              </span>
            </div>
          </Card>
        </motion.div>

        {/* Pending Notice */}
        {currentAgreement.status === "pending" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-4 bg-accent/10 border-accent/20">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-accent-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {t("pendingApproval")}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your agreement is being reviewed by the platform team. You will receive a notification once approved.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    )
  }

  // No agreement - show declaration form
  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("wasteDeclaration")}</h1>
          <p className="text-muted-foreground mt-1">
            Declare your available agricultural waste
          </p>
        </div>
        <Link href="/dashboard/agreement/history">
          <Button variant="outline" className="gap-2 bg-transparent">
            <History className="w-4 h-4" />
            {t("agreementHistory")}
          </Button>
        </Link>
      </div>

      {/* Section 1: Waste Declaration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">{t("wasteDeclaration")}</h2>
          </div>

          <div className="space-y-5">
            {/* Waste Type */}
            <div className="space-y-2">
              <Label>{t("wasteType")}</Label>
              <Select value={wasteType} onValueChange={setWasteType}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select waste type" />
                </SelectTrigger>
                <SelectContent>
                  {wasteTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label>{t("estimatedQuantity")} (kg)</Label>
              <div className="flex items-center gap-4">
                <Input
                  type="range"
                  min="10"
                  max="1000"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-24 bg-background"
                />
              </div>
            </div>

            {/* Availability Period */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("startDate")}</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label>{t("endDate")}</Label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-background"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label>{t("collectionLocation")}</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Enter your farm location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Section 2: Pricing & Conditions (Read-Only) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 bg-muted/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">{t("pricingConditions")}</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card">
              <DollarSign className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">{t("pricePerKg")}</p>
                <p className="font-medium text-foreground">Rs. 5.00 - 8.00</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card">
              <Leaf className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">{t("paymentMethod")}</p>
                <p className="font-medium text-foreground">{t("mixedPayment")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card">
              <Truck className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">{t("collectionResponsibility")}</p>
                <p className="font-medium text-foreground">Platform Team</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">{t("qualityRequirements")}</p>
                <p className="font-medium text-foreground">Dry, Clean</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Section 3: Agreement Confirmation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {t("agreement")}
          </h2>

          {/* Legal Terms */}
          <div className="p-4 rounded-xl bg-muted/50 mb-6 text-sm text-muted-foreground leading-relaxed">
            {language === "si" ? (
              <p>{t("legalTermsSi")}</p>
            ) : (
              <p>{t("legalTermsEn")}</p>
            )}
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-3 mb-6">
            <Checkbox
              id="agree"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              className="mt-0.5"
            />
            <Label htmlFor="agree" className="text-sm leading-relaxed cursor-pointer">
              {t("agreeToTerms")}
            </Label>
          </div>

          {/* Submit Button */}
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              onClick={handleSubmit}
              disabled={
                !agreedToTerms ||
                !wasteType ||
                !quantity ||
                !startDate ||
                !endDate ||
                !location ||
                isSubmitting
              }
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                />
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  {t("submitAgreement")}
                </>
              )}
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}
