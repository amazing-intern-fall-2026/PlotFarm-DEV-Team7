import * as React from "react";
import { Send, Smile, Heart } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Avatar } from "../Avatar";
import { VerifiedBadge } from "../Tag";

export interface CommentData {
  id: string;
  author: {
    name: string;
    handle: string;
    avatarUrl?: string;
    isVerified?: boolean;
  };
  content: string;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
  replies?: CommentData[];
}

export interface CommentThreadProps {
  comments: CommentData[];
  currentUser?: {
    name: string;
    avatarUrl?: string;
  };
  onAddComment?: (text: string, replyToId?: string) => void;
  onLikeComment?: (commentId: string) => void;
  className?: string;
}

export function CommentItem({
  comment,
  onLike,
  onReply
}: {
  comment: CommentData;
  onLike?: (id: string) => void;
  onReply?: (comment: CommentData) => void;
}) {
  const [isLiked, setIsLiked] = React.useState(comment.isLiked ?? false);
  const [likesCount, setLikesCount] = React.useState(comment.likesCount);

  const handleLike = () => {
    const next = !isLiked;
    setIsLiked(next);
    setLikesCount((prev) => (next ? prev + 1 : Math.max(0, prev - 1)));
    if (onLike) onLike(comment.id);
  };

  return (
    <div className="flex gap-3 text-sm">
      <Avatar
        src={comment.author.avatarUrl}
        name={comment.author.name}
        size="sm"
        className="mt-0.5"
      />
      <div className="flex-1 min-w-0 space-y-1">
        <div className="rounded-2xl bg-muted/60 px-3.5 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-foreground text-xs">
              {comment.author.name}
            </span>
            {comment.author.isVerified && <VerifiedBadge size="sm" />}
            <span className="text-[11px] text-muted-foreground ml-1">
              {comment.createdAt}
            </span>
          </div>
          <p className="mt-1 text-xs text-foreground/90 leading-relaxed whitespace-pre-wrap">
            {comment.content}
          </p>
        </div>

        <div className="flex items-center gap-4 px-2 text-[11px] font-medium text-muted-foreground">
          <button
            type="button"
            onClick={handleLike}
            className={cn(
              "flex items-center gap-1 hover:text-foreground transition-colors",
              isLiked && "text-red-500 font-semibold"
            )}
          >
            <Heart
              className={cn("h-3 w-3", isLiked && "fill-red-500 text-red-500")}
            />
            <span>{likesCount > 0 ? likesCount : "Thích"}</span>
          </button>
          <button
            type="button"
            onClick={() => onReply && onReply(comment)}
            className="hover:text-foreground transition-colors"
          >
            Trả lời
          </button>
        </div>

        {/* Nested Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2 space-y-2.5 pl-3 border-l-2 border-border/60 pt-1">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                onLike={onLike}
                onReply={onReply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function CommentThread({
  comments,
  currentUser = { name: "Tôi" },
  onAddComment,
  onLikeComment,
  className
}: CommentThreadProps) {
  const [inputText, setInputText] = React.useState("");
  const [replyingTo, setReplyingTo] = React.useState<CommentData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    if (onAddComment) {
      onAddComment(inputText.trim(), replyingTo?.id);
    }
    setInputText("");
    setReplyingTo(null);
  };

  return (
    <div className={cn("space-y-4 pt-3 border-t border-border/60", className)}>
      {/* Input box */}
      <form onSubmit={handleSubmit} className="flex gap-2.5 items-start">
        <Avatar src={currentUser.avatarUrl} name={currentUser.name} size="sm" />
        <div className="flex-1 min-w-0">
          {replyingTo && (
            <div className="flex items-center justify-between text-xs text-primary bg-emerald-50 px-2.5 py-1 rounded-md mb-1.5">
              <span>Đang trả lời <b>@{replyingTo.author.handle}</b></span>
              <button
                type="button"
                onClick={() => setReplyingTo(null)}
                className="text-muted-foreground hover:text-foreground ml-2"
              >
                Hủy
              </button>
            </div>
          )}
          <div className="relative flex items-center rounded-2xl border border-input bg-muted/40 px-3 py-1.5 focus-within:border-primary focus-within:bg-background focus-within:ring-1 focus-within:ring-primary">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Viết bình luận hoặc chia sẻ mẹo làm nông..."
              className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none pr-16"
            />
            <div className="absolute right-2 flex items-center gap-1">
              <button
                type="button"
                className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Chọn emoji"
                onClick={() => setInputText((prev) => prev + " 🌾")}
              >
                <Smile className="h-4 w-4" />
              </button>
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="rounded-full bg-primary p-1.5 text-primary-foreground disabled:opacity-40 transition-opacity hover:bg-primary/90"
                aria-label="Gửi bình luận"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comment List */}
      <div className="space-y-3 pt-1">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onLike={onLikeComment}
            onReply={(c) => setReplyingTo(c)}
          />
        ))}
      </div>
    </div>
  );
}
