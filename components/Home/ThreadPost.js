import { View } from "react-native";
import React, { useContext, useState } from "react";
import tw from "twrnc";
import {
  ThreadHeader,
  ThreadActionButtons,
  ThreadFooter,
  ThreadContent,
  ThreadLeftPanel,
} from "../index";
import axios from "../../api/axiosState";
import { LIKE_THREAD, UNLIKE_THREAD } from "@env";
import { AuthContext } from "../../context/AuthContext";

const ThreadPost = ({ thread, loading }) => {
  const { loggedInUser } = useContext(AuthContext);
  const [threadContent, setThreadContent] = useState(thread);

  const isThreadAlreadyLiked = () => {
    if (threadContent?.likedUserIds.includes(loggedInUser?.userProfile?.id)) {
      return true;
    } else {
      return false;
    }
  };

  const onPressLike = async () => {
    await axios
      .post(
        `${LIKE_THREAD}uid=${+loggedInUser?.userProfile?.id}&tid=${+thread?.id}`
      )
      .then((response) => {
        setThreadContent((prevContent) => ({
          ...prevContent,
          likedUserIds: response.data,
          likesCount: response.data.length,
        }));
      })
      .catch((error) => {
        console.log(
          "Error occured while liking the thread",
          JSON.stringify(error)
        );
      });
  };

  const onPressUnlike = async () => {
    await axios
      .post(
        `${UNLIKE_THREAD}uid=${+loggedInUser?.userProfile
          ?.id}&tid=${+thread?.id}`
      )
      .then((response) => {
        if (response.data) {
          setThreadContent((prevContent) => ({
            ...prevContent,
            likedUserIds: response.data,
            likesCount: response.data.length,
          }));
        }
      })
      .catch((error) => {
        console.log(
          "Error occured while liking the thread",
          JSON.stringify(error)
        );
      });
  };

  return (
    <>
      <View style={tw`flex-row w-full gap-2 mb-[8px] py-1 my-3`}>
        <ThreadLeftPanel thread={threadContent} loading={loading} />
        <View style={{ width: "100%", flexShrink: 1 }}>
          <ThreadHeader
            username={threadContent?.name}
            userId={threadContent?.userId}
            postedAt={threadContent?.postedAt}
            loading={loading}
          />
          <ThreadContent
            content={threadContent?.thread}
            image={threadContent?.image}
            loading={loading}
          />
          <ThreadFooter
            likes={threadContent?.likesCount}
            comments={threadContent?.commentsCount}
            loading={loading}
          />
          {!loading ? (
            <ThreadActionButtons
              liked={isThreadAlreadyLiked()}
              onPressLike={onPressLike}
              onPressUnlike={onPressUnlike}
            />
          ) : null}
        </View>
      </View>
    </>
  );
};

export default ThreadPost;
