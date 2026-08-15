export default function About() {
  const timeline = [
    { year: "2014", text: "A single countertop oven and a folding table on Semolina Street." },
    { year: "2017", text: "Built our own wood-fired hearth by hand, brick by brick." },
    { year: "2021", text: "Started sourcing flour direct from a family mill upstate." },
    { year: "2026", text: "Still doing the dough by hand, every single morning." },
  ];

  const values = [
    { title: "Slow dough", body: "24-hour cold proof for a crust that's blistered outside, airy inside." },
    { title: "Real fire", body: "Oak-fed flames, no gas shortcuts — 480°C on the oven floor." },
    { title: "Honest sourcing", body: "Flour, tomatoes and cheese from growers we've actually met." },
  ];

  return (
    <div>
      <section className="bg-(--color-char) text-(--color-crust) py-20">
        <div className="max-w-4xl mx-auto px-5">
          <span className="font-mono text-xs uppercase tracking-widest text-(--color-cheese)">Our story</span>
          <h1 className="font-display text-4xl md:text-5xl mt-3">
            Built around one oven, one recipe, and a lot of stubbornness.
          </h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 py-16">
        <p className="text-(--color-smoke) text-lg leading-relaxed">
          PIZZA SHOP started as a folding table and a countertop oven, run by two people who
          thought the neighborhood deserved pizza that didn't come out of a freezer. A decade on, the
          table is a dining room and the countertop oven is a hand-built hearth — but the dough recipe
          hasn't changed once.
        </p>
      </section>

      <section className="bg-(--color-crust-2) py-16">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="font-display text-3xl mb-10">How we got here</h2>
          <ol className="relative border-l border-(--color-ink)/15 pl-8 space-y-10">
            {timeline.map((t) => (
              <li key={t.year} className="relative">
                <span className="absolute -left-[38px] top-0 w-4 h-4 rounded-full bg-(--color-ember)" aria-hidden="true" />
                <span className="font-mono text-sm text-(--color-ember)">{t.year}</span>
                <p className="text-(--color-ink) mt-1">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16 grid gap-6 md:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="ticket p-6 pt-8 border border-(--color-ink)/5">
            <h3 className="font-display text-xl mb-2">{v.title}</h3>
            <p className="text-sm text-(--color-smoke) leading-relaxed">{v.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
