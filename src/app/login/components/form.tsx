"use client";
import {Button, Input, Space} from "antd";
import {FC, useState} from "react";

export const LoginForm:FC = () => {
  return (
    <Space direction="vertical">
      <Input
        placeholder="Enter your username"
      />
      <Input.Password
        placeholder="input password"
      />
      <Button type="primary">Login</Button>
    </Space>
  );
}
