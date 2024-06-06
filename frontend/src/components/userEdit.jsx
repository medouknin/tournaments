import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { FaRegUser } from "react-icons/fa6";
import Bicycle from "../assets/Small_Vehicle.png";
import { updateUser } from "../storage/usersSlice";
import { useDispatch } from 'react-redux';

export default function UserEdit() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const decodedId = JSON.parse(atob(id)); 
	const user = JSON.parse(localStorage.getItem("user"));
	const [form] = Form.useForm();
	const [userData, setUserData] = useState(user);

	const onFinish = (values) => {
		dispatch(
            updateUser({
                id: decodedId,
                name: values.name,
                email: values.email,
                phone: values.phone,
            })
        );
	};

	return (
		<main className=" pt-4 px-10 bg-white">
			<div className=" flex justify-between items-center">
				<span className=" flex text-4xl items-center gap-3">
					<FaRegUser className=" text-blue-500" />
					<p className="pt-4">Edit Profile Info</p>
				</span>
				<Link to={`/profile/${id}/edit/change-password`}>Change Password</Link>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<Form
					form={form}
					initialValues={userData}
					onFinish={onFinish}
					layout="vertical">
					<Form.Item
						label="Name"
						name="name"
						rules={[{ required: true, message: "Please enter your name" }]}>
						<Input />
					</Form.Item>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{ required: true, message: "Please enter your email" },
							{ type: "email", message: "Please enter a valid email" },
						]}>
						<Input />
					</Form.Item>
					<Form.Item
						label="Phone"
						name="phone"
						rules={[
							{ required: true, message: "Please enter your phone number" },
						]}>
						<Input />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Update
						</Button>
						<Link to={`/profile/${id}`}>
							<Button type="default" style={{ marginLeft: 8 }}>
								Cancel
							</Button>
						</Link>
					</Form.Item>
				</Form>
				<div className=" w-full flex justify-center items-center">
					<img src={Bicycle} alt="" />
				</div>
			</div>
		</main>
	);
}
