"use client";
import Link from "next/link";
import { Button } from "../components/utilUI/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/utilUI/ui/card";
import { useUser } from "../utils/hooks/queries";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogoutOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";

const Profile = () => {
  const { user, isUserLoading, isUserError, userError, refetchUser } =
    useUser();

  const [accounts, setAccounts] = useState([]);

  console.log(accounts, "accounts");

  const rtr = useRouter();

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  if (isUserError) {
    return <div>Error: {userError.message}</div>;
  }

  return (
    <div className="w-screen items-center justify-center flex flex-col min-h-screen">
      <Card className="w-1/2 px-4">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{user.name}</CardTitle>
              <div>{user.email}</div>
            </div>
            <div>
              <Button onClick={() => signOut()}>
                <LogoutOutlined />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div>Accounts</div>
          {user.accounts.map((account) => (
            <div key={account.provider} className="flex items-center gap-x-4">
              <div className="flex-1">
                <div>{account.provider}</div>
                <div>{account.accountId}</div>
              </div>
              <div>
                <Button
                  onClick={async () => {
                    const { data } = await axios.get(
                      `/api/socials/${account.provider}`
                    );

                    console.log(data);

                    setAccounts((prev) => [
                      ...prev,
                      { ...data, provider: account.provider },
                    ]);
                  }}
                >
                  Fetch
                </Button>
              </div>
            </div>
          ))}
        </CardContent>

        <CardFooter className="gap-x-6 flex justify-center">
          <Button onClick={() => signIn()}>Link Accounts</Button>
        </CardFooter>
      </Card>

      {accounts.map((account, i) => (
        <Button
          onClick={async () => {
            if (account.provider === "facebook") {
              console.log(account, "account");
              await axios.post(`/api/socials/${account.provider}`, {
                page_id: account.data[0].id,
                page_access_token: account.data[0].access_token,
                message: "Hello World",
              });
            }
          }}
          key={i}
        >
          Publish test content for {account.provider}
        </Button>
      ))}
    </div>
  );
};

export default Profile;
