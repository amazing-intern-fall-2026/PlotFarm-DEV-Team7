import * as React from "react";
import { TrendingUp, Sparkles } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Avatar, VerifiedBadge, ActionButton } from "@/shared/ui";

export interface FarmerSuggestion {
  id: string;
  name: string;
  handle: string;
  avatarUrl?: string;
  isVerified?: boolean;
  specialty: string;
  isFollowing?: boolean;
}

export interface TrendingTopic {
  id: string;
  tag: string;
  title: string;
  postsCount: number;
}

export interface RightSidebarProps extends React.HTMLAttributes<HTMLElement> {
  suggestions?: FarmerSuggestion[];
  trendingTopics?: TrendingTopic[];
  onFollowToggle?: (farmerId: string, active: boolean) => void;
  onTagClick?: (tag: string) => void;
}

const defaultSuggestions: FarmerSuggestion[] = [
  {
    id: "f-1",
    name: "Kỹ sư Trần Bình",
    handle: "kysu_binh",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    isVerified: true,
    specialty: "Chuyên gia dinh dưỡng cây trồng",
    isFollowing: false
  },
  {
    id: "f-2",
    name: "Hợp tác xã Cầu Đất",
    handle: "htx_caudat",
    avatarUrl: "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?w=150&auto=format&fit=crop&q=80",
    isVerified: true,
    specialty: "12ha cà phê & chè ô long",
    isFollowing: false
  },
  {
    id: "f-3",
    name: "Trang Trại Xanh Mộc Châu",
    handle: "mocchau_farm",
    avatarUrl: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=150&auto=format&fit=crop&q=80",
    isVerified: false,
    specialty: "Dâu tây Hana Nhật Bản",
    isFollowing: false
  }
];

const defaultTopics: TrendingTopic[] = [
  { id: "t-1", tag: "SauBenhMuaMua", title: "Phòng trừ nấm rễ mùa mưa bão", postsCount: 1420 },
  { id: "t-2", tag: "GiaSauRiengHnay", title: "Biến động giá thu mua sầu riêng Ri6", postsCount: 980 },
  { id: "t-3", tag: "ThuyCanhTietKiem", title: "Mô hình thủy canh hồi lưu tuần hoàn", postsCount: 650 },
  { id: "t-4", tag: "VietGAP_XuatKhau", title: "Quy trình cấp mã vùng trồng mới", postsCount: 420 }
];

export function RightSidebar({
  suggestions = defaultSuggestions,
  trendingTopics = defaultTopics,
  onFollowToggle,
  onTagClick,
  className,
  ...props
}: RightSidebarProps) {
  return (
    <aside className={cn("w-80 space-y-4 p-4", className)} {...props}>
      {/* Suggestions Container */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-xs space-y-3.5">
        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Sparkles className="h-4 w-4 text-secondary" />
          <span>Gợi ý nông dân nên theo dõi</span>
        </div>

        <div className="space-y-3">
          {suggestions.map((farmer) => (
            <div key={farmer.id} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <Avatar
                  src={farmer.avatarUrl}
                  name={farmer.name}
                  size="md"
                  status="online"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="truncate text-xs font-bold text-foreground">
                      {farmer.name}
                    </p>
                    {farmer.isVerified && <VerifiedBadge size="sm" />}
                  </div>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {farmer.specialty}
                  </p>
                </div>
              </div>

              <ActionButton
                actionType="follow"
                isActive={farmer.isFollowing}
                onToggle={(active) => onFollowToggle && onFollowToggle(farmer.id, active)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics Container */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span>Chủ đề nông nghiệp thịnh hành</span>
        </div>

        <div className="space-y-2.5">
          {trendingTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => onTagClick && onTagClick(topic.tag)}
              className="group cursor-pointer rounded-lg p-2 transition-colors hover:bg-muted/60"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary group-hover:underline">
                  #{topic.tag}
                </span>
                <span className="text-[10px] text-muted-foreground tabular-nums">
                  {topic.postsCount} bài viết
                </span>
              </div>
              <p className="mt-0.5 line-clamp-1 text-xs text-foreground/90">
                {topic.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Footer */}
      <footer className="px-2 text-[11px] text-muted-foreground leading-relaxed space-y-1">
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          <a href="#" className="hover:underline">Điều khoản</a>
          <span>·</span>
          <a href="#" className="hover:underline">Chính sách bảo mật</a>
          <span>·</span>
          <a href="#" className="hover:underline">Quy chuẩn nông nghiệp</a>
          <span>·</span>
          <a href="#" className="hover:underline">Hỗ trợ</a>
        </div>
        <p>© 2026 PlotFarm. Nền tảng chia sẻ & cho thuê nông nghiệp thông minh.</p>
      </footer>
    </aside>
  );
}
