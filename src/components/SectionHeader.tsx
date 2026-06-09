type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.24em] text-[#F97316]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-[#2B2B2B] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-[#4A4A4A]">{description}</p>
      ) : null}
    </div>
  );
}
