// utils/fakeCalendar.js
import { faker } from "@faker-js/faker";

export const generateFakeCalendarEvents = (count = 100) => {
  const eventTypes = [
    "Holiday", "Exam", "Term Start", "Term End", "Event", 
    "Meeting", "Workshop", "Sports", "Cultural", "Break"
  ];
  
  const eventNames = {
    Holiday: ["Diwali Holiday", "Christmas Break", "Independence Day", "Gandhi Jayanti", "Holi", "Eid Festival"],
    Exam: ["Mid-term Exams", "Final Exams", "Unit Tests", "Quarterly Exams", "Annual Exams", "Pre-board Exams"],
    "Term Start": ["First Term Begins", "Second Term Begins", "Third Term Begins", "Summer Term Begins"],
    "Term End": ["First Term Ends", "Second Term Ends", "Third Term Ends", "Academic Year Ends"],
    Event: ["Annual Day", "Sports Day", "Science Fair", "Cultural Fest", "Graduation Ceremony", "Orientation Day"],
    Meeting: ["Parent-Teacher Meeting", "Staff Meeting", "Board Meeting", "PTA Meeting"],
    Workshop: ["Teacher Training", "Student Workshop", "Parent Workshop", "Digital Literacy Program"],
    Sports: ["Inter-house Competition", "District Sports Meet", "Cricket Tournament", "Athletics Meet"],
    Cultural: ["Dance Competition", "Singing Contest", "Art Exhibition", "Drama Performance"],
    Break: ["Winter Break", "Summer Vacation", "Autumn Break", "Mid-term Break"]
  };

  const classes = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);
  const statuses = ["Scheduled", "Completed", "Cancelled", "Postponed"];

  return Array.from({ length: count }, (_, i) => {
    const type = faker.helpers.arrayElement(eventTypes);
    const startDate = faker.date.between({
      from: new Date('2025-04-01'),
      to: new Date('2026-03-31')
    });
    const endDate = faker.date.between({
      from: startDate,
      to: new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000) // max 7 days later
    });

    return {
      id: i + 1,
      title: faker.helpers.arrayElement(eventNames[type] || ["General Event"]),
      type: type,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      startTime: faker.helpers.arrayElement(["09:00", "10:00", "11:00", "14:00", "15:00"]),
      endTime: faker.helpers.arrayElement(["12:00", "13:00", "16:00", "17:00", "18:00"]),
      description: faker.lorem.sentence(10),
      location: faker.helpers.arrayElement(["Main Hall", "Auditorium", "Classroom", "Playground", "Library", "Computer Lab"]),
      targetAudience: faker.helpers.arrayElement(["All Students", "Teachers", "Parents", ...classes]),
      organizer: `${faker.person.firstName()} ${faker.person.lastName()}`,
      status: faker.helpers.arrayElement(statuses),
      isAllDay: faker.datatype.boolean(),
      isRecurring: faker.datatype.boolean(),
      priority: faker.helpers.arrayElement(["High", "Medium", "Low"]),
      createdAt: faker.date.past().toISOString().split('T')[0]
    };
  });
};
