import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link , useParams } from "react-router-dom";
import ChangePass from "../assets/changePass.png";
import { TbPasswordUser } from "react-icons/tb";
import Cookies from 'js-cookie'
import axios from "axios";

export default function ChangePassword() {
    const { id } = useParams();
    const decodedId = JSON.parse(atob(id));
    const [form] = Form.useForm();
    const token = Cookies.get('userToken');
    const me = async () => {
        try {
            const response = await axios.get(
							`http://127.0.0.1:8000/api/auth/user`,
							{
								headers: {
									Authorization: `Bearer ${token}`,
									"Content-Type": "application/json",
								},
							}
						);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };
    console.log(me);
        

	const onFinish = (values) => {
		console.log("Received values:", values);

		message.success("Password updated successfully!");
	};

	return (
		<main className=" pt-4 px-10 bg-white">
			<div className=" flex justify-between items-center">
				<span className=" flex text-4xl items-center gap-3">
					<TbPasswordUser className=" text-blue-500" />
					<p className="pt-4">Change Password</p>
				</span>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<Form form={form} onFinish={onFinish} layout="vertical">
					<Form.Item
						label="Old Password"
						name="old_password"
						rules={[
							{ required: true, message: "Please enter your old password" },
						]}>
						<Input.Password />
					</Form.Item>
					<Form.Item
						label="New Password"
						name="password"
						rules={[
							{ required: true, message: "Please enter your new password" },
							{ min: 8, message: "Password must be at least 8 characters" },
						]}>
						<Input.Password />
					</Form.Item>
					<Form.Item
						label="Confirm New Password"
						name="password_confirmation"
						dependencies={["newPassword"]}
						rules={[
							{ required: true, message: "Please confirm your new password" },
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("newPassword") === value) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error("The two passwords do not match")
									);
								},
							}),
						]}>
						<Input.Password />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Update Password
						</Button>
						<Link to={`/profile/${id}`}>
							<Button type="default" style={{ marginLeft: 8 }}>
								Cancel
							</Button>
						</Link>
					</Form.Item>
				</Form>
				<div className=" w-full flex justify-center items-center">
					<img src={ChangePass} alt="Change Password" />
				</div>
			</div>
		</main>
	);
}
