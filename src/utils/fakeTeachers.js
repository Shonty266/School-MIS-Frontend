import { faker } from '@faker-js/faker';


export const generateFakeTeachers = (count = 20) => {
  const teachers = [];

  const statuses = ["Active", "Inactive", "On Leave"];
  const subjects = ["Mathematics", "Science", "English", "History", "Geography", "Physics", "Chemistry", "Biology", "Computer Science", "Physical Education"];
  const qualifications = ["B.Ed", "M.Ed", "Ph.D", "M.A", "M.Sc", "B.Sc", "B.A"];

  for (let i = 1; i <= count; i++) {
    const gender = faker.helpers.arrayElement(['Male', 'Female']);
    const randomImage = `https://randomuser.me/api/portraits/${gender === 'Male' ? 'men' : 'women'}/${faker.number.int({ min: 1, max: 99 })}.jpg`;

    teachers.push({
      id: i,
      name: faker.person.fullName(),
      subject: faker.helpers.arrayElement(subjects),
      experience: faker.number.int({ min: 1, max: 30 }) + " years",
      qualification: faker.helpers.arrayElement(qualifications),
      gender,
      joiningDate: faker.date.past({ years: 10 }).toISOString().split('T')[0],
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      image: randomImage,
      status: faker.helpers.arrayElement(statuses),
      classAssigned: faker.helpers.arrayElement(["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"]),
      section: faker.helpers.arrayElement(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]),
    });
  }

  return teachers;
};
