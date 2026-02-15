import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const Sidebar = () => {
    const { user } = useAppSelector((s) => s.auth);
    const location = useLocation();

    console.log("User in Sidebar:", user);
    const menu = [
        { name: "Dashboard", path: "/" },
        { name: "Products", path: "/products" },
    ];

    if (user?.role === "ADMIN") {
        menu.push({ name: "Stock History", path: "/stock" });
    }


    return (
        <div className="w-60 bg-white shadow-md">
            <div className="p-4 font-bold text-lg border-b">
                IMS
            </div>

            <nav className="p-3 space-y-2">
                {menu.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`block p-2 rounded ${location.pathname === item.path
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-100"
                            }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
