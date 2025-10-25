
export interface Advocate {
  id: string;
  name: string;
  specialty: string;
  location: string;
  experienceYears: number;
  bio: string;
  casesWon: number;
  trustworthinessScore: number; // A score from 1 to 100
  profileImageUrl: string;
}

export interface User {
  name: string;
  email: string;
  avatarUrl?: string;
}
