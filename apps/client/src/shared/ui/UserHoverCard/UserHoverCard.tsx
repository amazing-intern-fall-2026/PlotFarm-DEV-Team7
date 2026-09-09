import * as React from "react";
import { MapPin, Sprout } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Avatar } from "../Avatar";
import { VerifiedBadge } from "../Tag";
import { ActionButton } from "../ActionButton";

export interface UserProfileData {
  id: string;
  name: string;
  handle: string;
  avatarUrl?: string;
  isVerified?: boolean;
  verifiedType?: "farmer" | "expert" | "standard";
  bio?: string;
  location?: string;
  followingCount: number;
  followersCount: number;
  activePlotsCount?: number;
  isFollowing?: boolean;
}

export interface UserHoverCardProps {
  user: UserProfileData;
  children: React.ReactNode;
  onFollowToggle?: (isFollowing: boolean) => void;
  className?: string;
}

export function UserHoverCard({
  user,
  children,
  onFollowToggle,
  className
}: UserHoverCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  return (
    <div
      className={cn("relative inline-block", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-80 rounded-xl border border-border bg-popover p-4 shadow-xl animate-in fade-in-50 zoom-in-95">
          <div className="flex items-start justify-between">
            <Avatar
              src={user.avatarUrl}
              name={user.name}
              size="lg"
              status="online"
            />
            <ActionButton
              actionType="follow"
              isActive={user.isFollowing}
              onToggle={onFollowToggle}
            />
          </div>

          <div className="mt-2.5">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-foreground text-base">
                {user.name}
              </span>
              {user.isVerified && (
                <VerifiedBadge variant={user.verifiedType || "farmer"} />
              )}
            </div>
            <p className="text-xs text-muted-foreground">@{user.handle}</p>
          </div>

          {user.bio && (
            <p className="mt-2 text-xs text-foreground/90 leading-relaxed">
              {user.bio}
            </p>
          )}

          {user.location && (
            <div className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{user.location}</span>
            </div>
          )}

          <div className="mt-3.5 flex items-center gap-4 border-t border-border pt-3 text-xs">
            <div>
              <span className="font-bold text-foreground">
                {user.followingCount}
              </span>{" "}
              <span className="text-muted-foreground">Đang theo dõi</span>
            </div>
            <div>
              <span className="font-bold text-foreground">
                {user.followersCount}
              </span>{" "}
              <span className="text-muted-foreground">Người theo dõi</span>
            </div>
          </div>

          {user.activePlotsCount !== undefined && user.activePlotsCount > 0 && (
            <div className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs text-emerald-800 font-medium">
              <Sprout className="h-3.5 w-3.5 text-emerald-600" />
              <span>{user.activePlotsCount} mảnh đất đang quản lý</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
