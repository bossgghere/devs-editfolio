export interface VideoItem {
  id: string;
  title: string;
  category: 'vertical' | 'horizontal';
  tag: string;
  thumbnail: string;
  videoUrl: string; // fallback or actual high quality stock video
  description: string;
  skillsUsed: string[];
  aspectRatio: '9:16' | '16:9';
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
