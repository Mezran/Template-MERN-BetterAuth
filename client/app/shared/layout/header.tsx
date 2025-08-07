import { Link } from "react-router";
import { Button } from "../shadcn/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcn/components/ui/dropdown-menu";
import { useGetSessionQuery, useLogoutMutation } from "../../store/api/auth/authApi";

export function Header() {
  const { data: session, isLoading } = useGetSessionQuery();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-xl font-bold">
                MERN App
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {isLoading ? (
                <div className="h-9 w-20 animate-pulse bg-muted rounded"></div>
              ) : session?.user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-4">
                    <Link to="/dashboard">
                      <Button size="sm" variant="ghost">
                        Dashboard
                      </Button>
                    </Link>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={session.user.image || ""}
                            alt={session.user.name}
                          />
                          <AvatarFallback>
                            {getInitials(session.user.name)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {session.user.name}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {session.user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="cursor-pointer">
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
      <div className="py-8 border-b"></div> {/*spacer */}
    </>
  );
}
