import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/authcontext";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import ChatSession from "./ChatSession";
const socket = io('http://localhost:4500', { withCredentials: true });
export default function V0PersonalChat() {
  const [newMessage, setNewMessage] = useState([]);
  const [showChatSession, setShowChatSession] = useState(false);
  const [recipientId, setRecipientId] = useState(null);
  const userData = useAuth();
  const name = userData.userData.username;
  const navigate = useNavigate();
  const userId = userData.userData.userId;
  const username = userData.userData.username;
  const [secondusername, setsecondusername] = useState('');
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:4500/api/personalchat/getpersonal`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        setNewMessage(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    socket.emit('joinChat', userData.userData.userId);
    socket.on('receiveMessage', (message) => {
      setNewMessage((prevMessages) => [message, ...prevMessages]);
    });
    socket.on('updateSidebar', (message) => {
      setNewMessage((prevMessages) => {
        const updatedMessages = prevMessages.filter(
          (msg) => msg.readBy.toString() !== message.readBy.toString() || msg.sendBy.toString() !== message.sendBy.toString()
        );
        return [message, ...updatedMessages];
      });
    });
    return () => {
      socket.off('receiveMessage');
      socket.off('updateSidebar');
    };
  }, [userData.userData.userId]);
  const handleclick = async (message) => {
    const recipientId = message.sendBy.toString()===userId?message.readBy.toString():message.sendBy.toString();
    const second = message.sendBy.toString()===userId?msg.readerusername:msg.senderusername;
    setRecipientId(recipientId);
    setsecondusername(second);
    setShowChatSession(true);
  }
  return (
    <div className="flex h-screen w-full max-w-[1200px] mx-auto">
      <div className="bg-background border-r border-muted w-[300px] flex flex-col">
        <div className="sticky top-0 bg-background p-4 border-b border-muted">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-medium">{name}</div>
              <div className="text-xs text-muted-foreground">Online</div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoveVerticalIcon className="w-5 h-5" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>New chat</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="p-4 space-y-4">
            {newMessage && newMessage.map((msg, index) => (
              <div key={index} className="flex items-center gap-4" onClick={() => handleclick(msg)}>
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">{msg.senderusername===username?msg.readerusername:msg.senderusername}</div>
                  <div className="text-xs text-muted-foreground">
                    {(msg.sendBy.toString()===userId) ? "You" : msg.senderusername} : {msg.content}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{new Date(msg.timestamp).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showChatSession && <ChatSession recipientId={recipientId} username={secondusername} />}
    </div>
  );
}

// SVG Icons
function MoveVerticalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  );
}

function PaperclipIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
