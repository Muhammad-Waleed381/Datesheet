export type Exam = {
  slotId: string;
  course: string;
  code: string;
  faculty: string;
  date: string;
  timeStr: string;
  datetime: string;
  seating?: {
    venue: string;
    column: number;
    row: number;
  };
  accent: {
    border: string;
    glow: string;
    badge: string;
    badgeText: string;
    bar: string;
    countdown: string;
  };
};

export type StudentId = "waleed" | "ahmed_ibrahim";

export const students: Record<StudentId, string> = {
  waleed: "Waleed",
  ahmed_ibrahim: "Ahmed Ibrahim",
};

type ExamOverride = Partial<Pick<Exam, "course" | "code" | "faculty" | "seating">>;

export const baseExams: Exam[] = [
  {
    slotId: "2026-03-09T09:30:00",
    course: "Compiler Construction",
    code: "CS-346",
    faculty: "Yusra Arshad",
    date: "09-03-2026",
    timeStr: "09:30 – 11:30",
    datetime: "2026-03-09T09:30:00",
    seating: {
      venue: "SEECS_SEECS Labs_Computing-1",
      column: 3,
      row: 3,
    },
    accent: {
      border: "hover:border-blue-500/60",
      glow: "hover:shadow-blue-500/20",
      badge: "bg-blue-500/15 border border-blue-500/30",
      badgeText: "text-blue-300",
      bar: "from-blue-500 to-blue-400",
      countdown: "text-blue-400",
    },
  },
  {
    slotId: "2026-03-10T12:15:00",
    course: "Parallel & Distributed Computing",
    code: "CS-347",
    faculty: "Shah Khalid",
    date: "10-03-2026",
    timeStr: "12:15 – 14:15",
    datetime: "2026-03-10T12:15:00",
    seating: {
      venue: "SEECS_Class Room_05",
      column: 8,
      row: 1,
    },
    accent: {
      border: "hover:border-purple-500/60",
      glow: "hover:shadow-purple-500/20",
      badge: "bg-purple-500/15 border border-purple-500/30",
      badgeText: "text-purple-300",
      bar: "from-purple-500 to-purple-400",
      countdown: "text-purple-400",
    },
  },
  {
    slotId: "2026-03-11T09:30:00",
    course: "Deep Learning",
    code: "CS-419",
    faculty: "Mehwish Awan",
    date: "11-03-2026",
    timeStr: "09:30 – 11:30",
    datetime: "2026-03-11T09:30:00",
    seating: {
      venue: "SEECS_Class Room_13",
      column: 4,
      row: 2,
    },
    accent: {
      border: "hover:border-emerald-500/60",
      glow: "hover:shadow-emerald-500/20",
      badge: "bg-emerald-500/15 border border-emerald-500/30",
      badgeText: "text-emerald-300",
      bar: "from-emerald-500 to-emerald-400",
      countdown: "text-emerald-400",
    },
  },
  {
    slotId: "2026-03-12T12:15:00",
    course: "Cyber Security / Big Data",
    code: "CS-360",
    faculty: "Madiha Khalid",
    date: "12-03-2026",
    timeStr: "12:15 – 14:15",
    datetime: "2026-03-12T12:15:00",
    seating: {
      venue: "IAEC_IAEC_20",
      column: 6,
      row: 4,
    },
    accent: {
      border: "hover:border-rose-500/60",
      glow: "hover:shadow-rose-500/20",
      badge: "bg-rose-500/15 border border-rose-500/30",
      badgeText: "text-rose-300",
      bar: "from-rose-500 to-rose-400",
      countdown: "text-rose-400",
    },
  },
  {
    slotId: "2026-03-16T09:30:00",
    course: "Software Engineering",
    code: "SE-200",
    faculty: "Hirra Anwar",
    date: "16-03-2026",
    timeStr: "09:30 – 11:30",
    datetime: "2026-03-16T09:30:00",
    seating: {
      venue: "SEECS_Class Room_04",
      column: 9,
      row: 4,
    },
    accent: {
      border: "hover:border-amber-500/60",
      glow: "hover:shadow-amber-500/20",
      badge: "bg-amber-500/15 border border-amber-500/30",
      badgeText: "text-amber-300",
      bar: "from-amber-500 to-amber-400",
      countdown: "text-amber-400",
    },
  },
];

export const studentExamOverrides: Record<StudentId, Record<string, ExamOverride>> = {
  waleed: {},
  ahmed_ibrahim: {
    "2026-03-09T09:30:00": {
      seating: {
        venue: "SEECS_SEECS Labs_Computing-1",
        column: 1,
        row: 1,
      },
    },
    "2026-03-10T12:15:00": {
      seating: {
        venue: "SEECS_Class Room_05",
        column: 2,
        row: 3,
      },
    },
    "2026-03-11T09:30:00": {
      seating: {
        venue: "SEECS_Class Room_13",
        column: 6,
        row: 5,
      },
    },
    "2026-03-12T12:15:00": {
      course: "Cyber Security / Big Data Analytics",
      code: "CS-404",
      seating: {
        venue: "SEECS_Class Room_03",
        column: 6,
        row: 5,
      },
    },
    "2026-03-16T09:30:00": {
      seating: {
        venue: "SEECS_Class Room_12",
        column: 1,
        row: 3,
      },
    },
  },
};

export function resolveExamsForStudent(studentId: StudentId): Exam[] {
  const overrides = studentExamOverrides[studentId] ?? {};

  return baseExams
    .map((exam) => ({
      ...exam,
      ...overrides[exam.slotId],
    }))
    .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
}

export const exams = resolveExamsForStudent("waleed");
