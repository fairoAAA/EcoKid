import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useLanguage } from "@/i18n/LanguageContext";
import { pick } from "@/i18n/types";
import { baseArticles } from "@/data/articles";
import { gamesList } from "@/data/gamesList";

export const SearchDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const articleResults = baseArticles.map((a) => ({
      key: `article-${a.slug}`,
      title: pick(a.title, language),
      emoji: a.emoji,
      href: `/articles/${a.slug}`,
      group: t("nav.articles"),
    }));
    const gameResults = gamesList
      .filter((g) => g.playable)
      .map((g) => ({
        key: `game-${g.id}`,
        title: pick(g.title, language),
        emoji: g.emoji,
        href: g.href,
        group: t("nav.games"),
      }));
    return [...articleResults, ...gameResults];
  }, [language, t]);

  const handleSelect = (href: string) => {
    onOpenChange(false);
    setQuery("");
    navigate(href);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder={t("nav.searchPlaceholder")} value={query} onValueChange={setQuery} />
      <CommandList>
        <CommandEmpty>{t("nav.searchEmpty")}</CommandEmpty>
        <CommandGroup heading={t("nav.articles")}>
          {results
            .filter((r) => r.group === t("nav.articles"))
            .map((r) => (
              <CommandItem key={r.key} value={r.title} onSelect={() => handleSelect(r.href)}>
                <span className="mr-2">{r.emoji}</span> {r.title}
              </CommandItem>
            ))}
        </CommandGroup>
        <CommandGroup heading={t("nav.games")}>
          {results
            .filter((r) => r.group === t("nav.games"))
            .map((r) => (
              <CommandItem key={r.key} value={r.title} onSelect={() => handleSelect(r.href)}>
                <span className="mr-2">{r.emoji}</span> {r.title}
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
