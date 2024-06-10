import React, { useState, useEffect } from "react";
import { PieChartOutlined, UserOutlined } from "@ant-design/icons";
import { TbTournament } from "react-icons/tb";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { FaMoon, FaSun } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Layout, Menu, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setSelectedTab } from "../storage/dashboardSlice";

import Statistics from "./stats";
import UsersList from "./users";
import AddBike from "./addBike";
import BikesList from "./bikes";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}

const items = [
	getItem("Statistics", "1", <PieChartOutlined />),
	getItem("Tournament", "2", <TbTournament />),
	getItem("Users", "3", <UserOutlined />),
	getItem("Add Tournament ", "4", <IoIosAddCircleOutline />),
];

const Dashboard = () => {
	const [collapsed, setCollapsed] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isDark = useSelector((state) => state.theme.isDark);
	const selectedTab = useSelector((state) => state.dashboard.selectedTab);

	useEffect(() => {
		const token = Cookies.get("token");
		if (!token) {
			navigate("/login");
		}
	}, [navigate]);
	const toggleTheme = () => {
		dispatch(toggleThemeMode());
	};

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
				theme={isDark ? "dark" : "light"}
				className="pt-11">
				<Menu
					theme={isDark ? "dark" : "light"}
					defaultSelectedKeys={["1"]}
					mode="inline"
					items={items}
					onSelect={({ key }) => dispatch(setSelectedTab(key))}
				/>
				<span className="absolute bottom-7 left-3 px-4 mb-4">
					<Link
						to="/login"
						className="flex no-underline items-center gap-2 text-red-500 hover:text-red-700"
						onClick={() => Cookies.remove("token")}>
						<RiLogoutBoxLine />
						{!collapsed && "Log Out"}
					</Link>
				</span>
			</Sider>
			<Layout>
				<Header
					className={`h-12 flex justify-between px-4 items-center ${
						isDark ? "bg-darkBlue text-white" : "bg-white"
					}`}>
					<h3 className="m-0">Dashboard</h3>
					<div className="flex items-center gap-4">
						<div className="flex gap-2">
							<FaSun />
							<Switch size="small" checked={isDark} onChange={toggleTheme} />
							<FaMoon size={15} />
						</div>
						<img src={Logo} alt="" width={50} />
					</div>
				</Header>
				<Content style={{ margin: "16px" }}>
					<main
						className={`container h-full rounded-xl ${
							isDark ? "bg-darkBlue text-white" : "bg-white"
						}`}>
						<ContentContainer selectedTab={selectedTab} />
					</main>
				</Content>
				<Footer style={{ textAlign: "center" }}>
					ISTA Tinghir©{new Date().getFullYear()} Created by{" "}
					<Link to="https://web.facebook.com/profile.php?id=100014903109909">Ouknin</Link> and{" "}
					<Link to="https://web.facebook.com/profile.php?id=100014903109909">Zergui</Link>
				</Footer>
			</Layout>
		</Layout>
	);
};

export default Dashboard;

const ContentContainer = ({ selectedTab }) => {
	switch (selectedTab) {
		case "1":
			return <Statistics />;
		case "2":
			return <BikesList />;
		case "3":
			return <UsersList />;
		case "4":
			return <AddBike />;
		default:
			return null;
	}
};
