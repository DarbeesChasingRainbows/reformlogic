import { define } from "../utils.ts";
import { Head } from "fresh/runtime";
import ContactForm from "../islands/ContactForm.tsx";

export default define.page(function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact — ReformLogic</title>
      </Head>
      <section class="min-h-screen pt-24 pb-32 px-6">
        <div class="max-w-2xl mx-auto">
          <a
            href="/"
            class="text-sm text-slate-500 hover:text-indigo-400 font-mono uppercase tracking-widest mb-8 inline-block"
          >
            &larr; Back
          </a>
          <h1 class="text-4xl md:text-5xl font-light text-slate-100 mb-4">
            Get in <span class="font-medium text-indigo-400">Touch</span>
          </h1>
          <p class="text-lg text-slate-400 leading-relaxed mb-12">
            Have a question, or not sure which service fits? Drop a message and
            I'll get back to you within 24 hours.
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  );
});
