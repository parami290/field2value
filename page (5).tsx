"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Package, CheckCircle2, XCircle, Clock } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export default function AgreementHistoryPage() {
  const { t } = useLanguage()

  const agreements = [
    {
      id: 1,
      wasteType: "Paddy Straw",
      declaredQuantity: 500,
      usedQuantity: 500,
      startDate: "2025-10-01",
      endDate: "2025-12-31",
      status: "completed",
    },
    {
      id: 2,
      wasteType: "Rice Husk",
      declaredQuantity: 200,
      usedQuantity: 150,
      startDate: "2025-07-01",
      endDate: "2025-09-30",
      status: "expired",
    },
    {
      id: 3,
      wasteType: "Coconut Shells",
      declaredQuantity: 100,
      usedQuantity: 0,
      startDate: "2025-04-01",
      endDate: "2025-06-30",
      status: "rejected",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-primary" />
      case "expired":
        return <Clock className="w-4 h-4 text-muted-foreground" />
      case "rejected":
        return <XCircle className="w-4 h-4 text-destructive" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-primary/10 text-primary"
      case "expired":
        return "bg-muted text-muted-foreground"
      case "rejected":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/agreement">
          <Button variant="ghost" size="icon" className="shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("agreementHistory")}</h1>
          <p className="text-muted-foreground mt-1">View your past agreements</p>
        </div>
      </div>

      {/* Agreement List */}
      <div className="space-y-4">
        {agreements.map((agreement, index) => (
          <motion.div
            key={agreement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{agreement.wasteType}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {agreement.startDate} - {agreement.endDate}
                      </span>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="text-muted-foreground">Quantity: </span>
                      <span className="font-medium text-foreground">
                        {agreement.usedQuantity} / {agreement.declaredQuantity} kg used
                      </span>
                    </div>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    agreement.status
                  )}`}
                >
                  {getStatusIcon(agreement.status)}
                  {agreement.status.charAt(0).toUpperCase() + agreement.status.slice(1)}
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {agreements.length === 0 && (
        <Card className="p-8 text-center">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No past agreements found</p>
        </Card>
      )}
    </div>
  )
}
