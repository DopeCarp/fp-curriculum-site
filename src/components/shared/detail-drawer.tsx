"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

export function DetailDrawer({
  open,
  title,
  subtitle,
  closeLabel = "Close",
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  closeLabel?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-40 bg-black/12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-xl flex-col overflow-y-auto border-l border-[var(--line)] bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] pb-5">
              <div>
                {subtitle ? (
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
                    {subtitle}
                  </p>
                ) : null}
                <h2 className="mt-3 font-serif text-3xl leading-tight">{title}</h2>
              </div>
              <button
                type="button"
                className="rounded-full border border-[var(--line)] px-3 py-1 text-sm"
                onClick={onClose}
              >
                {closeLabel}
              </button>
            </div>
            <div className="py-6">{children}</div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
