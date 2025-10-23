export type Category = {
  id: string;
  name: string;
  habits: Habit[];
};

export type Friend = {
  id: string;
  user: User;
  userId: string;
  friendId: string;
  status: "accepted" | "pending" | "rejected";
};

export type User = {
  id: string;
  email: string;
  name?: string;
  timezone: string;
  language: string;
  subscriptionTier: string;
  habits: Habit[];
  friends: Friend[];
  devices: Device[];
  integrations: Integration[];
  createdAt: Date;
  updatedAt?: Date;
};

export type HabitFrequency = {
  id: string;
  name: string;
  description?: string;
  type: "daily" | "weekly" | "monthly" | "custom";
  interval?: number; // e.g., every 2 days, every 3 weeks
  daysOfWeek?: number[]; // 0-6 (Sunday-Saturday) for weekly habits
  daysOfMonth?: number[]; // 1-31 for monthly habits
  customPattern?: string; // for complex patterns
  createdAt: Date;
  updatedAt?: Date;
};

export type HabitSchedule = {
  id: string;
  habit: Habit;
  habitId: string;
  type: "time" | "location" | "habit_stacking" | "calendar_event";
  time?: Date;
  daysOfWeek?: number[]; // 0-6 (Sunday-Saturday)
  daysOfMonth?: number[]; // 1-31
  locations?: Location[];
  triggerHabitId?: string; // for habit stacking
  calendarEventId?: string; // for calendar integration
  enabled: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

export type HabitReminder = {
  id: string;
  habit: Habit;
  habitId: string;
  schedule: HabitSchedule;
  scheduleId: string;
  type: "notification" | "email" | "sms" | "push";
  title: string;
  message: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

export type Habit = {
  id: string;
  user: User;
  userId: string;
  name: string;
  description?: string;
  category?: Category;
  categoryId?: string;
  icon?: string;
  frequency: HabitFrequency;
  goalType: "count" | "duration";
  targetValue?: number;
  unit?: string;
  isArchived: boolean;
  logs: HabitLog[];
  reminders: HabitReminder[];
  streaks: HabitStreak[];
  createdAt: Date;
  updatedAt?: Date;
};

export type HabitLog = {
  id: string;
  habit: Habit;
  habitId: string;
  user: User;
  userId: string;
  date: Date;
  status: "none" | "done" | "missed" | "partial";
  value?: number;
  note?: string;
  recordedAt: Date;
};

export type HabitStreak = {
  id: string;
  habit: Habit;
  habitId: string;
  user: User;
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastCompleted?: Date;
};

export type Challenge = {
  id: string;
  name: string;
  description?: string;
  category: string; // e.g., "fitness", "productivity", "mindfulness"
  type: "individual" | "group" | "global";
  startDate: Date;
  endDate: Date;
  maxParticipants?: number;
  minParticipants?: number;
  reward?: ChallengeReward;
  rules: ChallengeRule[];
  habits: ChallengeHabit[];
  createdBy: User;
  createdById: string;
  participants: ChallengeParticipant[];
  leaderboard: ChallengeLeaderboardEntry[];
  isActive: boolean;
  isPublic: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

export type ChallengeReward = {
  id: string;
  challenge: Challenge;
  challengeId: string;
  type: "badge" | "points" | "achievement" | "custom";
  name: string;
  description: string;
  icon?: string;
  value?: number; // for points
  customReward?: string; // for custom rewards
  createdAt: Date;
};

export type ChallengeRule = {
  id: string;
  challenge: Challenge;
  challengeId: string;
  type: "completion_rate" | "streak" | "value_threshold" | "frequency";
  operator:
    | "greater_than"
    | "less_than"
    | "equals"
    | "greater_than_or_equal"
    | "less_than_or_equal";
  value: number;
  description: string;
  createdAt: Date;
};

export type ChallengeHabit = {
  id: string;
  challenge: Challenge;
  challengeId: string;
  habit: Habit;
  habitId: string;
  weight: number; // importance weight for scoring
  isRequired: boolean;
  createdAt: Date;
};

export type ChallengeParticipant = {
  id: string;
  challenge: Challenge;
  challengeId: string;
  user: User;
  userId: string;
  joinedAt: Date;
  progress: number; // percentage 0-100
  score: number; // calculated score based on rules
  rank?: number; // current rank in leaderboard
  rewards: ChallengeReward[];
  isCompleted: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt?: Date;
};

export type ChallengeLeaderboardEntry = {
  id: string;
  challenge: Challenge;
  challengeId: string;
  participant: ChallengeParticipant;
  participantId: string;
  rank: number;
  score: number;
  progress: number;
  lastUpdated: Date;
  createdAt: Date;
};

export type Device = {
  id: string;
  user: User;
  userId: string;
  deviceType: string;
  lastSync?: Date;
};

export type Integration = {
  id: string;
  user: User;
  userId: string;
  provider: string; // e.g., "Apple Health", "Google Fit"
  accessToken?: string;
  lastSync?: Date;
};

export type HabitChecklistItem = {
  id: string;
  name: string;
  order: number;
  description?: string;
  completed?: boolean;
  totalCount?: number;
  remainingCount?: number;
};

export type Location = {
  latitude: number;
  longitude: number;
  radius: number;
};

export type Scheduler = {
  every?: number;
  unit?: "minutes" | "hours" | "days" | "weeks" | "months" | "years";
};

export type HabitAnalytics = {
  id: string;
  habit: Habit;
  habitId: string;
  user: User;
  userId: string;
  period: "daily" | "weekly" | "monthly" | "yearly";
  startDate: Date;
  endDate: Date;
  completionRate: number; // percentage 0-100
  totalCompletions: number;
  totalMisses: number;
  averageValue?: number; // for count/duration habits
  bestStreak: number;
  currentStreak: number;
  perfectDays: number; // days with 100% completion
  consistencyScore: number; // 0-100
  trend: "improving" | "stable" | "declining";
  insights: string[]; // AI-generated insights
  createdAt: Date;
  updatedAt?: Date;
};

export type HabitStatistics = {
  id: string;
  habit: Habit;
  habitId: string;
  user: User;
  userId: string;
  totalDaysTracked: number;
  totalCompletions: number;
  totalMisses: number;
  longestStreak: number;
  currentStreak: number;
  averageCompletionRate: number;
  bestMonth: string; // YYYY-MM format
  worstMonth: string; // YYYY-MM format
  mostProductiveDay: number; // 0-6 (Sunday-Saturday)
  leastProductiveDay: number; // 0-6 (Sunday-Saturday)
  averageValue?: number;
  totalValue?: number; // cumulative value for count/duration habits
  createdAt: Date;
  updatedAt?: Date;
};

export type HabitInsight = {
  id: string;
  habit: Habit;
  habitId: string;
  user: User;
  userId: string;
  type: "achievement" | "warning" | "suggestion" | "motivation";
  title: string;
  message: string;
  data?: Record<string, any>; // supporting data for the insight
  isRead: boolean;
  createdAt: Date;
};

export type Program = {
  id: string;
  name: string;
  description: string;
  category: string; // e.g., "fitness", "productivity", "mindfulness"
  duration: number; // days
  difficulty: "beginner" | "intermediate" | "advanced";
  habits: ProgramHabit[];
  tips: ProgramTip[];
  checkIns: ProgramCheckIn[];
  participants: ProgramParticipant[];
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

export type ProgramHabit = {
  id: string;
  program: Program;
  programId: string;
  habit: Habit;
  habitId: string;
  order: number;
  isRequired: boolean;
  startDay: number; // day in program when habit starts
  endDay?: number; // day in program when habit ends (optional)
  createdAt: Date;
};

export type ProgramTip = {
  id: string;
  program: Program;
  programId: string;
  day: number; // day in program
  title: string;
  content: string;
  type: "motivation" | "technique" | "science" | "story";
  isRead: boolean;
  createdAt: Date;
};

export type ProgramCheckIn = {
  id: string;
  program: Program;
  programId: string;
  user: User;
  userId: string;
  day: number; // day in program
  questions: ProgramCheckInQuestion[];
  responses: ProgramCheckInResponse[];
  mood: number; // 1-10 scale
  notes?: string;
  completedAt: Date;
  createdAt: Date;
};

export type ProgramCheckInQuestion = {
  id: string;
  checkIn: ProgramCheckIn;
  checkInId: string;
  question: string;
  type: "text" | "scale" | "multiple_choice" | "boolean";
  options?: string[]; // for multiple choice
  order: number;
  createdAt: Date;
};

export type ProgramCheckInResponse = {
  id: string;
  question: ProgramCheckInQuestion;
  questionId: string;
  checkIn: ProgramCheckIn;
  checkInId: string;
  answer: string | number | boolean;
  createdAt: Date;
};

export type ProgramParticipant = {
  id: string;
  program: Program;
  programId: string;
  user: User;
  userId: string;
  startDate: Date;
  endDate?: Date;
  progress: number; // percentage 0-100
  isCompleted: boolean;
  joinedAt: Date;
};

export type Widget = {
  id: string;
  user: User;
  userId: string;
  type:
    | "habit_list"
    | "streak_counter"
    | "progress_chart"
    | "quick_log"
    | "today_summary";
  name: string;
  size: "small" | "medium" | "large";
  habits: Habit[]; // habits to display in widget
  position: number; // order on home screen
  isEnabled: boolean;
  settings: WidgetSettings;
  createdAt: Date;
  updatedAt?: Date;
};

export type WidgetSettings = {
  showStreaks: boolean;
  showProgress: boolean;
  showCompletionRate: boolean;
  theme: "light" | "dark" | "auto";
  compactMode: boolean;
  showHabitIcons: boolean;
  maxHabits?: number; // for habit list widgets
  refreshInterval?: number; // minutes
};

export type Notification = {
  id: string;
  user: User;
  userId: string;
  type:
    | "habit_reminder"
    | "streak_milestone"
    | "challenge_update"
    | "program_tip"
    | "achievement"
    | "motivation"
    | "system";
  title: string;
  message: string;
  data?: Record<string, any>; // additional data for the notification
  habit?: Habit;
  habitId?: string;
  challenge?: Challenge;
  challengeId?: string;
  program?: Program;
  programId?: string;
  isRead: boolean;
  isDelivered: boolean;
  scheduledFor?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  createdAt: Date;
};

export type NotificationSettings = {
  id: string;
  user: User;
  userId: string;
  habitReminders: boolean;
  streakMilestones: boolean;
  challengeUpdates: boolean;
  programTips: boolean;
  achievements: boolean;
  motivationMessages: boolean;
  systemNotifications: boolean;
  quietHours: {
    enabled: boolean;
    startTime: string; // HH:MM format
    endTime: string; // HH:MM format
    days: number[]; // 0-6 (Sunday-Saturday)
  };
  frequency: "immediate" | "daily_digest" | "weekly_digest";
  createdAt: Date;
  updatedAt?: Date;
};

export type HabitTemplate = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon?: string;
  frequency: HabitFrequency;
  goalType: "count" | "duration";
  targetValue?: number;
  unit?: string;
  isPublic: boolean;
  createdBy?: User;
  createdById?: string;
  usageCount: number; // how many times this template has been used
  tags: string[];
  createdAt: Date;
  updatedAt?: Date;
};

export type HabitFolder = {
  id: string;
  user: User;
  userId: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  habits: Habit[];
  order: number;
  isCollapsed: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  type: "streak" | "completion" | "consistency" | "challenge" | "milestone";
  requirements: AchievementRequirement[];
  reward?: string;
  isUnlocked: boolean;
  unlockedAt?: Date;
  createdAt: Date;
};

export type AchievementRequirement = {
  id: string;
  achievement: Achievement;
  achievementId: string;
  type:
    | "streak_days"
    | "total_completions"
    | "completion_rate"
    | "consecutive_days"
    | "habit_count";
  operator:
    | "greater_than"
    | "less_than"
    | "equals"
    | "greater_than_or_equal"
    | "less_than_or_equal";
  value: number;
  habitId?: string; // specific habit requirement
  createdAt: Date;
};

export type HabitStacking = {
  sendNotification: {
    immediate?: boolean;
    schedulers?: Scheduler[];
  };
};
