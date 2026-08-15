import { useState } from "react";
import { useLocation } from "react-router-dom";
import { sendContactMessage } from "../firebase/firestoreApi";

export default function Contact() {
  const location = useLocation();
  const orderItem = location.state?.orderItem;

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: orderItem ? `Hi! I'd like to order: ${orderItem}. ` : "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await sendContactMessage(form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  return (
    <div>
      <section className="bg-(--color-char) text-(--color-crust) py-20">
        <div className="max-w-4xl mx-auto px-5">
          <span className="font-mono text-xs uppercase tracking-widest text-(--color-cheese)">Get in touch</span>
          <h1 className="font-display text-4xl md:text-5xl mt-3">Questions, catering, or just say hi.</h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-2xl mb-6">Visit or write</h2>
          <dl className="space-y-5 text-sm">
            <div>
              <dt className="font-mono uppercase tracking-widest text-(--color-basil) text-xs mb-1">Address</dt>
              <dd className="text-(--color-ink)"> 271 Street</dd>
            </div>
            <div>
              <dt className="font-mono uppercase tracking-widest text-(--color-basil) text-xs mb-1">Phone</dt>
              <dd className="text-(--color-ink)">(855) : 87578753</dd>
            </div>
            <div>
              <dt className="font-mono uppercase tracking-widest text-(--color-basil) text-xs mb-1">Email</dt>
              <dd className="text-(--color-ink)">hai@pizza.com</dd>
            </div>
            <div>
              <dt className="font-mono uppercase tracking-widest text-(--color-basil) text-xs mb-1">Hours</dt>
              <dd className="text-(--color-ink)">Tue–Fri 7:00 AM – 12:00 PM · Sat–Sun 7 : 00 AM – 7:00 PM· </dd>
              <dd className="text-(--color-ink)">Monday closed</dd>
            </div>
          </dl>
        </div>

        <form onSubmit={handleSubmit} className="ticket p-6 pt-8 border border-(--color-ink)/5 space-y-4">
          {orderItem && (
            <div className="rounded-lg bg-(--color-cheese)/20 border border-(--color-cheese)/40 px-3 py-2 text-sm text-(--color-ink)">
              🍕 Ordering <strong>{orderItem}</strong> — fill in your details and we'll confirm by email.
            </div>
          )}
          <div>
            <label htmlFor="name" className="block font-mono text-xs uppercase tracking-widest text-(--color-smoke) mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full rounded border border-(--color-ink)/15 bg-white px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest text-(--color-smoke) mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded border border-(--color-ink)/15 bg-white px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-mono text-xs uppercase tracking-widest text-(--color-smoke) mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="w-full rounded border border-(--color-ink)/15 bg-white px-3 py-2 text-sm"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-(--color-ember)" role="alert">
              Couldn't send that: {error}
            </p>
          )}
          {status === "sent" && (
            <p className="text-sm text-(--color-basil)" role="status">
              Message sent — we'll get back to you soon.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full px-5 py-3 rounded bg-(--color-ember) hover:bg-(--color-ember-2) disabled:opacity-60 transition-colors font-mono text-sm uppercase tracking-widest text-(--color-crust)"
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
        </form>
      </section>
    </div>
  );
}
