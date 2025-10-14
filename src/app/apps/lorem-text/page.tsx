"use client"

import { FaArrowLeft } from "react-icons/fa"
import PageLayout, { type Breadcrumb } from "@/components/page-layout"
import LoremText from "./lorem-text"

const breadcrumbs: Breadcrumb[] = [
  {
    href: "/apps",
    label: "Apps",
    icon: <FaArrowLeft size={16} />,
  },
]

export default function LoremTextPage() {
  return (
    <PageLayout breadcrumbs={breadcrumbs} maxWidth="6xl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Lorem Text</h2>
          <p className="text-gray-400">
            Generate random data for your development needs
          </p>
        </div>

        <div className="bg-[#0a0a0a] rounded-lg p-6">
          <LoremText />
        </div>
      </div>
    </PageLayout>
  )
}
