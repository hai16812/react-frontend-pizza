import { useEffect, useState } from "react";
import { listenServices } from "../firebase/firestoreApi";
import TicketCard from "../components/TicketCard";

const fallback = [
  { id: "f1", name: "Dine-in", description: "Wood-fired pies delivered straight to your table, made to order.", tag: "In-house" },
  { id: "f2", name: "Delivery", description: "Hot pizza to your door within a 5km radius, average 35 minutes.", tag: "Off-site" },
  { id: "f3", name: "Catering", description: "Full spreads for parties and offices, from 10 to 200 guests.", tag: "Events" },
  { id: "f4", name: "Private hearth nights", description: "Book the oven and a pizzaiolo for a hands-on group session.", tag: "Experience" },
];

export default function Services() {
  const [services, setServices] = useState(null);

  useEffect(() => {
    const unsub = listenServices((items) => setServices(items));
    return unsub;
  }, []);

  const list = services && services.length > 0 ? services : fallback;

  return (
    <div>
      <section 
        className="relative bg-(--color-char) text-(--color-crust) py-32 md:py-40 overflow-hidden"
        style={{
          backgroundImage: `url('https://www.shutterstock.com/image-vector/restaurant-staff-characters-waiters-delivery-260nw-2128002935.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-(--color-char)/95 via-(--color-char)/85 to-(--color-char)/70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-(--color-char)/40 via-transparent to-(--color-char)/60"></div>
        
        {/* Decorative accent elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-(--color-ember)/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-20 w-72 h-72 bg-(--color-cheese)/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto px-5 z-10">
          <span className="font-mono text-xs uppercase tracking-widest text-(--color-cheese)">What we offer</span>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.1] mt-3">Beyond the dining room.</h1>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16 grid gap-6 sm:grid-cols-2">
        {list.map((s) => (
          <TicketCard key={s.id} title={s.name} description={s.description} tag={s.tag} imageUrl={s.imageUrl} />
        ))}
      </section>
    </div>
  );
}
