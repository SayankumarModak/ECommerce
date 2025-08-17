import {
  HousePlug,
  LogOut,
  Menu,
  NavigationIcon,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logout, resetTokenCredentials } from "@/store/auth-slice/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "Search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    // set the search params
    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(`?category=${getCurrentMenuItem.id}`)
      : navigate(getCurrentMenuItem.path);
  }
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row px-2">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { cartItems } = useSelector((state) => state.shopCart);

  function handleLogout() {
    // dispatch(logout());
    dispatch(resetTokenCredentials());
    sessionStorage.clear();
    navigate("/auth/login");
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4 ">
      {/* have to wrap with  sheet to open on click of the button */}
      {/* create cart wrapper cand cart items content */}
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          onClick={() => setOpenCartSheet(true)}
        >
          {/* cart icon */}
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
          setOpenCartSheet={setOpenCartSheet}
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserCog className="mr-2 h-4 w-4 bg-background" />
            {user.userName}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-background/80 border-b border-slate-200/80 shadow-sm">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link
            to="/shop/home"
            className="flex items-center gap-2 transition-transform hover:scale-105"
          >
            <div className="p-1.5 bg-gradient-to-tr from-primary to-primary/80 text-white rounded-lg">
              <HousePlug className="h-6 w-6" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              LUXORA
            </span>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-primary/10"
              >
                <Menu className="h-6 w-6 text-primary" />
                <span className="sr-only">Toggle Header Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-full max-w-xs border-r border-slate-200/80 backdrop-blur-lg bg-background/95"
            >
              <div className="flex flex-col h-full">
                <MenuItems />
                <div className="mt-auto pb-6">
                  <HeaderRightContent />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Menu */}
          <nav className="hidden lg:block flex-1 px-10">
            <MenuItems />
          </nav>

          {/* Right Content */}
          <div className="hidden lg:block">
            <HeaderRightContent />
          </div>
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
