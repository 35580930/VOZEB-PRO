"use client";

import Link from "next/link";
import { ArrowRight, Clapperboard, Compass, Maximize2, Send, Sparkles } from "lucide-react";
import { type FormEvent, useState } from "react";

import { SiteLogo } from "@/components/layout/site-logo";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useThemeStore } from "@/stores/use-theme-store";
import { useHomeActions } from "./home-actions";

const entries = [
    { label: "Agent 创作", description: "一句话开始图片、视频与音频创作", href: "/create", icon: Sparkles },
    { label: "节点画布", description: "连接素材、提示词与生成任务", href: "/canvas", icon: Maximize2 },
    { label: "短剧制作", description: "从剧本、分镜到镜头生成", href: "/drama", icon: Clapperboard },
] as const;

export function HomeSimple() {
    const [prompt, setPrompt] = useState("");
    const { authenticated, site, openLogin, openProtectedPath, startCreating } = useHomeActions();
    const theme = useThemeStore((state) => state.theme);
    const setTheme = useThemeStore((state) => state.setTheme);

    const submit = (event: FormEvent) => {
        event.preventDefault();
        if (prompt.trim()) startCreating(prompt.trim());
        else openProtectedPath("/create");
    };

    return (
        <main className="app-scroll-page bg-[#f7f7f5] text-stone-950 dark:bg-[#111210] dark:text-stone-50">
            <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[#f7f7f5]/90 backdrop-blur-xl dark:border-stone-800 dark:bg-[#111210]/90">
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label={`${site.title} 首页`}>
                        <SiteLogo logoUrl={site.logoUrl} className="size-8 shrink-0" />
                        <span className="truncate text-base font-semibold tracking-tight">{site.title}</span>
                    </Link>

                    <nav className="hidden items-center gap-7 text-sm text-stone-600 md:flex dark:text-stone-300" aria-label="首页导航">
                        <button type="button" className="transition hover:text-stone-950 dark:hover:text-white" onClick={() => openProtectedPath("/create")}>
                            Agent
                        </button>
                        <button type="button" className="transition hover:text-stone-950 dark:hover:text-white" onClick={() => openProtectedPath("/canvas")}>
                            画布
                        </button>
                        <button type="button" className="transition hover:text-stone-950 dark:hover:text-white" onClick={() => openProtectedPath("/drama")}>
                            短剧
                        </button>
                        <Link href="/gallery" className="transition hover:text-stone-950 dark:hover:text-white">
                            广场
                        </Link>
                    </nav>

                    <div className="flex shrink-0 items-center gap-2">
                        <AnimatedThemeToggler
                            theme={theme}
                            onThemeChange={setTheme}
                            className="grid size-9 place-items-center rounded-full border border-stone-200 bg-white text-stone-700 transition hover:border-stone-300 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
                            aria-label={theme === "dark" ? "切换到浅色主题" : "切换到深色主题"}
                        />
                        <button
                            type="button"
                            className="h-9 rounded-full bg-stone-950 px-4 text-sm font-medium !text-white transition hover:bg-stone-800 hover:!text-white dark:bg-white dark:!text-stone-950 dark:hover:bg-stone-200 dark:hover:!text-stone-950"
                            onClick={() => (authenticated ? openProtectedPath("/create") : openLogin("/create"))}
                        >
                            {authenticated ? "进入工作台" : "登录"}
                        </button>
                    </div>
                </div>
            </header>

            <section className="mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-5xl flex-col justify-center px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="mb-5 text-sm font-medium text-stone-500 dark:text-stone-400">一站式 AI 创作空间</p>
                    <h1 className="text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl">把想法，直接变成作品。</h1>
                    <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-stone-600 sm:text-lg dark:text-stone-300">描述你的需求，Agent 会协助完成图片、视频、音频、画布和短剧创作。</p>
                </div>

                <form className="mx-auto mt-10 w-full max-w-3xl rounded-2xl border border-stone-200 bg-white p-3 shadow-[0_18px_50px_rgba(28,25,23,0.07)] dark:border-stone-700 dark:bg-stone-900 dark:shadow-black/20" onSubmit={submit}>
                    <label htmlFor="home-simple-prompt" className="sr-only">
                        描述你想创作的内容
                    </label>
                    <textarea
                        id="home-simple-prompt"
                        value={prompt}
                        rows={3}
                        className="min-h-28 w-full resize-none bg-transparent px-3 py-2 text-base leading-7 outline-none placeholder:text-stone-400"
                        placeholder="描述你想创作的内容……"
                        onChange={(event) => setPrompt(event.target.value)}
                        onKeyDown={(event) => {
                            if ((event.ctrlKey || event.metaKey) && event.key === "Enter") event.currentTarget.form?.requestSubmit();
                        }}
                    />
                    <div className="flex items-center justify-between gap-3 border-t border-stone-100 px-1 pt-3 dark:border-stone-800">
                        <span className="pl-2 text-xs text-stone-400">支持图片、视频、音频与参考素材</span>
                        <button
                            type="submit"
                            className="inline-flex h-10 items-center gap-2 rounded-xl bg-stone-950 px-4 text-sm font-medium !text-white transition hover:bg-stone-800 hover:!text-white dark:bg-white dark:!text-stone-950 dark:hover:bg-stone-200 dark:hover:!text-stone-950"
                        >
                            开始创作 <Send className="size-4" aria-hidden="true" />
                        </button>
                    </div>
                </form>

                <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-stone-200 bg-stone-200 sm:grid-cols-3 dark:border-stone-800 dark:bg-stone-800">
                    {entries.map((entry) => {
                        const Icon = entry.icon;
                        return (
                            <button key={entry.href} type="button" className="group flex min-h-36 flex-col bg-[#f7f7f5] p-5 text-left transition hover:bg-white dark:bg-[#111210] dark:hover:bg-stone-900" onClick={() => openProtectedPath(entry.href)}>
                                <Icon className="size-5 text-stone-500 dark:text-stone-400" aria-hidden="true" />
                                <span className="mt-6 flex items-center justify-between gap-3 text-base font-semibold">
                                    {entry.label}
                                    <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
                                </span>
                                <span className="mt-1.5 text-sm leading-6 text-stone-500 dark:text-stone-400">{entry.description}</span>
                            </button>
                        );
                    })}
                </div>

                <Link href="/gallery" className="mx-auto mt-8 inline-flex items-center gap-2 text-sm text-stone-500 transition hover:text-stone-950 dark:text-stone-400 dark:hover:text-white">
                    <Compass className="size-4" aria-hidden="true" />
                    看看大家的作品
                    <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
            </section>

            <footer className="border-t border-stone-200/80 dark:border-stone-800">
                <div className="mx-auto flex min-h-24 w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-stone-500 sm:flex-row sm:px-6 lg:px-8 dark:text-stone-400">
                    <span>{site.footerCopyright?.trim() || `© ${new Date().getFullYear()} ${site.title}`}</span>
                    <div className="flex items-center gap-5">
                        {site.privacyUrl?.trim() ? <Link href={site.privacyUrl.trim()}>隐私政策</Link> : null}
                        {site.termsUrl?.trim() ? <Link href={site.termsUrl.trim()}>服务条款</Link> : null}
                    </div>
                </div>
            </footer>
        </main>
    );
}
