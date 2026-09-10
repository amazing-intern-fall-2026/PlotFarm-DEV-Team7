import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton, PostCardSkeleton, ProfileSkeleton } from "./Skeleton";

const meta: Meta = {
  title: "Shared/UI/Skeleton",
  tags: ["autodocs"]
};

export default meta;

export const FeedLoadingState: StoryObj = {
  render: () => (
    <div className="max-w-md space-y-4">
      <PostCardSkeleton />
      <PostCardSkeleton />
    </div>
  )
};

export const ProfileLoadingState: StoryObj = {
  render: () => (
    <div className="max-w-md">
      <ProfileSkeleton />
    </div>
  )
};

export const BasePrimitives: StoryObj = {
  render: () => (
    <div className="space-y-3 max-w-sm">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-20 w-full" />
    </div>
  )
};
