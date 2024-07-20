import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function V0PersonalChat() {
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
              <div className="font-medium">John Doe</div>
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
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">John Doe</div>
                <div className="text-xs text-muted-foreground">Online</div>
              </div>
              <div className="text-xs text-muted-foreground">9:15 AM</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">Jane Doe</div>
                <div className="text-xs text-muted-foreground">Online</div>
              </div>
              <div className="text-xs text-muted-foreground">8:45 AM</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">Bob Smith</div>
                <div className="text-xs text-muted-foreground">Offline</div>
              </div>
              <div className="text-xs text-muted-foreground">Yesterday</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="bg-background border-b border-muted p-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
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
          <div className="flex items-end gap-2 justify-end">
            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg max-w-[75%] text-sm">
              Hey Jane, how's it going?
            </div>
            <div className="text-xs text-muted-foreground">9:15 AM</div>
          </div>
          <div className="flex items-end gap-2">
            <div className="bg-muted text-muted-foreground px-4 py-2 rounded-lg max-w-[75%] text-sm">
              Hi John, I'm doing great! How about you?
            </div>
            <div className="text-xs text-muted-foreground">9:16 AM</div>
          </div>
          <div className="flex items-end gap-2 justify-end">
            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg max-w-[75%] text-sm">
              I'm doing well, thanks for asking! Did you have a chance to look at that proposal I sent over?
            </div>
            <div className="text-xs text-muted-foreground">9:17 AM</div>
          </div>
          <div className="flex items-end gap-2">
            <div className="bg-muted text-muted-foreground px-4 py-2 rounded-lg max-w-[75%] text-sm">
              Yes, I did! I think it looks great. Let's schedule a call to discuss it further.
            </div>
            <div className="text-xs text-muted-foreground">9:18 AM</div>
          </div>
        </div>
        <div className="bg-background border-t border-muted p-4 flex items-center gap-2">
          <Input placeholder="Type your message..." className="flex-1 rounded-full pr-12" />
          <Button variant="ghost" size="icon" className="rounded-full">
            <PaperclipIcon className="w-5 h-5" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Button className="rounded-full">
            <SendIcon className="w-5 h-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

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