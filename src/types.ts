export type VideoCategory = 'vertical' | 'horizontal';
export type VideoAspectRatio = '9:16' | '16:9';

export interface VideoItem {
  id: string;
  title: string;
  category: VideoCategory;
  tag: string;
  thumbnail: string;
  videoUrl: string; // fallback or actual high quality stock video
  description: string;
  skillsUsed: string[];
  aspectRatio: VideoAspectRatio;
  subtitle?: string;
  caption?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  messageType: string;
  details: string;
  timestamp: string;
}
