import { faker } from '@faker-js/faker';

const numberOfUsers = 10000
const numberOfQuestions = numberOfUsers * 2
const numberOfAnswers = numberOfQuestions * 10

const getRandom = (array) => array[Math.floor((Math.random()*array.length))]

const generateUsers = () => {
  const users = [];
  for (let i = 0; i < numberOfUsers; i++) {
    const user = {
      id: faker.string.uuid(),
      is_employee: faker.datatype.boolean(),
      accept_rate: faker.number.int(100),
      location: faker.location.streetAddress(),
      display_name: faker.person.fullName(),
      reputation: faker.number.int(300),
      creation_date: faker.date.anytime(),
      user_type: faker.animal.type(),
      website_url: faker.internet.url(),
      link: faker.internet.url(),
      profile_image: faker.internet.avatar()
    };
    users.push(user);
  }
  return users;
}

const generateQuestions = (userIds) => {
  const questions = []
  for (let i = 0; i < numberOfQuestions; i++) {
    const question = {
      id: faker.string.uuid(),
      owner_id: getRandom(userIds),
      view_count: faker.number.int(1000),
      score: faker.number.int(3000),
      title: faker.lorem.sentence({min: 5, max: 30}),
      is_answered: faker.datatype.boolean(),
      answer_count: faker.number.int(10),
      last_activity_date: faker.date.anytime(),
      creation_date: faker.date.anytime(),
      last_edit_date: faker.date.anytime(),
      content_license: faker.lorem.sentence(),
      link: faker.internet.url(),
      body: faker.lorem.paragraphs({min: 1, max: 20})
    };
    questions.push(question)
  }
  return questions
}

const generateAnswers = (userIds, questionIds) => {
  const answers = []
  const acceptedQuestionIds = []
  const isAccepted = (questionId) => {
    if (acceptedQuestionIds.includes(questionId)) return false;
    const accepted = faker.datatype.boolean();
    if (accepted) acceptedQuestionIds.push(questionId)
    return accepted
  }
  for (let i = 0; i < numberOfAnswers; i++) {
    const questionId = getRandom(questionIds)
    const answer = {
      id: faker.string.uuid(),
      question_id: questionId,
      body: faker.lorem.paragraph({main: 1, max: 20}),
      user_id: getRandom(userIds),
      accepted: isAccepted(questionId),
      score: faker.number.int(100),
      status: faker.internet.httpStatusCode(),
      created_at: faker.date.anytime()
    }
    answers.push(answer)
  }
  return answers
}

export function generateData() {
  const users = generateUsers()
  const userIds = users.map(user => user.id)
  const questions = generateQuestions(userIds)
  const answers = generateAnswers(userIds, questions.map(q => q.id))
  return {users, questions, answers}
}
