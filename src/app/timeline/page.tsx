import { EmptyTimeline } from "@/components/timline/empty";
import { Viary } from "@/models/viary";

export interface TimelineState {
  viaries: Viary[];
}

export default function Timeline() {
  const { viaries }: TimelineState = {
    viaries: [],
  };

  if (viaries.length === 0) {
    return <EmptyTimeline />;
  }
  return (
    <div className="py-4 px-12">
      <p className="text-2xl">Timeline</p>
    </div>
  );
}
