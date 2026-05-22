const profile = {
  name: "Your Name",
  title: "Web Developer / Frontend Engineer",
  introduction:
    "ここに自己紹介文を書きます。学習中のこと、得意領域、作りたいものなどを2〜3文でまとめると読みやすいです。",
  location: "Tokyo, Japan",
  email: "you@example.com",
  githubUrl: "https://github.com/yourname",
  websiteUrl: "https://your-website.com",
  initials: "YN",
};

const skills = [
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Node.js",
  "Figma",
];

const works = [
  {
    title: "manaba_",
    summary:
      "学内システムの使いづらさを解消するために、主要な導線を整理したUIを実装。",
    role: "企画 / UI設計 / フロント実装",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://example.com",
    repo: "https://github.com/yourname/manaba_",
    period: "2024",
  },
  {
    title: "eml_calc",
    summary:
      "機械学習で使う評価指標を素早く算出できるツールとして設計・実装。",
    role: "設計 / フロント実装",
    tech: ["React", "TypeScript", "Vite"],
    link: "",
    repo: "https://github.com/yourname/eml_calc",
    period: "2023",
  },
];

const getInitials = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "ME";
  return trimmed
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
};

export default function Home() {
  const initials = profile.initials || getInitials(profile.name);

  return (
    <div className="relative min-h-full overflow-hidden bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-zinc-100 blur-3xl" />
        <div className="absolute top-52 -left-32 h-72 w-72 rounded-full bg-zinc-50 blur-3xl" />
      </div>

      <header className="relative mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 pt-16 pb-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">
            Portfolio
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 md:text-5xl">
            {profile.name}
          </h1>
          <p className="text-base text-zinc-500">{profile.title}</p>
          <p className="max-w-xl text-base leading-7 text-zinc-600">
            {profile.introduction}
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-zinc-500">
            {profile.location && <span>📍 {profile.location}</span>}
            {profile.email && <span>✉️ {profile.email}</span>}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            {profile.githubUrl && (
              <a
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-5 py-2 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50"
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            )}
            {profile.websiteUrl && (
              <a
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-5 py-2 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50"
                href={profile.websiteUrl}
                target="_blank"
                rel="noreferrer"
              >
                Website
              </a>
            )}
          </div>
        </div>
        <div className="shrink-0">
          <div className="flex h-32 w-32 items-center justify-center rounded-3xl border border-zinc-200/70 bg-white text-3xl font-semibold text-zinc-700 shadow-sm md:h-40 md:w-40">
            {initials}
          </div>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-5xl space-y-16 px-6 pb-20">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-zinc-900">自己紹介</h2>
            <span className="text-xs text-zinc-400">
              ここは手動で編集してください
            </span>
          </div>
          <p className="max-w-3xl text-base leading-7 text-zinc-600">
            {profile.introduction}
          </p>
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 text-xs text-zinc-600">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-zinc-200 px-3 py-1"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-zinc-900">開発実績</h2>
            <span className="text-xs text-zinc-400">成果物は2件に限定</span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {works.map((work) => (
              <article
                key={work.title}
                className="rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-zinc-900">
                      {work.title}
                    </h3>
                    <p className="text-sm leading-6 text-zinc-600">
                      {work.summary}
                    </p>
                  </div>
                  <span className="whitespace-nowrap text-xs text-zinc-400">
                    {work.period}
                  </span>
                </div>
                <p className="mt-3 text-xs text-zinc-500">{work.role}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                  {work.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-zinc-200 px-2 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {(work.link || work.repo) && (
                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-zinc-600">
                    {work.link && (
                      <a
                        className="underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-900"
                        href={work.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Demo / Site
                      </a>
                    )}
                    {work.repo && (
                      <a
                        className="underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-900"
                        href={work.repo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Source
                      </a>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
