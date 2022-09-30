import React, { useEffect, useCallback } from "react";
import { Button, Form, Input } from "antd";
import styled from "styled-components/dist/styled-components";
import Link from "next/link";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../reducers/user";

const ButtonBox = styled.div`
  margin-top: 10px;
`;

const FormStyle = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmitFinish = useCallback(() => {
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);
  return (
    <FormStyle onFinish={onSubmitFinish}>
      <div>
        <label htmlFor="user-email" type="email">
          이메일
        </label>
        <br />
        <Input
          name="user-email"
          type="email"
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div>
        <label htmlFor="user-pwd">Password</label>
        <br />
        <Input
          name="user-pwd"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonBox>
        <Button type="primary" htmlType="submit" loading={logInLoading}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonBox>
    </FormStyle>
  );
};

export default LoginForm;
