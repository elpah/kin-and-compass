export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-sand rounded-lg bg-white ring-1 ring-sand">
      {items.map((item) => (
        <details key={item.q} className="group px-5 py-4">
          <summary className="cursor-pointer list-none font-semibold text-burgundy">
            <span className="flex items-center justify-between gap-4">
              {item.q}
              <span className="text-crimson group-open:rotate-45 transition">+</span>
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
