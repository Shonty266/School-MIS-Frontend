// utils/fakeSubjects.js
import { faker } from "@faker-js/faker";

export const generateFakeSubjects = (count = 50) => {
  const classes = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);
  const statuses = ["Active", "Inactive"];
  
  // Predefined subject names for more realistic data
  const subjectNames = [
    "Mathematics", "Physics", "Chemistry", "Biology", "English", 
    "Hindi", "Social Studies", "Computer Science", "Physical Education",
    "Art & Craft", "Music", "Geography", "History", "Economics"
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: faker.helpers.arrayElement(subjectNames),
    code: faker.string.alphanumeric(5).toUpperCase(), // Fixed: use faker.string.alphanumeric
    className: faker.helpers.arrayElement(classes),
    teacher: `${faker.person.firstName()} ${faker.person.lastName()}`, // Fixed: use faker.person
    description: faker.lorem.sentence(8),
    status: faker.helpers.arrayElement(statuses),
  }));
};
