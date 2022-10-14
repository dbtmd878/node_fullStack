import { StopOutlined } from "@ant-design/icons";
import { Button, Card, List } from "antd";
import React from "react";
import styled from "styled-components/dist/styled-components";
import propTypes from "prop-types";
import { useDispatch } from "react-redux";
import { REMOVE_FOLLOWER_REQUEST, UNFOLLOW_REQUEST } from "../reducers/user";

const Liststyle = styled(List)`
  margin-bottom: 20;
`;

const ButtonBox = styled.div`
  text-align: center;
  margin: 10px 0;
`;
const ListItemStyle = styled(List.Item)`
  margin-top: 20px;
`;

const FollowList = ({ header, data, onClickMore, loading }) => {
  const dispatch = useDispatch();
  const onCancel = (id) => () => {
    if (header === "팔로잉") {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    } else {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: id,
      });
    }
  };
  return (
    <div>
      <Liststyle
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>{header}</div>}
        loadMore={
          <ButtonBox>
            <Button onClick={onClickMore} loading={loading}>
              더 보기
            </Button>
          </ButtonBox>
        }
        bordered
        dataSource={data}
        renderItem={(item) => (
          <ListItemStyle>
            <Card
              actions={[
                <StopOutlined key="stop" onClick={onCancel(item.id)} />,
              ]}
            >
              <Card.Meta description={item.nickname} />
            </Card>
          </ListItemStyle>
        )}
      />
    </div>
  );
};

FollowList.propTypes = {
  header: propTypes.string.isRequired,
  data: propTypes.array.isRequired,
  onClickMore: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
};

export default FollowList;
