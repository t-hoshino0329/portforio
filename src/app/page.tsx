import Image from "next/image";

const username = "t-hoshino0329";
const githubUrl = `https://github.com/${username}`;

type Profile = {
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  location: string | null;
  blog: string | null;
};

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
};

const githubHeaders = {
  Accept: "application/vnd.github+json",
  "User-Agent": "portfolio-site",
};

const fallbackBio =
  "Web開発を中心に学習と制作に取り組み、使いやすいUI/UXを意識して実装しています。";

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "short" }).format(
    new Date(iso),
  );

const toWebsiteUrl = (blog: string | null) => {
  if (!blog) return null;
  return blog.startsWith("http") ? blog : `https://${blog}`;
};

const getProfile = async (): Promise<Profile> => {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: githubHeaders,
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("GitHubプロフィールの取得に失敗しました。");
  }
  return (await res.json()) as Profile;
};

const getRepos = async (): Promise<Repo[]> => {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=8&sort=updated`,
    { headers: githubHeaders, next: { revalidate: 3600 } },
  );
  if (!res.ok) {
    throw new Error("GitHubリポジトリの取得に失敗しました。");
  }
  const repos = (await res.json()) as Repo[];
  return repos.filter((repo) => !repo.fork);
};

export default async function Home() {
  const [profile, repos] = await Promise.all([getProfile(), getRepos()]);
  const displayName = profile.name ?? username;
  const bio = profile.bio ?? fallbackBio;
  const websiteUrl = toWebsiteUrl(profile.blog);
  const languages = Array.from(
    new Set(repos.map((repo) => repo.language).filter(Boolean)),
  ).slice(0, 6) as string[];

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
            {displayName}
          </h1>
          <p className="max-w-xl text-base leading-7 text-zinc-600">{bio}</p>
          <div className="flex flex-wrap gap-3 text-sm text-zinc-500">
            {profile.location && <span>📍 {profile.location}</span>}
            <a
              className="text-zinc-700 transition hover:text-zinc-900"
              href={profile.html_url}
              target="_blank"
              rel="noreferrer"
            >
              {username}
            </a>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-5 py-2 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50"
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHubを見る
            </a>
            {websiteUrl && (
              <a
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-5 py-2 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50"
                href={websiteUrl}
                target="_blank"
                rel="noreferrer"
              >
                Website
              </a>
            )}
          </div>
        </div>
        <div className="shrink-0">
          <div className="rounded-3xl border border-zinc-200/70 bg-white p-2 shadow-sm">
            <Image
              className="h-32 w-32 rounded-2xl object-cover md:h-40 md:w-40"
              src={profile.avatar_url}
              alt={`${displayName}のアバター`}
              width={160}
              height={160}
              sizes="(min-width: 768px) 160px, 128px"
              priority
            />
          </div>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-5xl space-y-16 px-6 pb-20">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-zinc-900">自己紹介</h2>
            <span className="text-xs text-zinc-400">
              GitHubプロフィールより
            </span>
          </div>
          <p className="max-w-3xl text-base leading-7 text-zinc-600">{bio}</p>
          {languages.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 text-xs text-zinc-600">
              {languages.map((language) => (
                <span
                  key={language}
                  className="rounded-full border border-zinc-200 px-3 py-1"
                >
                  {language}
                </span>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-zinc-900">開発実績</h2>
            <span className="text-xs text-zinc-400">
              公開リポジトリ（最新8件）
            </span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {repos.map((repo) => (
              <a
                key={repo.id}
                className="group rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-zinc-900 transition group-hover:text-zinc-700">
                      {repo.name}
                    </h3>
                    <p className="text-sm leading-6 text-zinc-600">
                      {repo.description ?? "詳細はGitHubをご覧ください。"}
                    </p>
                  </div>
                  <span className="whitespace-nowrap text-xs text-zinc-400">
                    {formatDate(repo.updated_at)}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                  {repo.language && (
                    <span className="rounded-full border border-zinc-200 px-2 py-1">
                      {repo.language}
                    </span>
                  )}
                  <span>★ {repo.stargazers_count}</span>
                  <span>Fork {repo.forks_count}</span>
                </div>
                {repo.homepage && (
                  <div className="mt-3 text-xs text-zinc-400">
                    {repo.homepage}
                  </div>
                )}
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
