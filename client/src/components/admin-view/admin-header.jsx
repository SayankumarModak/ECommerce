import { AlignJustify, AlignJustifyIcon, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/store/auth-slice/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    console.log("button clicked");
    console.log("dispatch:", dispatch); // Check if dispatch exists
    console.log("logout action:", logout); //
    dispatch(logout());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <button
        className="lg:hidden text-white sm:block"
        onClick={() => setOpen(true)}
      >
        <AlignJustify />
      </button>
      <div className=" flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
