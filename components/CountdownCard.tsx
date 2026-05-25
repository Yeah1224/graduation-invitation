interface Props {
  value: number
  label: string
}

export default function CountdownCard({
  value,
  label,
}: Props) {
  return (
    <div className="backdrop-blur-xl bg-white/60 border border-amber-300 rounded-2xl px-5 py-4 min-w-[90px] md:min-w-[100px] shadow-[0_0_15px_rgba(217,119,6,0.1)]">
      <h3 className="text-2xl md:text-3xl font-black mb-1 text-amber-700 font-serif">
        {value}
      </h3>

      <p className="uppercase tracking-widest text-amber-900/60 text-xs font-bold">
        {label}
      </p>
    </div>
  )
}