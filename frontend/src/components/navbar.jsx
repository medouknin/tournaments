import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Switch } from "antd";
import { FaMoon, FaSun } from "react-icons/fa";
import { updateStatuses } from "../storage/rentalsSlice";
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie';



function Navbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loggedUser, setLoggedUser] = useState({});

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (!user) {
			navigate("/login");
		}
		setLoggedUser(user);
	}, [navigate]);

	useEffect(() => {
        dispatch(updateStatuses());
    }, [dispatch]);

	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const handleLogout = () => {
		Cookies.remove('userToken');
		localStorage.removeItem("user");
		navigate('/login');
	};
	const encryptedId = btoa(JSON.stringify(loggedUser.id));
	const pages = [
		{ title: "Home", path: "/home" },
		{ title: "Profile", path: `/profile/${encryptedId}` },
	];

	return (
		<nav>
			<AppBar position="static" style={{ backgroundColor: "#fff" }}>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Link to="/home">
							<img src={Logo} alt="reant a bike logo" width={50} />
						</Link>

						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "flex", md: "none", justifyContent: "right" },
							}}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit">
								<MenuIcon />
							</IconButton>
							{/* mobile menu */}
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" },
								}}>
								<div className=" flex bg-red-300 ml-7 px-4">
									{pages.map((page, index) => (
										<NavLink
											key={index}
											to={page.path}
											className=" no-underline my-1"
											onClick={handleCloseNavMenu}>
											{page.title}
										</NavLink>
									))}
								</div>
							</Menu>
						</Box>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "none", md: "flex", justifyContent: "left" },
								mr: 4,
							}}>
							{pages.map((page, index) => (
								<NavLink
									key={index}
									onClick={handleCloseNavMenu}
									to={page.path}
									className="nav-item no-underline ml-10">
									{page.title}
								</NavLink>
							))}
						</Box>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "none", md: "flex", justifyContent: "right" },
								mr: 4,
							}}>
							<div className=" flex gap-2">
								<FaSun color="black" />
								<Switch size="small" />
								<FaMoon color="black" size={15} />
							</div>
						</Box>
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip>
								<Typography
									onClick={handleOpenUserMenu}
									variant="subtitle1"
									sx={{ ml: 1,color : "black", cursor: "pointer" }}>
									{loggedUser.name}
								</Typography>
							</Tooltip>

							<Menu
								sx={{ mt: "45px", justifyContent: "right" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}>
								<MenuItem
									onClick={handleCloseUserMenu}
									className="m-2 rounded-lg">
									<Typography textAlign="right" onClick={handleLogout}>
										Log Out
									</Typography>
								</MenuItem>
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</nav>
	);
}
export default Navbar;
