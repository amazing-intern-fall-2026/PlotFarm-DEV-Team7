import * as React from "react";
import { MoreHorizontal, MessageSquare, MapPin, Share2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Avatar } from "../Avatar";
import { VerifiedBadge } from "../Tag";
import { ActionButton } from "../ActionButton";
import { MediaGrid, MediaItem } from "../MediaGrid";
import { ReactionPicker, ReactionType } from "../ReactionPicker";
import { CommentThread, CommentData } from "../CommentThread";
import { formatRichText } from "../RichTextarea";
import { UserHoverCard, UserProfileData } from "../UserHoverCard";

export interface PostAuthor extends UserProfileData {}

export interface PostData {
  id: string;
  author: PostAuthor;
  createdAt: string;
  content: string;
  media?: MediaItem[];
  plotTag?: {
    id: string;
    name: string;
    location: string;
  };
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  bookmarksCount: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  isReposted?: boolean;
  comments?: CommentData[];
}

export interface PostCardProps {
  post: PostData;
  onLikeToggle?: (postId: string, active: boolean) => void;
  onReactionSelect?: (postId: string, reaction: ReactionType) => void;
  onBookmarkToggle?: (postId: string, active: boolean) => void;
  onRepostToggle?: (postId: string, active: boolean) => void;
  onShare?: (postId: string) => void;
  className?: string;
}

export function PostCard({
  post,
  onLikeToggle,
  onReactionSelect,
  onBookmarkToggle,
  onRepostToggle,
  onShare,
  className
}: PostCardProps) {
  const [showComments, setShowComments] = React.useState(false);
  const [showReactionPicker, setShowReactionPicker] = React.useState(false);
  const [selectedReaction, setSelectedReaction] = React.useState<ReactionType | null>(
    post.isLiked ? "like" : null
  );
  const reactionTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleLikeMouseEnter = () => {
    reactionTimerRef.current = setTimeout(() => {
      setShowReactionPicker(true);
    }, 300);
  };

  const handleLikeMouseLeave = () => {
    if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
    setShowReactionPicker(false);
  };

  const handleSelectReaction = (type: ReactionType) => {
    setSelectedReaction(type);
    setShowReactionPicker(false);
    if (onReactionSelect) onReactionSelect(post.id, type);
  };

  return (
    <article
      className={cn(
        "w-full rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      {/* Header */}
      <header className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <UserHoverCard user={post.author}>
            <Avatar
              src={post.author.avatarUrl}
              name={post.author.name}
              size="md"
              status="online"
              className="cursor-pointer"
            />
          </UserHoverCard>

          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <UserHoverCard user={post.author}>
                <span className="font-bold text-foreground text-sm hover:underline cursor-pointer">
                  {post.author.name}
                </span>
              </UserHoverCard>
              {post.author.isVerified && (
                <VerifiedBadge variant={post.author.verifiedType || "farmer"} size="sm" />
              )}
              <span className="text-xs text-muted-foreground">
                @{post.author.handle}
              </span>
              <span className="text-xs text-muted-foreground">·</span>
              <time className="text-xs text-muted-foreground">
                {post.createdAt}
              </time>
            </div>

            {post.plotTag && (
              <div className="mt-0.5 flex items-center gap-1 text-[11px] text-primary font-medium">
                <MapPin className="h-3 w-3" />
                <span>{post.plotTag.name} ({post.plotTag.location})</span>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          aria-label="Tùy chọn bài viết"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </header>

      {/* Content */}
      <div className="mt-3 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
        {formatRichText(post.content)}
      </div>

      {/* Media Grid */}
      {post.media && post.media.length > 0 && (
        <div className="mt-3">
          <MediaGrid items={post.media} />
        </div>
      )}

      {/* Footer Reaction Row */}
      <footer className="mt-3 flex items-center justify-between border-t border-border/60 pt-2 relative">
        <div className="flex items-center gap-2">
          {/* Like with hover ReactionPicker */}
          <div
            className="relative"
            onMouseEnter={handleLikeMouseEnter}
            onMouseLeave={handleLikeMouseLeave}
          >
            {showReactionPicker && (
              <div className="absolute bottom-full left-0 mb-2 z-30">
                <ReactionPicker onSelect={handleSelectReaction} />
              </div>
            )}
            <ActionButton
              actionType="like"
              isActive={!!selectedReaction}
              count={post.likesCount}
              onToggle={(active) => {
                setSelectedReaction(active ? "like" : null);
                if (onLikeToggle) onLikeToggle(post.id, active);
              }}
            />
          </div>

          {/* Comment toggle button */}
          <button
            type="button"
            onClick={() => setShowComments((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-emerald-50 hover:text-primary cursor-pointer"
          >
            <MessageSquare className="h-4 w-4" />
            {post.commentsCount > 0 && (
              <span className="tabular-nums">{post.commentsCount}</span>
            )}
          </button>

          {/* Repost */}
          <ActionButton
            actionType="repost"
            isActive={post.isReposted}
            count={post.repostsCount}
            onToggle={(active) => onRepostToggle && onRepostToggle(post.id, active)}
          />

          {/* Bookmark */}
          <ActionButton
            actionType="bookmark"
            isActive={post.isBookmarked}
            count={post.bookmarksCount}
            onToggle={(active) => onBookmarkToggle && onBookmarkToggle(post.id, active)}
          />
        </div>

        <button
          type="button"
          onClick={() => onShare && onShare(post.id)}
          className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          aria-label="Chia sẻ bài viết"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </footer>

      {/* Expanded Comments */}
      {showComments && (
        <CommentThread
          comments={post.comments || []}
          className="mt-3"
          onAddComment={(text, _replyId) => {
            if (post.comments) {
              post.comments.push({
                id: `c-${Date.now()}`,
                author: { name: "Tôi", handle: "user", isVerified: false },
                content: text,
                createdAt: "Vừa xong",
                likesCount: 0
              });
            }
          }}
        />
      )}
    </article>
  );
}
