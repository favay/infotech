interface KpiCardProps {
  label: string;
  value: string;
  tone?: 'safe' | 'warning' | 'danger';
}

export function KpiCard({ label, value, tone = 'safe' }: KpiCardProps) {
  return (
    <article className={`card card-${tone}`}>
      <p className="muted">{label}</p>
      <h2>{value}</h2>
    </article>
  );
}
