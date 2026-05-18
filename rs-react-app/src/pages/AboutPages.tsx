import {
  personalQualities,
  technicalSkills,
  weaknesses,
  education,
  aboutDescription,
} from '../data/aboutData';

export const AboutPage = () => (
  <div className="p-4 max-w-3xl mx-auto">
    <h1 className="text-2xl font-bold mb-4">
      Я создаю интерактивные сайты и WEB-приложения
    </h1>

    <p className="mb-4">
      &nbsp;&nbsp;Привет! Я Василий, начинающий WEB-разработчик.
    </p>

    <p className="mb-4">{aboutDescription}</p>

    <p className="mb-6">
      &nbsp;&nbsp;В настоящее время я сосредоточен на изучении языка
      программирования JavaScript и библиотеки React.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">Личные качества</h2>
    <ul className="list-disc list-inside mb-6">
      {personalQualities.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">Технические навыки</h2>
    <ul className="list-disc list-inside mb-6">
      {technicalSkills.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">Недостатки</h2>
    <ul className="list-disc list-inside mb-6">
      {weaknesses.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">Образование</h2>
    <ul className="list-disc list-inside mb-6">
      {education.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">Контакты</h2>
    <p className="mb-2">Давайте сделаем что-то великое!</p>
    <p className="mb-2">
      Я ищу возможности сотрудничества с компаниями/агентствами/частными лицами.
    </p>
    <p className="mb-4">
      Не стесняйтесь обращаться через любую платформу ниже:
    </p>
    <a
      href="https://github.com/rolling-scopes-school/tasks/tree/master/react"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 underline"
    >
      Курс RS School React
    </a>
  </div>
);
