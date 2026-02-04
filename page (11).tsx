"use client"

import { motion } from "framer-motion"
import {
  Package,
  Coins,
  Leaf,
  TrendingUp,
  ArrowRight,
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/lib/language-context"

export default function DashboardPage() {
  const { t } = useLanguage()

  // Mock agreement data - change status to test different states
  const currentAgreement = {
    status: "active" as "none" | "pending" | "active" | "expired",
    wasteType: "Paddy Straw (Piduru)",
    declaredQuantity: 500,
    remainingQuantity: 375,
    startDate: "2026-02-01",
    endDate: "2026-04-30",
  }

  const usedPercentage = currentAgreement.status !== "none"
    ? Math.round(
        ((currentAgreement.declaredQuantity - currentAgreement.remainingQuantity) /
          currentAgreement.declaredQuantity) *
          100
      )
    : 0

  const stats = [
    {
      title: t("totalWaste"),
      value: "125 kg",
      change: "+12%",
      icon: Package,
      color: "primary",
    },
    {
      title: t("totalEarnings"),
      value: "Rs. 2,450",
      change: "+8%",
      icon: TrendingUp,
      color: "accent",
    },
    {
      title: t("ecoCoinsBalance"),
      value: "485",
      change: "+24",
      icon: Coins,
      color: "secondary",
    },
    {
      title: t("environmentalImpact"),
      value: "32 kg CO2",
      change: "Saved",
      icon: Leaf,
      color: "primary",
    },
  ]

  const recentSubmissions = [
    {
      id: 1,
      type: "Rice Husk",
      amount: "25 kg",
      date: "Jan 28, 2026",
      status: "verified",
      coins: 50,
    },
    {
      id: 2,
      type: "Coconut Shells",
      amount: "15 kg",
      date: "Jan 25, 2026",
      status: "pending",
      coins: 0,
    },
    {
      id: 3,
      type: "Paddy Straw",
      amount: "40 kg",
      date: "Jan 20, 2026",
      status: "verified",
      coins: 80,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {t("welcome")}, Farmer! 
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's your farming impact overview
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start justify-between">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    stat.color === "primary"
                      ? "bg-primary/10"
                      : stat.color === "accent"
                        ? "bg-accent/20"
                        : "bg-secondary"
                  }`}
                >
                  <stat.icon
                    className={`w-6 h-6 ${
                      stat.color === "primary"
                        ? "text-primary"
                        : stat.color === "accent"
                          ? "text-accent-foreground"
                          : "text-primary"
                    }`}
                  />
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.change.startsWith("+")
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary text-primary"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {stat.value}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Agreement Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        {currentAgreement.status !== "none" ? (
          <Card className="p-6 border-primary/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
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
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full ${
                  currentAgreement.status === "active"
                    ? "bg-primary/10 text-primary"
                    : currentAgreement.status === "pending"
                      ? "bg-accent/20 text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {currentAgreement.status === "active" && (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                {currentAgreement.status === "pending" && (
                  <Clock className="w-4 h-4" />
                )}
                {currentAgreement.status === "active"
                  ? t("active")
                  : currentAgreement.status === "pending"
                    ? t("pending")
                    : t("expired")}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("usedQuantity")}</span>
                <span className="font-medium text-foreground">
                  {currentAgreement.declaredQuantity - currentAgreement.remainingQuantity} kg / {currentAgreement.declaredQuantity} kg
                </span>
              </div>
              <Progress value={usedPercentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{t("remainingQuantity")}: {currentAgreement.remainingQuantity} kg</span>
                <span>{usedPercentage}% used</span>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Link href="/dashboard/agreement" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  {t("viewAgreement")}
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <Card className="p-6 border-accent/30 bg-accent/5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    No Active Agreement
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {t("noActiveAgreement")}
                  </p>
                </div>
              </div>
              <Link href="/dashboard/agreement">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {t("createAgreement")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </motion.div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-6 h-full">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link href="/dashboard/agreement">
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">
                      {t("myAgreement")}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </Link>
              <Link href="/dashboard/submit">
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center justify-between p-4 rounded-xl transition-colors group ${
                    currentAgreement.status === "active"
                      ? "bg-primary/5 hover:bg-primary/10"
                      : "bg-muted/50 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">
                      {t("submitWaste")}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </Link>
              <Link href="/dashboard/reports">
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">
                      View Impact Report
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </Link>
            </div>
          </Card>
        </motion.div>

        {/* Recent Submissions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Recent Submissions
              </h2>
              <Link href="/dashboard/submissions">
                <Button variant="ghost" size="sm" className="text-primary">
                  View All
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {recentSubmissions.map((submission, index) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {submission.type}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {submission.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">
                      {submission.amount}
                    </p>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        submission.status === "verified"
                          ? "bg-primary/10 text-primary"
                          : "bg-accent/20 text-accent-foreground"
                      }`}
                    >
                      {submission.status === "verified"
                        ? `+${submission.coins} coins`
                        : "Pending"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Environmental Impact Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card className="p-6 bg-primary text-primary-foreground">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary-foreground/10 rounded-2xl flex items-center justify-center">
                <Leaf className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Your Environmental Impact</h3>
                <p className="text-primary-foreground/80 text-sm">
                  You've helped save 32 kg of CO2 this month!
                </p>
              </div>
            </div>
            <Link href="/dashboard/reports">
              <Button
                variant="secondary"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                View Full Report
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
