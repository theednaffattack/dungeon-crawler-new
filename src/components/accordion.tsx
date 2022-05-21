import type { PropsWithChildren } from "react";
import { useState } from "react";
import "./accordion.css";

// Adapted from: https://www.freecodecamp.org/news/build-accordion-menu-in-react-without-external-libraries/

function Accordion({ children, title }: PropsWithChildren<{ title: string }>) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion">
      <div className="accordion-item">
        <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
          <div>{title}</div>
          <div>{isActive ? "-" : "+"}</div>
        </div>
        {isActive && <div className="accordion-content">{children}</div>}
      </div>
    </div>
  );
}

export default Accordion;
