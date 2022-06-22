import { faker } from "@faker-js/faker";

const generateRandomUserName = () => {
  const randomIndex = faker.datatype.number({
    min: 1,
    max: 5000,
  });
  return `${randomIndex}번째 항대생`;
};

export default generateRandomUserName;
