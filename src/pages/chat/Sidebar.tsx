// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";

// interface User {
//   id: number;
//   name: string;
//   phone_number: string;
//   bot_number: string;
//   channel: string;
// }

// const Sidebar: React.FC<{ onSelectUser: (user: User) => void }> = ({
//   onSelectUser,
// }) => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [allUsers, setAllUsers] = useState<User[]>([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const scrollRef = useRef<HTMLDivElement>(null);
//   const nextPage = useRef(1);
//   const hasInitialized = useRef(false);

//   const baseUrl = "https://chatbotbe.popoutbox.in/api/whatsapp/app/clients/";
//   const pageSize = 20;

// const fetchUsers = async (force = false) => {
//   if ((loading || !hasMore) && !force) return;

//     setLoading(true);
//     try {
//       const url = `${baseUrl}?page=${nextPage.current}&page_size=${pageSize}`;
//       const res = await axios.get(url);
//       const result = res.data.results;

//       if (result.data.length > 0) {
//         setUsers((prev) => [...prev, ...result.data]);
//         setAllUsers((prev) => [...prev, ...result.data]);
//         nextPage.current += 1;
//         if (!res.data.next) setHasMore(false);
//       } else {
//         setHasMore(false);
//       }
//     } catch (err) {
//       console.error("Error fetching users:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const searchUsers = async (query: string) => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `https://chatbotbe.popoutbox.in/api/whatsapp/app/clients/search/?q=${query}`
//       );
//       const result = res.data.data || []; // <-- fixed structure
//       setUsers(result);
//       setHasMore(false);
//     } catch (err) {
//       console.error("Search API error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!hasInitialized.current) {
//       hasInitialized.current = true;
//       fetchUsers();
//     }
//   }, []);

//   const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
//     const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
//     if (scrollHeight - scrollTop <= clientHeight + 100 && search === "") {
//       fetchUsers();
//     }
//   };
//   const resetPaginationAndFetch = () => {
//       setUsers([]);
//       nextPage.current = 1;
//       setHasMore(true);
//       fetchUsers(true);
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearch(value);

//     if (value.trim() === "") {
//       resetPaginationAndFetch();
//     } else {
//       const localFiltered = allUsers.filter(
//         (user) =>
//           user.name.toLowerCase().includes(value.toLowerCase()) ||
//           user.phone_number.includes(value)
//       );

//       if (localFiltered.length > 0) {
//         setUsers(localFiltered);
//         setHasMore(false);
//       } else {
//         searchUsers(value);
//       }
//     }
//   };

//   return (
//     <div
//       style={{
//         width: "100%",
//         borderRight: "1px solid #ccc",
//         height: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: "#fff",
//       }}
//     >
//       {/* Header */}
//       <div
//         style={{
//           padding: "12px 16px",
//           backgroundColor: "#128C7E",
//           borderBottom: "1px solid #ddd",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           color: "#fff",
//         }}
//       >
//         <h2 style={{ margin: 0, fontSize: "18px" }}>Chat Meta</h2>
//         <div
//           onClick={() => alert("hi")}
//           style={{ fontSize: "24px", cursor: "pointer", userSelect: "none" }}
//         >
//           &#8942;
//         </div>
//       </div>

//       {/* Search */}
//       <div style={{ padding: "10px", backgroundColor: "#f0f2f5" }}>
//         <input
//           type="text"
//           placeholder="Search by number or name"
//           value={search}
//           onChange={handleSearchChange}
//           style={{
//             width: "100%",
//             padding: "10px 12px",
//             borderRadius: "20px",
//             border: "none",
//             backgroundColor: "#fff",
//             boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
//           }}
//         />
//       </div>

//       {/* Scrollable User List */}
//       <div
//         ref={scrollRef}
//         onScroll={handleScroll}
//         style={{
//           overflowY: "auto",
//           flex: 1,
//           backgroundColor: "#fff",
//           scrollBehavior: "smooth",
//         }}
//       >
//         {users.map((user, index) => (
//           <div
//             key={`${user.id}-${index}`}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               padding: "12px 16px",
//               borderBottom: "1px solid #f0f0f0",
//               cursor: "pointer",
//               transition: "background 0.2s ease-in-out",
//             }}
//             onClick={() => onSelectUser(user)}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.backgroundColor = "#f7f7f7")
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.backgroundColor = "white")
//             }
//           >
//             {/* Avatar with channel badge */}
//             <div style={{ position: "relative", marginRight: "12px" }}>
//               <div
//                 style={{
//                   width: 48,
//                   height: 48,
//                   borderRadius: "50%",
//                   backgroundColor: "#128C7E",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontSize: "18px",
//                   fontWeight: "bold",
//                   color: "#fff",
//                 }}
//               >
//                 {user.name ? user.name.charAt(0).toUpperCase() : "👤"}
//               </div>

