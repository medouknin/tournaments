import React from "react";
import { Form, Button, Select, Upload, Input, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const AddTournament = () => {
	const [form] = Form.useForm(); // Initialize form instance

	const onFinish = async (values) => {
		const formData = new FormData();
		Object.keys(values).forEach((key) => {
			if (key === "photo") {
				if (values[key]?.[0]?.originFileObj) {
					formData.append(key, values[key][0].originFileObj);
				}
			} else {
				formData.append(key, values[key]);
			}
		});

		try {
			await axios.post(
				"http://127.0.0.1:8000/api/tournaments/store",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			message.success("Tournament created successfully");
			form.resetFields(); // Reset form fields
		} catch (error) {
			message.error("Error creating tournament:", error);
		}
	};

	const typeOptions = ["Football", "Basketball", "Tennis"];
	const teamOptions = [4, 8, 16, 32];
	const playerOptions = [1, 2, 5, 8];

	return (
		<div className="flex py-4">
			<div className="w-full">
				<Form
					form={form} // Pass the form instance to the Form component
					name="AddTournamentForm"
					onFinish={onFinish}
					className="grid grid-cols-2 w-full justify-between"
					initialValues={{
						isRented: false,
					}}
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}>
					<Form.Item
						label="Title"
						name="title"
						rules={[
							{
								required: true,
								message: "Please input the title!",
							},
						]}>
						<Input />
					</Form.Item>
					<Form.Item
						label="Description"
						name="description"
						rules={[
							{
								required: true,
								message: "Please input the description!",
							},
						]}>
						<Input.TextArea />
					</Form.Item>
					<Form.Item
						label="Image"
						name="photo"
						valuePropName="fileList"
						getValueFromEvent={(e) => e.fileList}
						rules={[
							{
								required: true,
								message: "Please upload an image!",
							},
						]}>
						<Upload
							name="photo"
							listType="picture"
							accept=".png,.jpeg,.jpg"
							multiple={false}
							beforeUpload={() => false}>
							<Button icon={<UploadOutlined />}>Upload</Button>
						</Upload>
					</Form.Item>
					<Form.Item
						label="Type"
						name="type"
						rules={[
							{
								required: true,
								message: "Please select the type!",
							},
						]}>
						<Select>
							{typeOptions.map((type) => (
								<Option key={type} value={type}>
									{type}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						label="Number of teams"
						name="teams"
						rules={[
							{
								required: true,
								message: "Please select the number of teams!",
							},
						]}>
						<Select>
							{teamOptions.map((option) => (
								<Option key={option} value={option}>
									{option}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						label="Number of players per team"
						name="players"
						rules={[
							{
								required: true,
								message: "Please select the number of players per team!",
							},
						]}>
						<Select>
							{playerOptions.map((option) => (
								<Option key={option} value={option}>
									{option}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						label="Fees"
						name="fees"
						rules={[
							{
								required: true,
								message: "Please input the fees!",
							},
						]}>
						<Input />
					</Form.Item>
					<Form.Item name="isRented" valuePropName="checked" hidden>
						<Input type="hidden" />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit" className="w-full mt-3">
							Add Tournament
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default AddTournament;
