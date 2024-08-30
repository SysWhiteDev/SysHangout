"use client";
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
import kyInstance from "@/lib/ky";
import { UserData } from "@/lib/types";
import { useEffect, useState } from "react";

const pendingUsers = [
  {
    username: "johndoe",
    displayname: "John Doe",
    email: "asdklhjaskja",
    date: "2021-10-10",
  },
];

type PendingUser = {
  id: string;
  username: string;
  displayName: string;
  email: string;
  createdAt: string;
};

export default function Page() {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);

  useEffect(() => {
    kyInstance
      .get("/api/users/pending")
      .json()
      .then((data: any) => {
        setPendingUsers(data);
      });
  }, []);

  const approveUser = async (id: string) => {
    await kyInstance.post(`/api/users/pending?id=${id}`);
  };

  const deleteUser = async (id: string) => {
    await kyInstance.delete(`/api/users/pending?id=${id}`);
  };

  return (
    <div>
      <div className="sticky top-0 z-10 bg-gradient-to-b from-neutral-200 from-90% p-6 dark:from-neutral-900">
        <h1 className="text-3xl font-semibold">Pending Verifications</h1>
        <p className="opacity-75 dark:opacity-50">
          {pendingUsers.length} pending
        </p>
      </div>
      <div className="mt-4 p-4">
        {pendingUsers.length === 0 ? (
          <div className="w-full text-center text-destructive">There is no pending verification requests at the moment.</div>
        ) : (
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
                  <TableCell className="font-medium">
                    @{user.username}
                  </TableCell>
                  <TableCell>{user.displayName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="">
                    {new Date(user.createdAt as any).toISOString()}
                  </TableCell>
                  <TableCell className="space-x-2 text-right">
                    <Button onClick={() => deleteUser(user.id)} variant={"destructive"}>Deny</Button>
                    <Button onClick={() => approveUser(user.id)}>
                      Approve
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