//               {/* Channel Initial Badge */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: -2,
//                   right: -2,
//                   backgroundColor: "#b2d2a4",
//                   color: "#08313a",
//                   fontSize: "12px",
//                   fontWeight: "bold",
//                   borderRadius: "50%",
//                   padding: "2px 5px",
//                   minWidth: 16,
//                   textAlign: "center",
//                 }}
//               >
//                 {user.channel ? user.channel.charAt(0).toUpperCase() : "M"}
//               </div>
//             </div>

//             {/* Name & Number */}
//             <div style={{ flex: 1 }}>
//               <div style={{ fontWeight: 500, fontSize: "16px", color: "#111" }}>
//                 {user.name}
//               </div>
//               <div
//                 style={{ fontSize: "13px", color: "#666", marginTop: "2px" }}
//               >
//                 {user.phone_number}
//               </div>
//             </div>

//             {/* Bot Number Tag */}
//             <div
//               style={{
//                 marginTop: "4px",
//                 fontSize: "11px",
//                 backgroundColor: "#007bff",
//                 color: "#fff",
//                 display: "inline-block",
//                 padding: "5px",
//                 borderRadius: "6px",
//               }}
//             >
//               {user.bot_number}
//             </div>
//           </div>
//         ))}
//         {!loading && users.length === 0 && search.trim() !== "" && (
//           <div
//             style={{
//               textAlign: "center",
//               padding: "16px",
//               color: "#999",
//               fontSize: "14px",
//             }}
//           >
//             Customer not found
//           </div>
//         )}

//         {/* Loading */}
//         {loading && (
//           <div
//             style={{
//               textAlign: "center",
//               padding: "10px",
//               fontSize: "14px",
//               color: "#888",
//             }}
//           >
//             Loading...
//           </div>
//         )}

//         {/* No More */}
//         {!hasMore && !loading && users.length > 0 && (
//           <div
//             style={{
//               textAlign: "center",
//               padding: "10px",
//               fontSize: "13px",
//               color: "#aaa",
//             }}
//           >
//             No more users to load.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  phone_number: string;
  bot_number: string;
  channel: string;
  updated_at: string;
}

