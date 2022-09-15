import { useState, useEffect, ChangeEvent } from "react";
import _ from "lodash";
import "./Home.scss";
import iconTrash from "../../assets/images/icon-trash.png";
// import { fetchPostsData } from "../../services/postService";
// import { fetchUsersData } from "../../services/userService";
import ModalDeleltePost from "./ModalDeleltePost";

export interface userPostTypes {
  id: number;
  first_name: string;
  avatar: string;
  title: string;
  body: string;
}

const Home = () => {
  const userPostDefault: userPostTypes = {
    id: -1,
    first_name: "",
    avatar: "",
    title: "",
    body: "",
  };
  const initState: userPostTypes[] = [
    {
      id: 1,
      first_name: "marcus1",
      avatar: "https://reqres.in/img/faces/1-image.jpg",
      title: "dolorem eum magni eos aperiam quia",
      body: "ut aspernatur corporis harum nihil quis provident sequi mollitia nobis aliquid molestiae perspiciatis et ea nemo ab reprehenderit accusantium quas voluptate dolores velit et doloremque molestiae",
    },
    {
      id: 2,
      first_name: "marcus2",
      avatar: "https://reqres.in/img/faces/1-image.jpg",
      title: "dolorem eum magni eos aperiam quia",
      body: "ut aspernatur corporis harum nihil quis provident sequi mollitia nobis aliquid molestiae perspiciatis et ea nemo ab reprehenderit accusantium quas voluptate dolores velit et doloremque molestiae",
    },
    {
      id: 3,
      first_name: "marcus3",
      avatar: "https://reqres.in/img/faces/1-image.jpg",
      title: "dolorem eum magni eos aperiam quia",
      body: "ut aspernatur corporis harum nihil quis provident sequi mollitia nobis aliquid molestiae perspiciatis et ea nemo ab reprehenderit accusantium quas voluptate dolores velit et doloremque molestiae",
    },
    {
      id: 4,
      first_name: "marcu4",
      avatar: "https://reqres.in/img/faces/1-image.jpg",
      title: "dolorem eum magni eos aperiam quia",
      body: "ut aspernatur corporis harum nihil quis provident sequi mollitia nobis aliquid molestiae perspiciatis et ea nemo ab reprehenderit accusantium quas voluptate dolores velit et doloremque molestiae",
    },
    {
      id: 5,
      first_name: "marcus5",
      avatar: "https://reqres.in/img/faces/1-image.jpg",
      title: "dolorem eum magni eos aperiam quia",
      body: "ut aspernatur corporis harum nihil quis provident sequi mollitia nobis aliquid molestiae perspiciatis et ea nemo ab reprehenderit accusantium quas voluptate dolores velit et doloremque molestiae",
    },
  ];

  const [posts, setPosts] = useState(initState);
  const [isShowModalDel, setIsShowModalDel] = useState(false);
  const [dataPostDel, setDataPostDel] = useState(userPostDefault);

  // Modal delete post
  const handleCloseModalDel = () => {
    setIsShowModalDel(false);
    setDataPostDel(userPostDefault);
  };

  const confirmDeleteUser = (post: userPostTypes) => {
    let _posts = _.cloneDeep(posts);
    _posts = _posts.filter(item => item.id !== post.id);
    setPosts(_posts);
    setIsShowModalDel(false);
    setDataPostDel(userPostDefault);
  };

  const handleDeletePost = (post: userPostTypes) => {
    setIsShowModalDel(true);
    setDataPostDel(post);
  };

  let userPost: userPostTypes = userPostDefault;
  // useEffect(() => {
  //   getPosts();
  // }, []);

  // const getPosts = async () => {
  //   let postsData = await fetchPostsData();
  //   let _posts: userPostTypes[] = [];
  //   if (postsData) {
  //     let usersData = await fetchUsersData(1);
  //     // console.log(">>> check postsData", postsData);
  //     // console.log(">>> check usersData", usersData.data);
  //     // return;
  //     if (usersData && usersData.data) {
  //       for (let i = 0; i <= postsData.length; i++) {
  //         userPost.first_name = usersData.data[i].first_name;
  //         userPost.avatar = usersData.data[i].avatar;
  //         userPost.title = postsData[i].title;
  //         userPost.body = postsData[i].body;
  //         userPost.id = postsData[i].id;

  //         // setPosts([...userPost, posts]);
  //         setPosts(prevState => {
  //           console.log(">>> prevState", prevState);
  //           return [...prevState, userPost];
  //         });
  //         // console.log(">>> check _posts1", posts);
  //       }
  //     }
  //   }
  // };
  // list

  // load more
  const handleScroll = (e: any) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      console.log(">>> check me herer");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });
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
                  <span onClick={() => handleDeletePost(post)}>
                    <img src={iconTrash} alt="" />
                  </span>
                </div>
                <div className="profile-title">{post.title}</div>
                <div className="profile-text">{post.body}</div>
              </div>
            </div>
          );
        })}
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
