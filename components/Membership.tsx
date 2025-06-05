"use client"

import { motion } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const tiers = [
  {
    name: "開業チーター会員",
    price: "¥0 / 基本ドリンク",
    perks: "飲み放題・イベント優先招待",
  },
  {
    name: "ビジター",
    price: "通常料金",
    perks: "1ドリンク制・イベント参加可",
  },
]

export default function Membership() {
  return (
    <section className="bg-gray-50 dark:bg-secondary py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-wide text-gray-900 dark:text-primary md:text-4xl">MEMBERSHIP</h2>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">
              「開業チーター会員は基本ドリンクが <span className="font-bold text-primary dark:text-primary">無料</span>。
              <br />
              非会員は通常料金。まずは一杯で体感を。」
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 dark:bg-black/50 hover:bg-gray-100 dark:hover:bg-black/50">
                    <TableHead className="text-gray-900 dark:text-primary">会員種別</TableHead>
                    <TableHead className="text-gray-900 dark:text-primary">料金</TableHead>
                    <TableHead className="text-gray-900 dark:text-primary">特典</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tiers.map((tier) => (
                    <TableRow key={tier.name} className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-black/20">
                      <TableCell className="font-medium text-gray-900 dark:text-gray-100">{tier.name}</TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">{tier.price}</TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">{tier.perks}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
