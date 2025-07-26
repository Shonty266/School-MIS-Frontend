import { faker } from '@faker-js/faker';

export const generateFakeClasses = (count = 10) => {
  const classes = [];

  for (let i = 0; i < count; i++) {
    const classNumber = faker.number.int({ min: 1, max: 12 });
    const section = faker.helpers.arrayElement(['A', 'B', 'C', 'D', 'E', 'F']);
    const subject = faker.helpers.arrayElement([
      'Mathematics',
      'Physics',
      'Chemistry',
      'Biology',
      'English',
      'Hindi',
      'Social Studies',
      'Computer Science',
      'Environmental Science',
      'History',
      'Geography',
      'Art',
      'Physical Education'
    ]);
    const teacher = faker.person.fullName();
    const totalStudents = faker.number.int({ min: 20, max: 50 });

    classes.push({
      id: i + 1,
      className: `Class ${classNumber}`,
      section,
      subject,
      classTeacher: teacher,
      totalStudents,
      createdAt: faker.date.past().toDateString(),
      
      // Additional class details
      classCode: `${classNumber}${section}-${faker.string.alphanumeric(4).toUpperCase()}`,
      academicYear: faker.helpers.arrayElement(['2024-25', '2023-24', '2025-26']),
      semester: faker.helpers.arrayElement(['1st Semester', '2nd Semester']),
      
      // Class schedule details
      schedule: {
        days: faker.helpers.arrayElements(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], { min: 3, max: 5 }),
        startTime: faker.helpers.arrayElement(['08:00', '08:30', '09:00', '09:30']),
        endTime: faker.helpers.arrayElement(['14:00', '14:30', '15:00', '15:30']),
        duration: faker.helpers.arrayElement(['45 minutes', '50 minutes', '60 minutes']),
      },
      
      // Classroom details
      classroom: {
        roomNumber: faker.helpers.arrayElement(['A', 'B', 'C', 'D']) + faker.number.int({ min: 101, max: 405 }),
        building: faker.helpers.arrayElement(['Main Building', 'Science Block', 'Arts Block', 'Admin Block']),
        floor: faker.helpers.arrayElement(['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor']),
        capacity: faker.number.int({ min: 40, max: 60 }),
      },
      
      // Academic performance
      performance: {
        averageGrade: faker.helpers.arrayElement(['A+', 'A', 'B+', 'B', 'C+']),
        passRate: faker.number.int({ min: 75, max: 98 }),
        attendanceRate: faker.number.int({ min: 80, max: 95 }),
      },
      
      // Resource details
      resources: {
        textbooks: faker.number.int({ min: 3, max: 8 }),
        digitalResources: faker.datatype.boolean(),
        laboratory: faker.helpers.arrayElement(['Available', 'Not Available', 'Shared']),
        projector: faker.datatype.boolean(),
      },
      
      // Status and flags
      status: faker.helpers.arrayElement(['Active', 'Inactive', 'Suspended']),
      isOnline: faker.datatype.boolean(),
      hasAssistant: faker.datatype.boolean(),
      
      // Contact and communication
      communication: {
        whatsappGroup: faker.datatype.boolean(),
        parentMeetingDay: faker.helpers.arrayElement(['Saturday', 'Sunday', 'Last Friday of Month']),
        lastUpdated: faker.date.recent().toDateString(),
      },
      
      // Fee and financial details
      fees: {
        monthlyFee: faker.number.int({ min: 500, max: 2000 }),
        extraCurricular: faker.number.int({ min: 100, max: 500 }),
        uniform: faker.number.int({ min: 800, max: 1500 }),
        books: faker.number.int({ min: 1000, max: 3000 }),
      },
      
      // Additional metadata
      metadata: {
        maxStudents: faker.number.int({ min: 45, max: 55 }),
        currentVacancy: faker.number.int({ min: 0, max: 10 }),
        waitingList: faker.number.int({ min: 0, max: 15 }),
        establishedDate: faker.date.past({ years: 5 }).toDateString(),
        lastInspection: faker.date.recent({ days: 90 }).toDateString(),
      }
    });
  }

  return classes;
};

// Helper function to generate class with specific details
export const generateClassWithDetails = (classNumber, section) => {
  const subject = faker.helpers.arrayElement([
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'Hindi',
    'Social Studies',
    'Computer Science',
    'Environmental Science'
  ]);
  const teacher = faker.person.fullName();
  const totalStudents = faker.number.int({ min: 20, max: 50 });

  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    className: `Class ${classNumber}`,
    section,
    subject,
    classTeacher: teacher,
    totalStudents,
    createdAt: faker.date.past().toDateString(),
    
    classCode: `${classNumber}${section}-${faker.string.alphanumeric(4).toUpperCase()}`,
    academicYear: '2024-25',
    semester: faker.helpers.arrayElement(['1st Semester', '2nd Semester']),
    
    schedule: {
      days: faker.helpers.arrayElements(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], { min: 3, max: 5 }),
      startTime: faker.helpers.arrayElement(['08:00', '08:30', '09:00']),
      endTime: faker.helpers.arrayElement(['14:00', '14:30', '15:00']),
      duration: '50 minutes',
    },
    
    classroom: {
      roomNumber: faker.helpers.arrayElement(['A', 'B', 'C']) + faker.number.int({ min: 101, max: 305 }),
      building: faker.helpers.arrayElement(['Main Building', 'Science Block', 'Arts Block']),
      floor: faker.helpers.arrayElement(['Ground Floor', '1st Floor', '2nd Floor']),
      capacity: faker.number.int({ min: 40, max: 55 }),
    },
    
    performance: {
      averageGrade: faker.helpers.arrayElement(['A+', 'A', 'B+', 'B']),
      passRate: faker.number.int({ min: 80, max: 98 }),
      attendanceRate: faker.number.int({ min: 85, max: 95 }),
    },
    
    resources: {
      textbooks: faker.number.int({ min: 4, max: 7 }),
      digitalResources: faker.datatype.boolean(),
      laboratory: faker.helpers.arrayElement(['Available', 'Shared']),
      projector: true,
    },
    
    status: 'Active',
    isOnline: faker.datatype.boolean(),
    hasAssistant: faker.datatype.boolean(),
    
    communication: {
      whatsappGroup: true,
      parentMeetingDay: 'Saturday',
      lastUpdated: faker.date.recent().toDateString(),
    },
    
    fees: {
      monthlyFee: faker.number.int({ min: 800, max: 1800 }),
      extraCurricular: faker.number.int({ min: 200, max: 400 }),
      uniform: faker.number.int({ min: 1000, max: 1400 }),
      books: faker.number.int({ min: 1500, max: 2800 }),
    },
    
    metadata: {
      maxStudents: faker.number.int({ min: 45, max: 50 }),
      currentVacancy: faker.number.int({ min: 0, max: 5 }),
      waitingList: faker.number.int({ min: 0, max: 10 }),
      establishedDate: faker.date.past({ years: 3 }).toDateString(),
      lastInspection: faker.date.recent({ days: 60 }).toDateString(),
    }
  };
};
