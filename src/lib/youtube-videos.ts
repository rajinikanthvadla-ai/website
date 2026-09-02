import youtubeFeed from "../../content/youtube-videos.json";
import { COURSE_VIDEOS, type CourseVideo } from "./course-videos";

export type YoutubeFeedVideo = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  url: string;
};

export type YoutubeFeed = {
  channelId: string;
  channelUrl: string;
  channelTitle: string;
  lastSyncedAt: string;
  videos: YoutubeFeedVideo[];
};

export const YOUTUBE_CHANNEL_ID = "UCeFXgm7rc9WzmRF1UZ7B4PA";

export function getLatestYoutubeVideos(limit = 6): CourseVideo[] {
  const feed = youtubeFeed as YoutubeFeed;

  if (feed.videos?.length) {
    return feed.videos.slice(0, limit).map((video) => ({
      id: video.id,
      title: video.title,
      description: video.description || "Watch on Rajinikanth Vadla's YouTube channel.",
      uploadDate: video.publishedAt,
    }));
  }

  return [...COURSE_VIDEOS.masterclass, ...COURSE_VIDEOS.aiAgents]
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
    .slice(0, limit);
}

export function getYoutubeLastSyncedLabel(): string | null {
  const feed = youtubeFeed as YoutubeFeed;
  if (!feed.lastSyncedAt) return null;

  const date = new Date(feed.lastSyncedAt);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
