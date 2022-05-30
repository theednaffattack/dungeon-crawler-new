import React, { PropsWithChildren } from "react";
import Accordion from "./accordion";

export interface AccordionData {
  title: string;
  content?: any;
}

type AccordionSectionsProps = PropsWithChildren<{
  accordionData: AccordionData[];
}>;

function AccordionSections({ accordionData }: AccordionSectionsProps) {
  return (
    <div className="accordion">
      {accordionData.map(({ title, content }) => {
        let finalContent: any = <div>Undisplayable value</div>;
        if (typeof content === "string" || typeof content === "number") {
          finalContent = content;
        }
        if ("width" in content) {
          finalContent = <pre>{JSON.stringify(content, null, 2)}</pre>;
        }
        if (Array.isArray(content)) {
          finalContent = content.map((item, itemIndex) => (
            <div key={`${Math.random()}- ${itemIndex}`}>{item}</div>
          ));
        }
        return <Accordion key={title} title={title} content={finalContent} />;
      })}
    </div>
  );
}

export default AccordionSections;
