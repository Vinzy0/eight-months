"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PropInfo {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
}

export interface VariantOption {
  name: string;
  component?: React.ReactNode;
  code?: string;
}

interface ComponentShowcaseProps {
  name: string;
  description: string;
  component: React.ReactNode;
  variants?: VariantOption[];
  props: PropInfo[];
  code: string;
  className?: string;
}

export default function ComponentShowcase({
  name,
  description,
  component,
  variants,
  props,
  code,
  className,
}: ComponentShowcaseProps) {
  const [activeVariant, setActiveVariant] = useState(0);
  const [showCode, setShowCode] = useState(false);

  const currentVariant = variants?.[activeVariant];
  const displayComponent = currentVariant?.component || component;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <Card className="glass-card overflow-hidden">
        <CardHeader className="border-b border-[#C68B59]/10">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl font-[family-name:var(--font-playfair)] text-[#2C1A0E]">
                {name}
              </CardTitle>
              <CardDescription className="mt-1 font-[family-name:var(--font-dm-sans)] text-[#8B6F4E]">
                {description}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCode(!showCode)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
                  "font-[family-name:var(--font-dm-sans)]",
                  showCode
                    ? "bg-[#C68B59] text-white"
                    : "bg-[#C68B59]/10 text-[#C68B59] hover:bg-[#C68B59]/20"
                )}
              >
                {showCode ? "Hide Code" : "Show Code"}
              </button>
            </div>
          </div>

          {/* Variant Toggles */}
          {variants && variants.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {variants.map((variant, index) => (
                <button
                  key={index}
                  onClick={() => setActiveVariant(index)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
                    "font-[family-name:var(--font-dm-sans)]",
                    activeVariant === index
                      ? "bg-[#C68B59] text-white"
                      : "bg-[#E8CBA7]/30 text-[#8B6F4E] hover:bg-[#E8CBA7]/50"
                  )}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          )}
        </CardHeader>

        <CardContent className="p-6">
          {/* Live Preview */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8B6F4E]/60 mb-3 font-[family-name:var(--font-dm-sans)]">
              Preview
            </h4>
            <div className="p-8 rounded-xl bg-gradient-to-br from-[#FAF3E8] to-[#E8CBA7]/20 border border-[#C68B59]/10 min-h-[120px] flex items-center justify-center">
              {displayComponent}
            </div>
          </div>

          {/* Code Snippet */}
          {showCode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8B6F4E]/60 mb-3 font-[family-name:var(--font-dm-sans)]">
                Usage
              </h4>
              <pre className="p-4 rounded-lg bg-[#2C1A0E] text-[#FAF3E8] text-sm overflow-x-auto font-mono">
                <code>{currentVariant?.code || code}</code>
              </pre>
            </motion.div>
          )}

          {/* Props Table */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8B6F4E]/60 mb-3 font-[family-name:var(--font-dm-sans)]">
              Props
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#C68B59]/10">
                    <th className="text-left py-2 px-3 font-semibold text-[#2C1A0E] font-[family-name:var(--font-dm-sans)]">
                      Prop
                    </th>
                    <th className="text-left py-2 px-3 font-semibold text-[#2C1A0E] font-[family-name:var(--font-dm-sans)]">
                      Type
                    </th>
                    <th className="text-left py-2 px-3 font-semibold text-[#2C1A0E] font-[family-name:var(--font-dm-sans)]">
                      Required
                    </th>
                    <th className="text-left py-2 px-3 font-semibold text-[#2C1A0E] font-[family-name:var(--font-dm-sans)]">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props.map((prop, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#C68B59]/5 last:border-b-0"
                    >
                      <td className="py-3 px-3 font-mono text-[#C68B59]">
                        {prop.name}
                        {prop.default && (
                          <span className="text-[#8B6F4E] text-xs ml-1">
                            ={prop.default}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-mono text-xs text-[#8B6F4E]">
                        {prop.type}
                      </td>
                      <td className="py-3 px-3">
                        <Badge
                          variant={prop.required ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {prop.required ? "Required" : "Optional"}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-[#2C1A0E]/80 font-[family-name:var(--font-dm-sans)]">
                        {prop.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
