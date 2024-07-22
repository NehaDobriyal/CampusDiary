import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/authcontext";
import { useParams } from "react-router-dom";

const ChatSession = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState([]);
    const [currMess, setCurrMess] = useState('');
    const userData = useAuth();
    const userid = userData.userData.userId;
    const { recipientId } = useParams();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost:4500/api/personalchat/start-chat/${userid}/${recipientId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await response.json();
                setMessage(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [userid, recipientId]); 
    const handleChange = (event) => {
        setCurrMess(event.target.value);
    };

    const handleSubmit = async () => {
        if (currMess.trim() === '') return; // Prevent sending empty messages
        try {
            await fetch('http://localhost:4500/api/personalchat/sendpersonal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    senderId: userid,
                    recipientId: recipientId,
                    message: currMess,
                }),
            });
            setCurrMess(''); 
            await fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="flex-1 flex flex-col">
            <div className="bg-background border-b border-muted p-4">
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>CD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="font-medium">Jane Doe</div>
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
                            <DropdownMenuItem>View profile</DropdownMenuItem>
                            <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                            <DropdownMenuItem>Delete chat</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="flex-1 overflow-auto p-4 flex flex-col gap-4">
                {message.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 ${msg.senderId === userid ? 'justify-end' : ''}`}>
                        <div className={`px-4 py-2 rounded-lg max-w-[75%] text-sm ${msg.senderId === userid ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                            {msg.encryptedMessage}
                        </div>
                        <div className="text-xs text-muted-foreground">{new Date(msg.timestamp).toLocaleTimeString()}</div>
                    </div>
                ))}
            </div>
            <div className="bg-background border-t border-muted p-4 flex items-center gap-2">
                <Input 
                    placeholder="Type your message..." 
                    className="flex-1 rounded-full pr-12" 
                    value={currMess} 
                    onChange={handleChange} 
                />
                <Button 
                    className="rounded-full" 
                    onClick={handleSubmit}
                >
                    <SendIcon className="w-5 h-5" />
                    <span className="sr-only">Send message</span>
                </Button>
            </div>
        </div>
    );
};

export default ChatSession;


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
    )
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
    )
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
    )
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
    )
}