import React from "react";
import "./dashboardPage.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
function DashboardPage() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    // server response trả về id của chat mới tạo
    onSuccess: (id) => {
      console.log(id);
      
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    mutation.mutate(text); // Gọi hàm mutate với text
  };
  
  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src="/logoVLU.png" alt=""></img>
          <h1>VLUITGenie</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt=""></img>
            <span>Create A New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt=""></img>
            <span>Analyze Images</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input name="text" type="text" placeholder="Hỏi bất kỳ điều gì..."></input>
          <button>
            <img src="/arrow.png" alt=""></img>
          </button>
        </form>
      </div>
    </div>
  );
}

export default DashboardPage;
