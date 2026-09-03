import { profile } from "@/lib/content";

export default function Hero() {
  return (
    <section
      id="about"
      className="mx-auto flex max-w-2xl scroll-mt-20 flex-col gap-10 px-6 pt-16 pb-24 sm:pt-24"
    >
      <p className="font-mono text-xs tracking-widest text-muted uppercase">
        {profile.name}
      </p>

      <h1 className="text-4xl leading-[1.15] font-normal tracking-tight sm:text-[2.75rem]">
        {profile.role}
        <span className="mt-2 block text-2xl text-muted italic sm:text-3xl">
          {profile.subroles.join(" · ")}
        </span>
      </h1>

      <div className="flex flex-col gap-5 text-[1.05rem] leading-[1.75]">
        <p>{profile.summary}</p>
        <p className="text-muted">{profile.detail}</p>
      </div>

      <p className="font-mono text-xs text-muted">
        <span className="text-accent">open to</span>{" "}
        {profile.openTo.join(" / ")}
      </p>
    </section>
  );
}
