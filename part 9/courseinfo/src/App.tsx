import React from 'react'

interface CoursePartBase {
  name: string
  exerciseCount: number
  type: string
}

interface CourseDescriptionPart extends CoursePartBase {
  description: string
}

interface CourseNormalPart extends CourseDescriptionPart {
  type: 'normal'
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject'
  groupProjectCount: number
}

interface CourseSubmissionPart extends CourseDescriptionPart {
  type: 'submission'
  exerciseSubmissionLink: string
}

interface CourseSpecialPart extends CourseDescriptionPart {
  type: 'special'
  requirements: string[]
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Header = ({ name }: { name: string }): JSX.Element => {
  return <h1>{name}</h1>
}

const Content = ({
  courseParts,
}: {
  courseParts: CoursePart[]
}): JSX.Element => {
  return (
    <>
      {courseParts.map(part => (
        <Part part={part} key={part.name} />
      ))}
    </>
  )
}

const Total = ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element => {
  return (
    <p>
      {' '}
      Number of exercises{' '}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

const Part = ({ part }: { part: CoursePart }): JSX.Element => {
  switch (part.type) {
    case 'normal':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <em>{part.description}</em>
        </p>
      )
    case 'groupProject':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          project exercise {part.groupProjectCount}
        </p>
      )
    case 'submission':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <em>{part.description}</em>
          <br />
          submit to {part.exerciseSubmissionLink}
        </p>
      )
    case 'special':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <em>{part.description}</em>
          <br />
          required skills: {part.requirements}
        </p>
      )

    default:
      return assertNever(part)
  }
}

const App = () => {
  // const-declarations
  const courseName = 'Half Stack application development'
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the leisured course part',
      type: 'normal',
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the harded course part',
      type: 'normal',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      type: 'special',
    },
  ]

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  )
}

export default App
