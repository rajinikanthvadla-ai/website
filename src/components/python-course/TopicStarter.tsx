"use client";

import Link from "next/link";
import BasicCodeBlock from "./BasicCodeBlock";

type Props = {
  code: string;
  tip: string;
  lessonHref: string;
};

export default function TopicStarter({ code, tip, lessonHref }: Props) {
  return (
    <div>
      <BasicCodeBlock code={code} tip={tip} />
      <div className="mt-3">
        <Link href={lessonHref} className="notion-btn notion-btn--ink">
          Try this in the full lesson compiler &rarr;
        </Link>
      </div>
    </div>
  );
}
