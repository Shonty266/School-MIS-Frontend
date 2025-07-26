// utils/fakeDashboardData.js
import { faker } from "@faker-js/faker";

export const generateFakeDashboardStats = () => {
  return {
    totalStudents: faker.number.int({ min: 800, max: 1200 }),
    totalTeachers: faker.number.int({ min: 50, max: 80 }),
    totalClasses: faker.number.int({ min: 20, max: 30 }),
    totalSubjects: faker.number.int({ min: 15, max: 25 }),
    presentToday: faker.number.int({ min: 700, max: 950 }),
    absentToday: faker.number.int({ min: 50, max: 150 }),
    upcomingEvents: faker.number.int({ min: 3, max: 8 }),
    pendingFees: faker.number.int({ min: 20, max: 100 }),
  };
};

export const generateFakeRecentActivities = (count = 10) => {
  const activities = [
    "New student enrolled",
    "Teacher added to system",
    "Class schedule updated",
    "Exam results published",
    "Fee payment received",
    "Parent meeting scheduled",
    "Holiday announced",
    "Library book issued",
    "Sports event organized",
    "Assignment submitted"
  ];

  const users = Array.from({ length: 20 }, () => 
    `${faker.person.firstName()} ${faker.person.lastName()}`
  );

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    activity: faker.helpers.arrayElement(activities),
    user: faker.helpers.arrayElement(users),
    timestamp: faker.date.recent({ days: 7 }).toLocaleString(),
    type: faker.helpers.arrayElement(['info', 'success', 'warning'])
  }));
};

export const generateFakeUpcomingEvents = (count = 6) => {
  const eventTypes = [
    "Holiday", "Exam", "Meeting", "Workshop", "Sports", "Cultural"
  ];

  const eventNames = {
    Holiday: ["Diwali Holiday", "Christmas Break", "Independence Day"],
    Exam: ["Mid-term Exams", "Final Exams", "Unit Tests"],
    Meeting: ["Parent-Teacher Meeting", "Staff Meeting", "Board Meeting"],
    Workshop: ["Teacher Training", "Student Workshop", "Digital Literacy"],
    Sports: ["Sports Day", "Cricket Tournament", "Athletics Meet"],
    Cultural: ["Annual Day", "Cultural Fest", "Dance Competition"]
  };

  return Array.from({ length, count }, (_, i) => {
    const type = faker.helpers.arrayElement(eventTypes);
    const startDate = faker.date.future({ years: 0.5 });
    
    return {
      id: i + 1,
      title: faker.helpers.arrayElement(eventNames[type]),
      type: type,
      date: startDate.toLocaleDateString(),
      time: startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      location: faker.helpers.arrayElement(["Main Hall", "Auditorium", "Classroom", "Playground"]),
      priority: faker.helpers.arrayElement(["High", "Medium", "Low"])
    };
  });
};

export const generateFakeAttendanceData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days.map(day => ({
    day,
    present: faker.number.int({ min: 850, max: 950 }),
    absent: faker.number.int({ min: 50, max: 150 })
  }));
};

export const generateFakePerformanceData = () => {
  const classes = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);
  return classes.map(className => ({
    class: className,
    average: faker.number.int({ min: 65, max: 95 }),
    students: faker.number.int({ min: 25, max: 45 })
  }));
};

// Add these functions to your existing fakeDashboardData.js

export const generateFakeMonthlyEnrollments = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => ({
      label: month,
      value: faker.number.int({ min: 15, max: 45 })
    }));
  };
  
  export const generateFakeSubjectPerformance = () => {
    const subjects = ['Math', 'Science', 'English', 'History', 'Art'];
    return subjects.map(subject => ({
      label: subject,
      value: faker.number.int({ min: 70, max: 95 })
    }));
  };
  
  export const generateFakeGradeDistribution = () => {
    return [
      { label: 'A Grade', value: faker.number.int({ min: 80, max: 120 }) },
      { label: 'B Grade', value: faker.number.int({ min: 150, max: 200 }) },
      { label: 'C Grade', value: faker.number.int({ min: 100, max: 150 }) },
      { label: 'D Grade', value: faker.number.int({ min: 30, max: 80 }) },
      { label: 'F Grade', value: faker.number.int({ min: 10, max: 30 }) }
    ];
  };
  
  export const generateFakeWeeklyAttendanceTrend = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days.map(day => ({
      label: day,
      value: faker.number.int({ min: 85, max: 98 })
    }));
  };
  
// Add these functions to your existing fakeDashboardData.js

export const generateFakeSubjectEnrollment = () => {
    const subjects = ['Mathematics', 'Science', 'English', 'History', 'Art', 'Music'];
    return subjects.map(subject => ({
      label: subject,
      value: faker.number.int({ min: 45, max: 95 })
    }));
  };
  
  export const generateFakeMonthlyFees = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => ({
      label: month,
      value: faker.number.int({ min: 15000, max: 35000 })
    }));
  };
  
  export const generateFakeTeacherDepartments = () => {
    const departments = ['Science', 'Arts', 'Commerce', 'Sports', 'Music'];
    return departments.map(dept => ({
      label: dept,
      value: faker.number.int({ min: 5, max: 15 })
    }));
  };
  
  export const generateFakeLibraryStats = () => {
    const categories = ['Fiction', 'Science', 'History', 'Reference', 'Magazines'];
    return categories.map(category => ({
      label: category,
      value: faker.number.int({ min: 50, max: 200 })
    }));
  };
  
  // Add these new functions to your existing fakeDashboardData.js

export const generateFakeStudentGrowth = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => ({
      label: month,
      value: faker.number.int({ min: 850, max: 1150 })
    }));
  };
  
  export const generateFakeExamResults = () => {
    const terms = ['Term 1', 'Term 2', 'Term 3', 'Mid-term', 'Final'];
    return terms.map(term => ({
      label: term,
      value: faker.number.int({ min: 75, max: 95 })
    }));
  };
  
  export const generateFakeAgeDistribution = () => {
    return [
      { label: '5-8 years', value: faker.number.int({ min: 120, max: 180 }) },
      { label: '9-12 years', value: faker.number.int({ min: 200, max: 280 }) },
      { label: '13-16 years', value: faker.number.int({ min: 250, max: 350 }) },
      { label: '17-18 years', value: faker.number.int({ min: 80, max: 120 }) },
    ];
  };
  
  export const generateFakeExpenseBreakdown = () => {
    return [
      { label: 'Salaries', value: faker.number.int({ min: 400000, max: 600000 }) },
      { label: 'Infrastructure', value: faker.number.int({ min: 100000, max: 200000 }) },
      { label: 'Utilities', value: faker.number.int({ min: 50000, max: 100000 }) },
      { label: 'Supplies', value: faker.number.int({ min: 30000, max: 80000 }) },
      { label: 'Others', value: faker.number.int({ min: 20000, max: 50000 }) },
    ];
  };
  
  export const generateFakeAttendanceTrend = () => {
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    return weeks.map(week => ({
      label: week,
      value: faker.number.int({ min: 85, max: 98 })
    }));
  };
  
  export const generateFakeRevenueTrend = () => {
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
    return quarters.map(quarter => ({
      label: quarter,
      value: faker.number.int({ min: 800000, max: 1200000 })
    }));
  };
  