import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listenFoodItems, listenServices, listenUsers, listenContactMessages } from "../../firebase/firestoreApi";

export default function Dashboard() {
  const [foodItems, setFoodItems] = useState([]);
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const u1 = listenFoodItems(setFoodItems);
    const u2 = listenServices(setServices);
    const u3 = listenUsers(setUsers);
    const u4 = listenContactMessages(setMessages);
    return () => {
      u1(); u2(); u3(); u4();
    };
  }, []);

  const stats = [
    { label: "Food items", value: foodItems.length, to: "/admin/food-items" },
    { label: "Services", value: services.length, to: "/admin/services" },
    { label: "Registered users", value: users.length, to: "/admin/users" },
    { label: "Contact messages", value: messages.length, to: null },
  ];

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Wrapper = s.to ? Link : "div";
          return (
            <Wrapper
              key={s.label}
              to={s.to || undefined}
              className="ticket p-5 pt-7 border border-(--color-ink)/5 hover:shadow-md transition-shadow"
            >
              <p className="font-display text-4xl">{s.value}</p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-(--color-smoke) mt-1">
                {s.label}
              </p>
            </Wrapper>
          );
        })}
      </div>

      <div className="ticket p-6 pt-8 border border-(--color-ink)/5">
        <h2 className="font-display text-xl mb-4">Recent messages</h2>
        {messages.length === 0 ? (
          <p className="text-sm text-(--color-smoke)">No messages yet.</p>
        ) : (
          <ul className="divide-y divide-(--color-ink)/10">
            {messages.slice(0, 5).map((m) => (
              <li key={m.id} className="py-3">
                <div className="flex justify-between items-baseline gap-4">
                  <p className="font-medium text-sm">{m.name}</p>
                  <p className="font-mono text-xs text-(--color-smoke)">{m.email}</p>
                </div>
                <p className="text-sm text-(--color-smoke) mt-1">{m.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
