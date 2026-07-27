interface Props {
  title: string;
  subtitle: string;
}

export default function PageHeader({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-slate-800">
        {title}
      </h1>

      <p className="mt-1 text-slate-500">
        {subtitle}
      </p>
    </div>
  );
}