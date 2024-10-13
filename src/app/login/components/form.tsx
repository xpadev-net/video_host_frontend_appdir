"use client";
import {Button, Input, Space} from "antd";
import {FC, FormEvent, useEffect, useState} from "react";
import {getUser} from "@/service/getUser";
import {useRouter, useSearchParams} from "next/navigation";
import {postLogin} from "@/service/postLogin";

export const LoginForm:FC = () => {
  const router = useRouter();
  const callback = useSearchParams().get("callback");
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const user = getUser();
    user.then((data)=>{
      if(data.status !== "success") {
        setIsLoaded(true);
        return;
      }
      router.push(callback || "/");
    })
  }, [callback, router]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      postLogin(username, password).then(()=>{
        router.push(callback || "/");
      });
    }catch (e){
      setError("incorrect username or password");
    }
  }

  if (!isLoaded) {
    return <></>;
  }

  return (
    <form onSubmit={onSubmit}>
      {
        error && <div>{error}</div>
      }
      <Space direction="vertical">
        <Input
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input.Password
          placeholder="input password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="primary" htmlType={"submit"}>Login</Button>
      </Space>
    </form>
  );
}
