"use client";

import { CreateViary } from "../../../components/create";

export const EmptyTimeline = () => {
  return (
    <div className="my-6 mx-auto p-4">
      <div className="container p-4 w-fit shadow rounded-lg">
        <p className="text-md">
          まだ日記がありません。最初の日記を作成しましょう
        </p>
      </div>
      <div className="divide-y"></div>
      <CreateViary onCommit={(content) => {}}></CreateViary>
    </div>
  );
};
