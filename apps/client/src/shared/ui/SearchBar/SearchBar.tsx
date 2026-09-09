import * as React from "react";
import { Search, X, History, TrendingUp, User } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export interface SearchSuggestion {
  id: string;
  type: "history" | "trending" | "user";
  title: string;
  subtitle?: string;
}

export interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  recentSearches?: string[];
  suggestions?: SearchSuggestion[];
  onClearRecent?: () => void;
}

export function SearchBar({
  value: externalValue,
  onChange,
  onSearch,
  recentSearches = ["Phòng trừ bọ trĩ", "Giá sầu riêng hôm nay", "Thuê đất trồng hoa Đà Lạt"],
  suggestions = [],
  onClearRecent,
  placeholder = "Tìm kiếm bài viết, nông dân, thửa đất...",
  className,
  ...props
}: SearchBarProps) {
  const [internalValue, setInternalValue] = React.useState(externalValue ?? "");
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const query = externalValue !== undefined ? externalValue : internalValue;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternalValue(val);
    if (onChange) onChange(val);
    setIsOpen(true);
  };

  const handleClear = () => {
    setInternalValue("");
    if (onChange) onChange("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsOpen(false);
      if (onSearch) onSearch(query);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleSelect = (text: string) => {
    setInternalValue(text);
    if (onChange) onChange(text);
    if (onSearch) onSearch(text);
    setIsOpen(false);
  };

  // Click outside to close
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div className="relative flex items-center">
        <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="h-10 w-full rounded-full border border-input bg-muted/50 pl-10 pr-9 text-sm text-foreground transition-all placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          {...props}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 rounded-full p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Xóa tìm kiếm"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-border bg-popover p-2 shadow-lg animate-in fade-in-50 zoom-in-95">
          {query.trim().length === 0 ? (
            <div>
              <div className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <History className="h-3.5 w-3.5" /> Tìm kiếm gần đây
                </span>
                {onClearRecent && recentSearches.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearRecent}
                    className="text-primary hover:underline"
                  >
                    Xóa tất cả
                  </button>
                )}
              </div>
              {recentSearches.length > 0 ? (
                <div className="space-y-0.5 pt-1">
                  {recentSearches.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelect(item)}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <History className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="truncate">{item}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-3 py-4 text-center text-xs text-muted-foreground">
                  Không có lịch sử tìm kiếm gần đây
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-0.5">
              <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                Gợi ý cho "{query}"
              </div>
              {suggestions.length > 0 ? (
                suggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item.title)}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm hover:bg-muted transition-colors"
                  >
                    {item.type === "trending" && (
                      <TrendingUp className="h-4 w-4 text-secondary shrink-0" />
                    )}
                    {item.type === "user" && (
                      <User className="h-4 w-4 text-primary shrink-0" />
                    )}
                    {item.type === "history" && (
                      <History className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-foreground">
                        {item.title}
                      </p>
                      {item.subtitle && (
                        <p className="truncate text-xs text-muted-foreground">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </button>
                ))
              ) : (
                <button
                  type="button"
                  onClick={() => handleSelect(query)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-primary hover:bg-muted"
                >
                  <Search className="h-4 w-4" />
                  <span>Tìm kiếm tất cả kết quả cho "{query}"</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
