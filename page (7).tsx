"use client"

import { motion } from "framer-motion"
import { Leaf, TrendingUp, Droplets, Wind, TreePine } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

export default function ReportsPage() {
  const { t } = useLanguage()

  const impactMetrics = [
    {
      icon: Leaf,
      title: "CO2 Prevented",
      value: "32 kg",
      description: "Carbon emissions prevented from burning waste",
      color: "primary",
    },
    {
      icon: Droplets,
      title: "Water Saved",
      value: "150 L",
      description: "Water saved through efficient recycling",
      color: "blue",
    },
    {
      icon: Wind,
      title: "Clean Air",
      value: "45 m³",
      description: "Air pollution prevented",
      color: "cyan",
    },
    {
      icon: TreePine,
      title: "Tree Equivalent",
      value: "2.5",
      description: "Trees worth of carbon offset",
      color: "green",
    },
  ]

  const monthlyData = [
    { month: "Sep", waste: 15, coins: 30 },
    { month: "Oct", waste: 22, coins: 44 },
    { month: "Nov", waste: 35, coins: 70 },
    { month: "Dec", waste: 28, coins: 56 },
    { month: "Jan", waste: 45, coins: 90 },
  ]

  const maxWaste = Math.max(...monthlyData.map((d) => d.waste))

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {t("environmentalImpact")}
        </h1>
        <p className="text-muted-foreground mt-1">
          See how your contributions are making a difference
        </p>
      </motion.div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {impactMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-5 h-full hover:shadow-lg transition-shadow duration-300">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  metric.color === "primary"
                    ? "bg-primary/10"
                    : metric.color === "blue"
                      ? "bg-blue-500/10"
                      : metric.color === "cyan"
                        ? "bg-cyan-500/10"
                        : "bg-green-500/10"
                }`}
              >
                <metric.icon
                  className={`w-6 h-6 ${
                    metric.color === "primary"
                      ? "text-primary"
                      : metric.color === "blue"
                        ? "text-blue-500"
                        : metric.color === "cyan"
                          ? "text-cyan-500"
                          : "text-green-500"
                  }`}
                />
              </div>
              <p className="text-sm text-muted-foreground">{metric.title}</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {metric.value}
              </p>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                {metric.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Waste Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-foreground">
                Monthly Waste Submitted
              </h3>
              <div className="flex items-center gap-1 text-primary text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+25%</span>
              </div>
            </div>
            <div className="flex items-end justify-between gap-3 h-48">
              {monthlyData.map((data, index) => (
                <motion.div
                  key={data.month}
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.waste / maxWaste) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex-1 flex flex-col items-center"
                >
                  <div
                    className="w-full bg-primary/80 rounded-t-lg relative group cursor-pointer hover:bg-primary transition-colors"
                    style={{ height: "100%" }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {data.waste} kg
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground mt-2">
                    {data.month}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Coins Earned Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-foreground">
                Monthly Eco-Coins Earned
              </h3>
              <span className="text-sm text-muted-foreground">
                Total: 290 coins
              </span>
            </div>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <motion.div
                  key={data.month}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <span className="w-8 text-sm text-muted-foreground">
                    {data.month}
                  </span>
                  <div className="flex-1 h-8 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(data.coins / Math.max(...monthlyData.map((d) => d.coins))) * 100}%`,
                      }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      className="h-full bg-secondary rounded-full flex items-center justify-end pr-3"
                    >
                      <span className="text-xs font-medium text-primary">
                        {data.coins}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Leaf className="w-10 h-10 text-primary" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Your Environmental Certificate
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Congratulations! You've contributed 125 kg of agricultural waste
                to the circular economy this year. Your efforts have helped
                prevent 32 kg of CO2 emissions and saved valuable resources.
                Keep up the great work!
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
