import type { Meta, StoryObj } from "@storybook/react";
import { CommentThread, CommentData } from "./CommentThread";

const sampleComments: CommentData[] = [
  {
    id: "c-1",
    author: {
      name: "Kỹ sư Trần Bình",
      handle: "kysu_binh",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      isVerified: true
    },
    content: "Bác Ba lưu ý giai đoạn này nên giảm bớt đạm và bổ sung canxi-bo để vỏ quả cà chua dày hơn, tránh nứt khi gặp mưa ẩm nhé!",
    createdAt: "2 giờ trước",
    likesCount: 14,
    isLiked: true,
    replies: [
      {
        id: "c-1-1",
        author: {
          name: "Bác Ba Nông Dân",
          handle: "bacba_dalat",
          avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
          isVerified: true
        },
        content: "Cảm ơn kỹ sư Bình nhiều nha! Tôi vừa phun canxi sinh học sáng nay rồi.",
        createdAt: "1 giờ trước",
        likesCount: 5,
        isLiked: false
      }
    ]
  },
  {
    id: "c-2",
    author: {
      name: "Nguyễn Thảo (Khách thuê Lô B)",
      handle: "thaonguyen_organic",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      isVerified: false
    },
    content: "Nhìn giàn cà chua mê quá bác ơi, cuối tuần này em lên thu hoạch đợt đầu được chưa ạ?",
    createdAt: "35 phút trước",
    likesCount: 2,
    isLiked: false
  }
];

const meta: Meta<typeof CommentThread> = {
  title: "Shared/UI/CommentThread",
  component: CommentThread,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof CommentThread>;

export const Default: Story = {
  args: {
    comments: sampleComments,
    currentUser: {
      name: "Tôi",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    onAddComment: (text, replyToId) =>
      alert(`Đã gửi bình luận: "${text}" ${replyToId ? `(Trả lời cho ${replyToId})` : ""}`)
  }
};
