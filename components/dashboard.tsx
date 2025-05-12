"use client"

import { useEffect, useState } from "react"
import { ArrowRight, DollarSign, LineChart, RefreshCcw } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"

export function Dashboard() {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  // Animación de números
  const [incomeValue, setIncomeValue] = useState(0)
  const [expensesValue, setExpensesValue] = useState(0)
  const [balanceValue, setBalanceValue] = useState(0)
  const [savingsValue, setSavingsValue] = useState(0)

  useEffect(() => {
    setMounted(true)

    // Animación de números al cargar
    const duration = 1500
    const steps = 60
    const interval = duration / steps

    const targetIncome = 45231.89
    const targetExpenses = 12234.59
    const targetBalance = 32997.3
    const targetSavings = 18000.0

    let step = 0

    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setIncomeValue(Math.min(targetIncome * progress, targetIncome))
      setExpensesValue(Math.min(targetExpenses * progress, targetExpenses))
      setBalanceValue(Math.min(targetBalance * progress, targetBalance))
      setSavingsValue(Math.min(targetSavings * progress, targetSavings))

      if (step >= steps) {
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <h1 className="text-3xl font-bold">{t("dashboard.title")}</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-950/30 dark:to-transparent">
            <CardTitle className="text-sm font-medium">{t("dashboard.income")}</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${incomeValue.toFixed(2)}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">+20.1% {t("dashboard.since_last_month")}</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-red-50 to-transparent dark:from-red-950/30 dark:to-transparent">
            <CardTitle className="text-sm font-medium">{t("dashboard.expenses")}</CardTitle>
            <LineChart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${expensesValue.toFixed(2)}</div>
            <p className="text-xs text-red-500 flex items-center mt-1">+4.3% {t("dashboard.since_last_month")}</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-950/30 dark:to-transparent">
            <CardTitle className="text-sm font-medium">{t("dashboard.balance")}</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${balanceValue.toFixed(2)}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">+10.2% {t("dashboard.since_last_month")}</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-green-50 to-transparent dark:from-green-950/30 dark:to-transparent">
            <CardTitle className="text-sm font-medium">{t("dashboard.savings")}</CardTitle>
            <RefreshCcw className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${savingsValue.toFixed(2)}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">+35.2% {t("dashboard.since_last_month")}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1 transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle>{t("dashboard.financial_summary")}</CardTitle>
            <CardDescription>{t("dashboard.financial_summary_subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="week">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="week">{t("dashboard.week")}</TabsTrigger>
                <TabsTrigger value="month">{t("dashboard.month")}</TabsTrigger>
                <TabsTrigger value="year">{t("dashboard.year")}</TabsTrigger>
              </TabsList>
              <TabsContent value="week" className="h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">Gráfico semanal de ingresos y gastos</div>
              </TabsContent>
              <TabsContent value="month" className="h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">Gráfico mensual de ingresos y gastos</div>
              </TabsContent>
              <TabsContent value="year" className="h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">Gráfico anual de ingresos y gastos</div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="col-span-1 transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle>{t("dashboard.recent_transactions")}</CardTitle>
            <CardDescription>{t("dashboard.recent_transactions_subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 text-sm text-muted-foreground">
                <div>{t("dashboard.date")}</div>
                <div>{t("dashboard.description")}</div>
                <div className="text-right">{t("dashboard.amount")}</div>
                <div className="text-right">{t("dashboard.status")}</div>
              </div>
              <div className="grid grid-cols-4 items-center">
                <div className="text-sm">9/5/2023</div>
                <div className="text-sm">Supermercado Local</div>
                <div className="text-right text-sm text-red-500">-120,50 €</div>
                <div className="text-right">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    {t("dashboard.completed")}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center">
                <div className="text-sm">7/5/2023</div>
                <div className="text-sm">Salario Mayo</div>
                <div className="text-right text-sm text-green-500">+2500,00 €</div>
                <div className="text-right">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    {t("dashboard.completed")}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center">
                <div className="text-sm">4/5/2023</div>
                <div className="text-sm">Netflix</div>
                <div className="text-right text-sm text-red-500">-15,99 €</div>
                <div className="text-right">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    {t("dashboard.completed")}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center">
                <div className="text-sm">2/5/2023</div>
                <div className="text-sm">Transferencia a Ahorros</div>
                <div className="text-right text-sm text-red-500">-500,00 €</div>
                <div className="text-right">
                  <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                    {t("dashboard.pending")}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="ml-auto gap-1 group">
              {t("dashboard.view_all")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
