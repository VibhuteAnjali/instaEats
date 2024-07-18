// import { useEffect, useState, useContext } from "react";
// import { usePosts, useSearch } from "../hooks/usePosts";
// import "../styles/Search.css";
// import Postbox from "./Postbox";
// import { useGetProfile } from "../hooks/useProfile";
// import SearchIcon from "./sideComponents/SearchIcon";
// import Loader from "./Loader";
// import { UserContext } from "../Context/UserContext";
// import Nocontent from "./Nocontent";

// export default function Search() {
//   const { loading, error, fetchAllPosts } = usePosts();
//   const { email } = useContext(UserContext);
//   const {
//     profileData,
//     loading: loading2,
//     error: error2,
//   } = useGetProfile(email);

//   const [postData, setPostData] = useState([]);
//   const [filteredPostData, setFilteredPostData] = useState([]);
//   const [input, setInput] = useState("");
//   const [filterValue, setFilterValue] = useState("");
//   const { searchDoc } = useSearch();

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const data = await fetchAllPosts();
//       setPostData(data);
//       setFilteredPostData(data);
//     };
//     fetchPosts();
//   }, [fetchAllPosts]);

//   useEffect(() => {
//     let filterData = postData;
//     if (filterValue === "rating") {
//       filterData = postData.filter((post) => post.rating > 4);
//     } else if (filterValue === "new") {
//       filterData = postData.sort((a, b) => new Date(b.date) - new Date(a.date));
//     }
//     setFilteredPostData(filterData);
//   }, [filterValue, postData]);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     const data = await searchDoc(input);
//     setFilteredPostData(data);
//     // console.log(data);
//   };

//   if (loading || loading2) {
//     return <Loader />;
//   }

//   if (error || error2) {
//     console.log(error || error2);
//   }
//   if (profileData.length == 0) {
//     return <Nocontent message="Create Profile To start viewing content!" />;
//   }

//   return (
//     <div>
//       <form method="post" className="search" onSubmit={handleSearch}>
//         <input
//           type="text"
//           placeholder="Search"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <button type="submit" className="searchBtn">
//           <SearchIcon />
//         </button>
//       </form>
//       <div className="selectBox">
//         <label>Filter</label>
//         <div className="select">
//           <select
//             id="standard-select"
//             value={filterValue}
//             onChange={(e) => setFilterValue(e.target.value)}
//           >
//             <option value="new">Newest First</option>
//             <option value="rating">Rating 4 & above</option>
//           </select>
//         </div>
//       </div>
//       <Postbox postData={filteredPostData} profileData={profileData} />
//     </div>
//   );
// }
import { useEffect, useState, useContext } from "react";
import { usePosts, useSearch } from "../hooks/usePosts";
import "../styles/Search.css";
import Postbox from "./Postbox";
import { useGetProfile } from "../hooks/useProfile";
import SearchIcon from "./sideComponents/SearchIcon";
import Loader from "./Loader";
import { UserContext } from "../Context/UserContext";
import Nocontent from "./Nocontent";

export default function Search() {
  const { loading, error, fetchAllPosts } = usePosts();
  const { email } = useContext(UserContext);
  const {
    profileData,
    loading: loading2,
    error: error2,
  } = useGetProfile(email);

  const [postData, setPostData] = useState([]);
  const [filteredPostData, setFilteredPostData] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [input, setInput] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const { searchDoc } = useSearch();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoadingPosts(true);
      const data = await fetchAllPosts();
      setPostData(data);
      setFilteredPostData(data);
      setIsLoadingPosts(false);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    let filterData = postData;
    if (filterValue === "rating") {
      filterData = postData.filter((post) => post.rating > 4);
    } else if (filterValue === "new") {
      filterData = postData.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setFilteredPostData(filterData);
  }, [filterValue]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await searchDoc(input);
    setFilteredPostData(data);
  };

  if (loading || loading2 || isLoadingPosts) {
    return <Loader />;
  }

  if (error || error2) {
    return <p>{`${error?.message || ""} ${error2?.message || ""}`.trim()}</p>;
  }

  if (profileData.length === 0) {
    return <Nocontent message="Create Profile To start viewing content!" />;
  }

  return (
    <div>
      <form method="post" className="search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="searchBtn">
          <SearchIcon />
        </button>
      </form>
      <div className="selectBox">
        <label>Filter</label>
        <div className="select">
          <select
            id="standard-select"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            <option value="new">Newest First</option>
            <option value="rating">Rating 4 & above</option>
          </select>
        </div>
      </div>
      <Postbox postData={filteredPostData} profileData={profileData} />
    </div>
  );
}
