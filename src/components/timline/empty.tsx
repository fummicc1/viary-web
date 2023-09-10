import { CreateViary } from "../create/create";

export const EmptyTimeline = () => {
  return (
    <div className="my-6 mx-auto p-4">
      <div className="container p-4 w-fit shadow rounded-lg">
        <p className="text-md">
          まだ日記がありません。生成された日記を参考に最初の日記を書きましょう
        </p>
      </div>
      <div className="divide-y"></div>
      <CreateViary></CreateViary>
    </div>
  );
};
