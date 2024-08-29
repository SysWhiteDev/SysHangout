import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const pendingUsers = [
  {
    username: "johndoe",
    displayname: "John Doe",
    email: "asdklhjaskja",
    date: "2021-10-10",
  },
];

export default function Page() {
  return (
    <div>
      <div className="sticky top-0 z-10 bg-gradient-to-b from-neutral-200 from-90% p-6 dark:from-neutral-900">
        <h1 className="text-3xl font-semibold">Pending Verifications</h1>
        <p className="opacity-75 dark:opacity-50">3 pending</p>
      </div>
      <div className="mt-4 p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Username</TableHead>
              <TableHead>Display</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Date of creation</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingUsers.map((user) => (
              <TableRow key={user.username}>
                <TableCell className="font-medium">@{user.username}</TableCell>
                <TableCell>{user.displayname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="">{user.date}</TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button variant={"destructive"}>Deny</Button>
                  <Button>Approve</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
