import React from "react";
import Link from "next/link";
import propTypes from "prop-types";

const PostCardCotent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((item, index) => {
        if (item.match(/(#[^\s#]+)/)) {
          return (
            <Link href={`/hashtag/${item.slice(1)}`} key={index}>
              <a>{item}</a>
            </Link>
          );
        }
        return item;
      })}
    </div>
  );
};

PostCardCotent.propTypes = {
  postData: propTypes.string.isRequired,
};

export default PostCardCotent;
