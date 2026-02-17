import type { Metadata } from "next";
import Link from "next/link";

import ContactForm from "../../components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact — ReformLogic",
};

export const runtime = "edge";

export default function ContactPage() {
  return (
    <section className="min-h-screen px-6 pb-32 pt-24">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="mb-8 inline-block text-sm uppercase tracking-widest text-slate-500 transition-colors hover:text-indigo-400">
          ← Back
        </Link>
        <h1 className="mb-4 text-4xl font-light text-slate-100 md:text-5xl">
          Get in <span className="font-medium text-indigo-400">Touch</span>
        </h1>
        <p className="mb-12 text-lg leading-relaxed text-slate-400">
          Have a question, or not sure which service fits? Drop a message and I&apos;ll get back to you within 24 hours.
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
