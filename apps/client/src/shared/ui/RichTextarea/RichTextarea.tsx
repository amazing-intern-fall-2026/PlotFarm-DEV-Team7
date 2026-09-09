import * as React from "react";
import { ExternalLink, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export interface LinkPreviewData {
  url: string;
  title: string;
  description?: string;
  image?: string;
  domain?: string;
}

export interface RichTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  linkPreview?: LinkPreviewData | null;
  onRemoveLinkPreview?: () => void;
  maxCharacters?: number;
}

export function formatRichText(text: string): React.ReactNode[] {
  // Regex to split by hashtag or mention
  const parts = text.split(/(#[a-zA-Z0-9_À-ỹ]+|@[a-zA-Z0-9_À-ỹ]+)/g);
  return parts.map((part, index) => {
    if (part.startsWith("#")) {
      return (
        <span
          key={index}
          className="font-medium text-primary hover:underline cursor-pointer"
        >
          {part}
        </span>
      );
    }
    if (part.startsWith("@")) {
      return (
        <span
          key={index}
          className="font-medium text-secondary hover:underline cursor-pointer"
        >
          {part}
        </span>
      );
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

const RichTextarea = React.forwardRef<HTMLTextAreaElement, RichTextareaProps>(
  (
    {
      className,
      value,
      defaultValue,
      onChange,
      linkPreview,
      onRemoveLinkPreview,
      maxCharacters,
      placeholder = "Chia sẻ tiến độ canh tác của bạn...",
      disabled,
      ...props
    },
    ref
  ) => {
    const internalRef = React.useRef<HTMLTextAreaElement | null>(null);
    const [text, setText] = React.useState<string>(
      (value ?? defaultValue ?? "") as string
    );

    const handleTextareaChange = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setText(e.target.value);
      // Auto-resize
      const textarea = e.target;
      textarea.style.height = "auto";
      textarea.style.height = `${Math.max(textarea.scrollHeight, 80)}px`;

      if (onChange) onChange(e);
    };

    React.useEffect(() => {
      if (value !== undefined) {
        setText(value as string);
      }
    }, [value]);

    const charCount = text.length;
    const isOverLimit = maxCharacters ? charCount > maxCharacters : false;

    return (
      <div className="w-full space-y-3 rounded-lg border border-input bg-background p-3 transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
        <textarea
          ref={(node) => {
            internalRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          value={value !== undefined ? value : text}
          onChange={handleTextareaChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={3}
          className={cn(
            "w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none",
            className
          )}
          {...props}
        />

        {linkPreview && (
          <div className="relative flex items-center gap-3 rounded-md border border-border bg-muted/40 p-2.5 transition-colors hover:bg-muted/60">
            {linkPreview.image && (
              <img
                src={linkPreview.image}
                alt={linkPreview.title}
                className="h-16 w-16 rounded object-cover shrink-0"
              />
            )}
            <div className="min-w-0 flex-1">
              <a
                href={linkPreview.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs font-semibold text-foreground hover:underline"
              >
                <span className="truncate">{linkPreview.title}</span>
                <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground" />
              </a>
              {linkPreview.description && (
                <p className="line-clamp-1 text-xs text-muted-foreground mt-0.5">
                  {linkPreview.description}
                </p>
              )}
              {linkPreview.domain && (
                <span className="text-[11px] text-primary/80 font-medium mt-1 block">
                  {linkPreview.domain}
                </span>
              )}
            </div>
            {onRemoveLinkPreview && (
              <button
                type="button"
                onClick={onRemoveLinkPreview}
                aria-label="Remove link preview"
                className="rounded-full p-1 text-muted-foreground hover:bg-background hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        {maxCharacters && (
          <div className="flex justify-end text-xs">
            <span
              className={cn(
                "font-medium",
                isOverLimit ? "text-destructive" : "text-muted-foreground"
              )}
            >
              {charCount} / {maxCharacters}
            </span>
          </div>
        )}
      </div>
    );
  }
);
RichTextarea.displayName = "RichTextarea";

export { RichTextarea };
