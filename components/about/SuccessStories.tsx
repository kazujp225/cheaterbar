"use client"

import { FC } from "react"

interface SuccessStory {
  company: string
  founder: string
  story: string
  date: string
}

interface SuccessStoriesProps {
  stories: SuccessStory[]
}

const SuccessStories: FC<SuccessStoriesProps> = ({ stories }) => {
  return (
    <div className="success-stories">
      {stories.map((story, index) => (
        <div key={index} className="story-card">
          <h3>{story.company}</h3>
          <p>{story.founder}</p>
          <p>{story.story}</p>
          <p>{story.date}</p>
        </div>
      ))}
    </div>
  )
}

export default SuccessStories