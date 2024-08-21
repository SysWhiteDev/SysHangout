"use client";
import useFollowerInfo from "@/hooks/useFollowerInfo";
import { FollowerInfo } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface CountersProps {
  userId: string;
  initialState: FollowerInfo;
}

export default function FollowersCounter({
  userId,
  initialState,
}: CountersProps) {
  const { data } = useFollowerInfo(userId, initialState);

  return (
    <>
      <span>
        Followers:
        <span className="font-bold"> {formatNumber(data.followers)}</span>
      </span>
    </>
  );
}
