import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

const Projects: React.FC = (): JSX.Element => {
  const projects = [
    {
      id: uuidv4(),
      name: "Local Weather",
      link: "/local_weather"
    }
  ]
  return (
    <div className="projects">
      <header>
        <h1 className="projects__title">Take Home Projects</h1>
        <p className="projects__description">
          This is a collection of my completed take home projects from <a href="https://www.freecodecamp.org/">Free Code Camp (FCC).</a><br/>
          I used FCC for interivew preparation and practice.
        </p>
      </header>
      <ol className="projects__list">
        { projects.map((p) => {
          return (
            <li className="projects__list__item" key={p.id}>
              <Link to={p.link}>{p.name}</Link>
            </li>
          )
        }) }
      </ol>
    </div>
  )
};

export default Projects;