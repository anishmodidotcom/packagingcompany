"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, CheckCircle } from "lucide-react";
import { industries, products } from "@/lib/data";

const volumes = ["< 10K", "10K – 50K", "50K – 250K", "250K – 1M", "1M+"];

interface SampleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SampleModal({ isOpen, onClose }: SampleModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    industry: "",
    product: "",
    volume: "",
    message: "",
  });
  const prefersReducedMotion = useReducedMotion();

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const validate = useCallback(() => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.company.trim()) e.company = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email";
    if (!form.industry) e.industry = "Required";
    if (!form.product) e.product = "Required";
    return e;
  }, [form]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    // Reset after close animation
    setTimeout(() => {
      setSubmitted(false);
      setErrors({});
      setForm({
        name: "",
        company: "",
        email: "",
        industry: "",
        product: "",
        volume: "",
        message: "",
      });
    }, 300);
  };

  const inputClass = (field: string) =>
    `w-full rounded-xl border bg-cream-50 px-4 py-3 text-sm text-ink-900 outline-none transition-colors duration-200 placeholder:text-ink-500/50 focus:border-kraft-500 focus:ring-1 focus:ring-kraft-500/30 ${
      errors[field] ? "border-red-400" : "border-line"
    }`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-forest-950/70"
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />

          {/* Panel */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-cream-50 p-8 shadow-2xl md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-forest-950/5 hover:text-ink-900"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center py-12 text-center"
                >
                  <CheckCircle className="mb-4 h-12 w-12 text-sage-500" />
                  <h3 className="font-display text-2xl font-medium text-forest-950">
                    Thank you
                  </h3>
                  <p className="mt-2 text-ink-500">
                    We&apos;ll be in touch within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="font-display text-2xl font-medium text-forest-950 md:text-3xl">
                    Request a sample
                  </h2>
                  <p className="mt-2 text-sm text-ink-500">
                    We&apos;ll ship within 48 hours, free across India.
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-8 flex flex-col gap-4"
                    noValidate
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <input
                          type="text"
                          placeholder="Full Name *"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          className={inputClass("name")}
                        />
                        {errors.name && (
                          <span className="mt-1 text-xs text-red-500">
                            {errors.name}
                          </span>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Company *"
                          value={form.company}
                          onChange={(e) =>
                            setForm({ ...form, company: e.target.value })
                          }
                          className={inputClass("company")}
                        />
                        {errors.company && (
                          <span className="mt-1 text-xs text-red-500">
                            {errors.company}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Work Email *"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className={inputClass("email")}
                      />
                      {errors.email && (
                        <span className="mt-1 text-xs text-red-500">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <select
                          value={form.industry}
                          onChange={(e) =>
                            setForm({ ...form, industry: e.target.value })
                          }
                          className={inputClass("industry")}
                        >
                          <option value="">Industry *</option>
                          {industries.map((ind) => (
                            <option key={ind.name} value={ind.name}>
                              {ind.name}
                            </option>
                          ))}
                        </select>
                        {errors.industry && (
                          <span className="mt-1 text-xs text-red-500">
                            {errors.industry}
                          </span>
                        )}
                      </div>
                      <div>
                        <select
                          value={form.product}
                          onChange={(e) =>
                            setForm({ ...form, product: e.target.value })
                          }
                          className={inputClass("product")}
                        >
                          <option value="">Product of Interest *</option>
                          {products.map((p) => (
                            <option key={p.slug} value={p.slug}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                        {errors.product && (
                          <span className="mt-1 text-xs text-red-500">
                            {errors.product}
                          </span>
                        )}
                      </div>
                    </div>

                    <select
                      value={form.volume}
                      onChange={(e) =>
                        setForm({ ...form, volume: e.target.value })
                      }
                      className={inputClass("")}
                    >
                      <option value="">Estimated Monthly Volume</option>
                      {volumes.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>

                    <textarea
                      placeholder="Anything else we should know? (optional)"
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      rows={3}
                      className={inputClass("")}
                    />

                    <button
                      type="submit"
                      className="mt-2 w-full rounded-full bg-kraft-500 py-3.5 text-sm font-medium text-forest-950 transition-colors duration-200 hover:bg-kraft-600"
                    >
                      Send Request
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
