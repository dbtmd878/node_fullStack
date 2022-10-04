import React, { useState, useEffect, useCallback } from "react";
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
  RETWEET_REQUEST,
  UNLIKE_POST_REQUEST,
} from "../reducers/post";

const PostCard = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const { removePostLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const liked = post.Likers.find((v) => v.id === id);

  const onLike = useCallback(() => {
    if (!id) {
      return alert("로그인을 하지 않았습니다.");
    }
    dispatch({
      type: LIKE_POST_REQUEST,
      postId: post.id,
    });
  }, [id]);

  const onUnLike = useCallback(() => {
    if (!id) {
      return alert("로그인을 하지 않았습니다.");
    }
    dispatch({
      type: UNLIKE_POST_REQUEST,
      postId: post.id,
    });
  }, [id]);

  const [commentForOpened, setCommentForOpened] = useState(false);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert("로그인을 하지 않았습니다.");
    }
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onToggleComment = useCallback(() => {
    if (!id) {
      return alert("로그인을 하지 않았습니다.");
    }
    setCommentForOpened((prev) => !prev);
  }, []);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert("로그인을 하지 않았습니다.");
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);

  return (
    <div style={{ marginBottom: "20px" }}>
      <Card
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
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
        title={
          post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null
        }
        cover={post.Images[0] && <PostImages images={post.Images} />}
        extra={id !== post.UserId && id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }
          >
            <Card.Meta
              avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
              description={<PostCardCotent postData={post.Retweet.content} />}
              title={post.Retweet.User.nickname}
            />
          </Card>
        ) : (
          <Card.Meta
            avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
            description={<PostCardCotent postData={post.content} />}
            title={post.User.nickname}
          />
        )}
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
    RetweetId: propTypes.number,
    Retweet: propTypes.objectOf(propTypes.any),
  }),
};

export default PostCard;
