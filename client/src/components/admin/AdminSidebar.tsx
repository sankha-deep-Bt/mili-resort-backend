import {
  LogOut,
  CalendarDays,
  BedDouble,
  Users,
  Calendar,
  X,
  Percent,
} from "lucide-react";
import { Button } from "../ui/button";

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  onSignOut,
}: any) {
  const NavItem = ({ id, label, Icon }: any) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setSidebarOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
        activeTab === id
          ? "bg-primary/10 text-primary border border-primary/10"
          : "text-stone-700 hover:bg-stone-50"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );

  return (
    <>
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r p-4
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:h-screen md:relative
        `}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex justify-between items-center md:block">
              <div>
                <h2 className="text-xl font-semibold">Mili Resort</h2>
                <p className="text-sm text-stone-500">Admin Portal</p>
              </div>
              <Button
                variant="outline"
                className="md:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <nav className="mt-8 space-y-2">
              <NavItem id="bookings" label="Bookings" Icon={CalendarDays} />
              <NavItem id="rooms" label="Rooms" Icon={BedDouble} />
              <NavItem id="guests" label="Guests" Icon={Users} />
              <NavItem id="events" label="Events" Icon={Calendar} />
              <NavItem
                id="latest-offers"
                label="Latest Offers"
                Icon={Percent}
              />
            </nav>
          </div>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 mt-4"
            onClick={onSignOut}
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
