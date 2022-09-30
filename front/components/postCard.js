import React, { useState, useCallback } from "react";
import { Avatar, Button, Card, Comment, List, Popover } from "antd";
import {
  EllipsisOutlined,
  HeartTwoTone,
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import PostImages from "./postimages";
import propTypes from "prop-types";
import CommentForm from "./commentform";
import PostCardCotent from "./postCardCotent";
import FollowButton from "./followButton";
import { useDispatch, useSelector } from "react-redux";
import {
  LIKE_POST_REQUEST,
  REMOVE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
} from "../reducers/post";

const PostCard = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const { removePostLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const onLike = useCallback(() => {
    dispatch({
      type: LIKE_POST_REQUEST,
      postId: post.id,
    });
  }, []);

  const onUnLike = useCallback(() => {
    dispatch({
      type: UNLIKE_POST_REQUEST,
      postId: post.id,
    });
  }, []);

  const [commentForOpened, setCommentForOpened] = useState(false);

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentForOpened((prev) => !prev);
  }, []);

  const liked = post.Likers.find((v) => v.id === id);
  return (
    <div style={{ marginBottom: "20px" }}>
      <Card
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              onClick={onUnLike}
              key="heart"
            />
          ) : (
            <HeartOutlined onClick={onLike} key="heart" />
          ),
          <MessageOutlined onClick={onToggleComment} key="message" />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.UserId === id ? (
                  <>
                    <Button>수정</Button>
                    <Button
                      type="danger"
                      loading={removePostLoading}
                      onClick={onRemovePost}
                    >
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        cover={post.Images[0] && <PostImages images={post.Images} />}
        extra={id !== post.UserId && id && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          description={<PostCardCotent postData={post.content} />}
          title={post.User.nickname}
        />
      </Card>
      {commentForOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => {
              return (
                <li>
                  <Comment
                    author={item.User.nickname}
                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                    content={item.content}
                  />
                </li>
              );
            }}
          />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: propTypes.shape({
    id: propTypes.number,
    User: propTypes.shape({
      id: propTypes.number,
      nickname: propTypes.string,
    }),
    createdAt: propTypes.string,
    content: propTypes.string,
    Images: propTypes.arrayOf(
      propTypes.shape({
        src: propTypes.string,
      })
    ),
    Likers: propTypes.arrayOf(propTypes.object),
    Commnets: propTypes.arrayOf(propTypes.object),
  }),
};

export default PostCard;
