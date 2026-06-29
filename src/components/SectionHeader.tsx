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
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F97316]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-black uppercase leading-[1.08] tracking-[-0.035em] text-[#242424] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-[#626262]">{description}</p>
      ) : null}
    </div>
  );
}
