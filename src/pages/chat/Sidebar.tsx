
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  phone_number: string;
  bot_number: string;
  channel: string;
}

const Sidebar: React.FC<{ onSelectUser: (user: User) => void }> = ({
  onSelectUser,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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
      const result = res.data.data || []; // <-- fixed structure
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      resetPaginationAndFetch();
    } else {
      const localFiltered = allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(value.toLowerCase()) ||
          user.phone_number.includes(value)
      );

      if (localFiltered.length > 0) {
        setUsers(localFiltered);
        setHasMore(false);
      } else {
        searchUsers(value);
      }
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
          backgroundColor: "#25D366",
          borderBottom: "1px solid #ddd",
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

      {/* Search */}
      <div style={{ padding: "10px", backgroundColor: "#f0f2f5" }}>
        <input
          type="text"
          placeholder="Search by number or name"
          value={search}
          onChange={handleSearchChange}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "20px",
            border: "none",
            backgroundColor: "#fff",
            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
          }}
        />
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
                  backgroundColor: "#25D366",
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
                  backgroundColor: "#b2d2a4",
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

            {/* Name & Number */}
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

            {/* Bot Number Tag */}
            <div
              style={{
                marginTop: "4px",
                fontSize: "11px",
                backgroundColor: "#007bff",
                color: "#fff",
                display: "inline-block",
                padding: "5px",
                borderRadius: "6px",
              }}
            >
              {user.bot_number}
            </div>
          </div>
        ))}
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