const Sidebar: React.FC<{ onSelectUser: (user: User) => void }> = ({
  onSelectUser,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [visibleBot, setVisibleBot] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const nextPage = useRef(1);
  const hasInitialized = useRef(false);

  const baseUrl = "https://chatbotbe.popoutbox.in/api/whatsapp/app/clients/";
  const pageSize = 20;

  const fetchUsers = async (force = false) => {
    if ((loading || !hasMore) && !force) return;

    setLoading(true);
    try {
      const url = `${baseUrl}?page=${nextPage.current}&page_size=${pageSize}`;
      const res = await axios.get(url);
      const result = res.data.results;

      if (result.data.length > 0) {
        setUsers((prev) => [...prev, ...result.data]);
        setAllUsers((prev) => [...prev, ...result.data]);
        nextPage.current += 1;
        if (!res.data.next) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async (query: string) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://chatbotbe.popoutbox.in/api/whatsapp/app/clients/search/?q=${query}`
      );
      const result = res.data.data || [];
      setUsers(result);
      setHasMore(false);
    } catch (err) {
      console.error("Search API error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      fetchUsers();
    }
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 100 && search === "") {
      fetchUsers();
    }
  };

  const resetPaginationAndFetch = () => {
    setUsers([]);
    nextPage.current = 1;
    setHasMore(true);
    fetchUsers(true);
  };

  const fuzzyMatch = (text: string, pattern: string) => {
    const cleaned = pattern.replace(/[^a-zA-Z0-9]/g, ""); // remove special chars
    const regex = new RegExp(cleaned.split("").join(".*"), "i"); // fuzzy match
    return regex.test(text);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      resetPaginationAndFetch();
    } else {
      const localFiltered = allUsers.filter(
        (user) =>
          fuzzyMatch(user.name, value) || fuzzyMatch(user.phone_number, value)
      );

      if (localFiltered.length > 0) {
        setUsers(localFiltered);
        setHasMore(false);
      } else {
        searchUsers(value);
      }
    }
  };

  const formatLastSeen = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    const isYesterday =
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();

    if (isToday) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } else if (isYesterday) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-GB"); // dd/mm/yyyy
    }
  };

  return (
    <div
      style={{
        width: "100%",
        borderRight: "1px solid #ccc",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 16px",
          backgroundColor: "#128C7E",
          borderBottom: "0px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "18px" }}>Chat Meta</h2>
        <div
          onClick={() => alert("hi")}
          style={{ fontSize: "24px", cursor: "pointer", userSelect: "none" }}
        >
          &#8942;
        </div>
      </div>

      <div
        style={{
          padding: "12px",
          backgroundColor: "#128C7E",
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {/* Search Box */}
        <div style={{ position: "relative", flex: 1 }}>
          <svg
            style={{
              position: "absolute",
              top: "50%",
              left: "12px",
              transform: "translateY(-50%)",
              width: "16px",
              height: "16px",
              fill: "#54656f",
            }}
            viewBox="0 0 26 26"
          >
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16a6.471 6.471 0 0 0 4.23-1.57l.27.28v.79l5 5L20.49 19l-5-5zm-6 0C8.01 14 6 11.99 6 9.5S8.01 5 10.5 5 15 7.01 15 9.5 12.99 14 10.5 14z" />
          </svg>
          <input
            type="text"
            placeholder="Search or start new chat"
            value={search}
            onChange={handleSearchChange}
            style={{
              width: "100%",
              padding: "10px 12px 10px 36px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              backgroundColor: "#fff",
              fontSize: "16px",
              color: "#111",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}
          />
        </div>

        {/* Reload Button */}
        <div
          onClick={resetPaginationAndFetch}
          title="Reload"
          style={{
            fontSize: "27px",
            color: "#fff",
            cursor: "pointer",
            userSelect: "none",
            padding: "6px 10px",
            borderRadius: "6px",
            backgroundColor: "#128C7E",
          }}
        >
          &#8635;
        </div>
      </div>

      {/* Scrollable User List */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          overflowY: "auto",
          flex: 1,
          backgroundColor: "#fff",
          scrollBehavior: "smooth",
        }}
      >
        {users.map((user, index) => (
          <div
            key={`${user.id}-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 16px",
              borderBottom: "1px solid #f0f0f0",
              cursor: "pointer",
              transition: "background 0.2s ease-in-out",
              backgroundColor: index % 2 === 0 ? "" : "#f9f9f9",
            }}
            onClick={() => onSelectUser(user)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f7f7f7")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "white")
            }
          >
            {/* Avatar with channel badge */}
            <div style={{ position: "relative", marginRight: "12px" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: "#128C7E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : "👤"}
              </div>

              {/* Channel Initial Badge */}
              <div
                style={{
                  position: "absolute",
                  top: -2,
                  right: -2,
                  backgroundColor: "#25D366",
                  color: "#08313a",
                  fontSize: "12px",
                  fontWeight: "bold",
                  borderRadius: "50%",
                  padding: "2px 5px",
                  minWidth: 16,
                  textAlign: "center",
                }}
              >
                {user.channel ? user.channel.charAt(0).toUpperCase() : "M"}
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: "16px", color: "#111" }}>
                {user.name}
              </div>
              <div
                style={{ fontSize: "13px", color: "#666", marginTop: "2px" }}
              >
                {user.phone_number}
              </div>
            </div>

            {/* Right side: bot number + last seen */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "space-between",
                height: "100%",
                marginLeft: "10px",
              }}
            >
              <div
                style={
                  visibleBot === index
                    ? {
                        fontSize: "11px",
                        backgroundColor: "#b2d2a4",
                        color: "#08313a",
                        display: "inline-block",
                        padding: "5px 8px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }
                    : {
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        backgroundColor: "#25D366",
                        color: "#08313a",
                        fontSize: "12px",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        padding: "4px",
                        textAlign: "center",
                      }
                }
                onClick={(e) => {
                  e.stopPropagation();
                  setVisibleBot((prev) => (prev === index ? null : index));
                }}
                title="Show bot number"
              >
                {visibleBot === index ? user.bot_number : "BN"}
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "#999",
                  marginTop: "8px",
                  whiteSpace: "nowrap",
                }}
              >
                {formatLastSeen(user.updated_at)}
              </div>
            </div>
          </div>
        ))}

        {/* Empty Search */}
        {!loading && users.length === 0 && search.trim() !== "" && (
          <div
            style={{
              textAlign: "center",
              padding: "16px",
              color: "#999",
              fontSize: "14px",
            }}
          >
            Customer not found
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "10px",
              fontSize: "14px",
              color: "#888",
            }}
          >
            Loading...
          </div>
        )}

        {/* No More */}
        {!hasMore && !loading && users.length > 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "10px",
              fontSize: "13px",
              color: "#aaa",
            }}
          >
            No more users to load.
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
