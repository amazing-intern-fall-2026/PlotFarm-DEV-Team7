import type { Meta, StoryObj } from "@storybook/react";
import { PostCard, PostData } from "./PostCard";

const samplePost: PostData = {
  id: "post-1",
  author: {
    id: "u-1",
    name: "Bác Ba Nông Dân",
    handle: "bacba_dalat",
    avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    isVerified: true,
    verifiedType: "farmer",
    bio: "Chuyên canh cà chua bi & ớt chuông chuẩn VietGAP tại Đà Lạt.",
    location: "Cầu Đất, TP. Đà Lạt",
    followingCount: 120,
    followersCount: 3450,
    activePlotsCount: 3
  },
  createdAt: "3 giờ trước",
  content: "Hôm nay thời tiết Đà Lạt nắng đẹp dịu mát 🌿. Lô cà chua bi vàng thuỷ canh tại #ThuaDat_A12 phát triển rất đều sau 4 tuần, chùm quả bắt đầu ngả vàng óng. Bác nào đã thuê thửa đất này nhớ ghé thăm vào cuối tuần nhé! @farm_manager",
  plotTag: {
    id: "plot-a12",
    name: "Lô A-12 (Vườn Cà Chua Bi)",
    location: "Cầu Đất, Đà Lạt"
  },
  media: [
    {
      id: "m-1",
      url: "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?w=800&auto=format&fit=crop&q=80",
      alt: "Vườn rau xanh mướt"
    },
    {
      id: "m-2",
      url: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&auto=format&fit=crop&q=80",
      alt: "Cà chua bi vàng"
    },
    {
      id: "m-3",
      url: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&auto=format&fit=crop&q=80",
      alt: "Thu hoạch trái cây"
    }
  ],
  likesCount: 184,
  commentsCount: 23,
  repostsCount: 15,
  bookmarksCount: 42,
  isLiked: false,
  comments: [
    {
      id: "c-1",
      author: {
        name: "Kỹ sư Trần Bình",
        handle: "kysu_binh",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        isVerified: true
      },
      content: "Nhìn giàn cà chua trái trĩu cành đẹp quá bác Ba!",
      createdAt: "1 giờ trước",
      likesCount: 6
    }
  ]
};

const meta: Meta<typeof PostCard> = {
  title: "Shared/UI/PostCard",
  component: PostCard,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof PostCard>;

export const Default: Story = {
  args: {
    post: samplePost
  }
};

export const TextOnlyPost: Story = {
  args: {
    post: {
      ...samplePost,
      id: "post-2",
      media: [],
      content: "Thông báo tới các bác nông dân: Tuần tới dự báo miền Trung có đợt mưa kéo dài, các chủ vườn cần kiểm tra ngay hệ thống thoát nước luống và chuẩn bị màng phủ chống xói mòn rễ nhé! #LuuYThoiTiet #NongNghiepThongMinh"
    }
  }
};
