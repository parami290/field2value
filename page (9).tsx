"use client"

import { motion } from "framer-motion"
import { Package, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

const submissions = [
  {
    id: 1,
    type: "Rice Husk",
    amount: "25 kg",
    date: "Jan 28, 2026",
    status: "verified",
    coins: 50,
    location: "Anuradhapura",
  },
  {
    id: 2,
    type: "Coconut Shells",
    amount: "15 kg",
    date: "Jan 25, 2026",
    status: "pending",
    coins: 0,
    location: "Kurunegala",
  },
  {
    id: 3,
    type: "Paddy Straw",
    amount: "40 kg",
    date: "Jan 20, 2026",
    status: "verified",
    coins: 80,
    location: "Polonnaruwa",
  },
  {
    id: 4,
    type: "Banana Stems",
    amount: "20 kg",
    date: "Jan 15, 2026",
    status: "verified",
    coins: 30,
    location: "Kandy",
  },
  {
    id: 5,
    type: "Sugarcane Bagasse",
    amount: "35 kg",
    date: "Jan 10, 2026",
    status: "rejected",
    coins: 0,
    location: "Matara",
  },
]

export default function SubmissionsPage() {
  const { t } = useLanguage()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle2 className="w-4 h-4 text-primary" />
      case "pending":
        return <Clock className="w-4 h-4 text-accent-foreground" />
      case "rejected":
        return <AlertCircle className="w-4 h-4 text-destructive" />
      default:
        return null
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-primary/10 text-primary"
      case "pending":
        return "bg-accent/20 text-accent-foreground"
      case "rejected":
        return "bg-destructive/10 text-destructive"
      default:
        return ""
    }
  }

  const stats = {
    total: submissions.length,
    verified: submissions.filter((s) => s.status === "verified").length,
    pending: submissions.filter((s) => s.status === "pending").length,
    totalCoins: submissions.reduce((acc, s) => acc + s.coins, 0),
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {t("mySubmissions")}
        </h1>
        <p className="text-muted-foreground mt-1">
          Track all your waste submissions
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Submissions", value: stats.total },
          { label: "Verified", value: stats.verified },
          { label: "Pending", value: stats.pending },
          { label: "Total Coins Earned", value: stats.totalCoins },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {stat.value}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Submissions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="overflow-hidden">
          {/* Desktop Table Header */}
          <div className="hidden sm:grid grid-cols-6 gap-4 p-4 bg-muted/50 border-b border-border text-sm font-medium text-muted-foreground">
            <div>Type</div>
            <div>Amount</div>
            <div>Location</div>
            <div>Date</div>
            <div>Status</div>
            <div className="text-right">Coins</div>
          </div>

          {/* Submissions */}
          <div className="divide-y divide-border">
            {submissions.map((submission, index) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="p-4 hover:bg-muted/30 transition-colors"
              >
                {/* Mobile View */}
                <div className="sm:hidden space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {submission.type}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {submission.amount}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${getStatusStyle(submission.status)}`}
                    >
                      {getStatusIcon(submission.status)}
                      {submission.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {submission.location} - {submission.date}
                    </span>
                    <span className="font-medium text-primary">
                      {submission.coins > 0 ? `+${submission.coins}` : "-"}
                    </span>
                  </div>
                </div>

                {/* Desktop View */}
                <div className="hidden sm:grid grid-cols-6 gap-4 items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Package className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">
                      {submission.type}
                    </span>
                  </div>
                  <div className="text-foreground">{submission.amount}</div>
                  <div className="text-muted-foreground">
                    {submission.location}
                  </div>
                  <div className="text-muted-foreground">{submission.date}</div>
                  <div>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${getStatusStyle(submission.status)}`}
                    >
                      {getStatusIcon(submission.status)}
                      {submission.status}
                    </span>
                  </div>
                  <div className="text-right font-medium text-primary">
                    {submission.coins > 0 ? `+${submission.coins}` : "-"}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
