import React from "react";
import { Link } from "react-router-dom";
import "./chatList.css";
import { useQuery } from "@tanstack/react-query";

function ChatList() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        // credentials trong fetch: Yêu cầu trình duyệt gửi cookie
        // hoặc thông tin xác thực đến backend.
        credentials: "include",
      }).then((res) => res.json()),
  });
  console.log(data);

  return (
    <div className="ChatList">
      <span className="title">BẢNG ĐIỀU KHIỂN</span>
      <Link to="/dashboard">Tạo cuộc trò chuyện mới</Link>
      <Link to="/">Khám phá trò chuyện với VLUITGenie</Link>
      <hr />
      <span className="title">CUỘC TRÒ CHUYỆN GẦN ĐÂY</span>{" "}
      <div className="list">
        {isLoading
          ? "Đang tải... "
          : !data || data.length === 0
          ? "Chưa có cuộc trò chuyện nào"
          : error
          ? "Có lỗi xảy ra"
          : data?.map((chat) => (
              /* Redirect đến ChatPage với ChatId */
              <Link key={chat._id} to={`/dashboard/chats/${chat._id}`}>
                {chat?.title}
              </Link>
            ))}
      </div>
      <hr />
    </div>
  );
}

export default ChatList;
