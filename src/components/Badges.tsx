import { hasPermission, PERMISSIONS } from "@/lib/permissions";
import { User } from "@prisma/client";
import { MdVerified } from "react-icons/md";
export default function Badges({ user }: { user: User }) {
  return (
    <>
      {(user.permissions & PERMISSIONS.VERIFIED_BADGE) ===
        PERMISSIONS.VERIFIED_BADGE && (
        <MdVerified size="1.5em" title="Verified User" />
      )}
    </>
  );
}
