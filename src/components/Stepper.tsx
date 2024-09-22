"use client";

import { AppContext } from "@/context/AppContext";
import {
  AlertCircle,
  CheckCircle2,
  LoaderCircleIcon,
  XCircle,
} from "lucide-react";
import { useContext } from "react";

export const stepIcons = (
  status: "loading" | "success" | "error" | "unknown",
) => {
  switch (status) {
    case "loading":
      return <LoaderCircleIcon className="h-6 w-6 animate-spin text-white" />;
    case "success":
      return <CheckCircle2 className="h-6 w-6 text-[#198754]" />;
    case "error":
      return <XCircle className="h-6 w-6 text-[#DC4C64]" />;
    case "unknown":
    default:
      return <AlertCircle className="h-6 w-6 text-[#F6B217]" />;
  }
};

const steps = [
  { id: 0, label: "Intent is being encrypted and submitted" },
  { id: 1, label: "Intent is being relayed" },
  { id: 2, label: "Intent fulfilled" },
];

export default function Stepper() {
  const {
    currentStep,
    stepStatus: status,
    isStepperVisible,
  } = useContext(AppContext);

  return isStepperVisible ? (
    <section className="absolute right-[20%] flex max-h-[300px] w-full max-w-[300px] flex-col overflow-y-auto rounded-lg border bg-black-dark shadow-lg">
      {steps.slice(0, currentStep + 1).map((step, index) => (
        <div
          key={index}
          className={`flex items-center gap-2 border-b border-dashed p-4 last:border-none ${
            index === currentStep ? "opacity-100" : "opacity-50"
          }`}
        >
          <div>
            {index === currentStep ? stepIcons(status) : stepIcons("success")}
          </div>
          <span
            className={`text-sm font-medium ${
              index <= currentStep ? "text-foreground" : "text-gray-500"
            }`}
          >
            {step.label}
          </span>
        </div>
      ))}
    </section>
  ) : null;
}
