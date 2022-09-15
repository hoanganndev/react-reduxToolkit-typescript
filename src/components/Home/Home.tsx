import _ from "lodash";
import { useEffect, useState } from "react";

import iconTrash from "../../assets/images/icon-trash.png";
import ModalDeleltePost from "./ModalDeleltePost";
import { fetchPostsData } from "../../services/postService";
import { fetchUsersData } from "../../services/userService";
import "./Home.scss";

const Home = () => {
  const userPostDefault = {
    id: 0,
    first_name: "",
    avatar: "",
    title: "",
    body: "",
  };

  // state
  const [posts, setPosts] = useState<any[]>([]);
  const [dataPostDel, setDataPostDel] = useState(userPostDefault);
  const [limit, setLimit] = useState(6);
  const [scrollOnce, setScrollOnce] = useState(0);
  const [isShowModalDel, setIsShowModalDel] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  // Modal delete post
  const handleCloseModalDel = () => {
    setIsShowModalDel(false);
    setDataPostDel(userPostDefault);
  };

  const confirmDeleteUser = (post: any) => {
    let _posts = _.cloneDeep(posts);
    _posts = _posts.filter(item => item.id !== post.id);
    setPosts(_posts);
    setIsShowModalDel(false);
    setDataPostDel(userPostDefault);
  };

  const handleDeletePost = (post: any) => {
    setIsShowModalDel(true);
    setDataPostDel(post);
  };

  // list posts
  const getPosts = async (postLimit: number, userPage: number) => {
    const [postsData, usersData] = await Promise.all([
      fetchPostsData(postLimit),
      fetchUsersData(userPage),
    ]);
    if (postsData) {
      if (postLimit === 6 && usersData && usersData.data) {
        for (let i = 0; i <= postsData.length; i++) {
          const userPost: any = {};
          userPost.first_name = usersData.data[i].first_name;
          userPost.avatar = usersData.data[i].avatar;
          userPost.title = postsData[i].title;
          userPost.body = postsData[i].body;
          userPost.id = postsData[i].id;
          setPosts(prePosts => {
            return [...prePosts, userPost];
          });
        }
      }
      let newPostsData = postsData.filter(item => item.id > 6);
      for (let i = 0; i <= newPostsData.length; i++) {
        let userPost: any = {};
        userPost.first_name = usersData.data[i].first_name;
        userPost.avatar = usersData.data[i].avatar;
        userPost.title = newPostsData[i].title;
        userPost.body = newPostsData[i].body;
        userPost.id = newPostsData[i].id;
        setPosts(prePosts => {
          return [...prePosts, userPost];
        });
      }
    }
  };

  useEffect(() => {
    getPosts(limit, 1);
  }, []);

  useEffect(() => {
    // load more
    const handleScroll = (e: any) => {
      if (
        window.innerHeight + e.target.documentElement.scrollTop + 1 >=
          e.target.documentElement.scrollHeight &&
        scrollOnce === 0
      ) {
        setIsLoadMore(true);
        setTimeout(() => {
          const figure = e.target.documentElement.scrollHeight;
          setScrollOnce(figure);
          getPosts(12, 2);
          setIsLoadMore(false);
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollOnce]);

  return (
    <>
      {posts &&
        posts.length > 0 &&
        posts.map((post, index) => {
          return (
            <div key={`post-${index}`} className="card">
              <div className="profile-image">
                <img src={post.avatar} alt="" />
              </div>
              <div className="profile-main">
                <div className="profile-header">
                  <div className="profile-info">{post.first_name}</div>
                  <img src={iconTrash} alt="" onClick={() => handleDeletePost(post)} />
                </div>
                <div className="profile-title">{post.title}</div>
                <div className="profile-text">{post.body}</div>
              </div>
            </div>
          );
        })}

      {isLoadMore === true ? (
        <div className="load-more my-3">Loading more ...</div>
      ) : (
        <></>
      )}

      <ModalDeleltePost
        openModal={isShowModalDel}
        closeModal={handleCloseModalDel}
        postDel={dataPostDel}
        confirmDelete={confirmDeleteUser}
      />
    </>
  );
};

export default Home;
