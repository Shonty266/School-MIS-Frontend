import { faker } from '@faker-js/faker';

console.log("Generating students...");
export const generateFakeStudents = (count = 20) => {
  const students = [];

  const statuses = ["Active", "Inactive", "Pending"];

  for (let i = 1; i <= count; i++) {
    const gender = faker.helpers.arrayElement(['Male', 'Female']);
    const randomImage = `https://randomuser.me/api/portraits/${gender === 'Male' ? 'men' : 'women'}/${faker.number.int({ min: 1, max: 99 })}.jpg`;

    students.push({
      id: i,
      name: faker.person.fullName(),
      class: `${faker.number.int({ min: 1, max: 12 })}`,
      section: faker.helpers.arrayElement(['A', 'B', 'C']),
      rollNo: faker.number.int({ min: 1000, max: 9999 }),

      gender,
      admissionDate: faker.date.past({ years: 3 }).toISOString().split('T')[0],
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),

      image: randomImage, // 🎯 more realistic random avatar
      status: faker.helpers.arrayElement(statuses),
    });
  }

  return students;
};
