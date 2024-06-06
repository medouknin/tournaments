import React from "react";
import { Form, Input, Button, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addBike } from "../storage/bikesSlice";

const { Option } = Select;

const AddBike = () => {
	const dispatch = useDispatch();
	const [form] = Form.useForm(); 

	const onFinish = (values) => {
		const formData = new FormData();
		Object.keys(values).forEach((key) => {
			if (key === "image") {
				if (values[key]?.[0]?.originFileObj) {
					formData.append(key, values[key][0].originFileObj);
				}
			} else {
				formData.append(key, values[key]);
			}
		});

		dispatch(addBike(formData));
		form.resetFields(); 
	};

	const normFile = (e) => {
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList && e.fileList.length > 0 ? [e.fileList[0]] : [];
	};


	const materialOptions = ["Morning", "Afternoon", "Night"];
	const brandOptions = [
		"Football",
		"Tenis",
		"BasketBall",
		
	];
	const typeOptions = [
		"Friendly",
		"Awarded",
	
	];
	const sizeOptions = [""];

	return (
		<div className="flex py-4">
			<div className="w-full">
				<Form
					name="addBikeForm"
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
						label="Tournament"
						name="brand"
						rules={[
							{
								required: true,
								message: "Please input the tournament !",
							},
						]}>
						<Input/>
					</Form.Item>
					<Form.Item
						label="Type of Tournament"
						name="type"
						rules={[
							{
								required: true,
								message: "Please input the type of tournament!",
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
						label="Number of players"
						name="size"
						rules={[
							{
								required: true,
								message: "Please input the number of players!",
							},
						]}>
						<Input/>
					</Form.Item>
					<Form.Item
						label="Mode"
						name="material"
						rules={[
							{
								required: true,
								message: "Please select the mode of tournament!",
							},
						]}>
						<Select>
							{materialOptions.map((material) => (
								<Option key={material} value={material}>
									{material}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						label="Inscription fee"
						name="price_per_hour"
						rules={[
							{
								required: true,
								message: "Please input inscription free!",
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
								message: "Please input the description of bike!",
							},
						]}>
						<Input.TextArea />
					</Form.Item>
					<Form.Item
						name="image"
						label="Image"
						valuePropName="fileList"
						getValueFromEvent={normFile}
						rules={[
							{
								required: true,
								message: "Please upload an image of the tournament!",
							},
						]}>
						<Upload
							name="image"
							listType="picture"
							accept=".png,.jpeg,.jpg"
							multiple={false}
							beforeUpload={() => false}>
							<Button icon={<UploadOutlined />}>Upload</Button>
						</Upload>
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

export default AddBike;
