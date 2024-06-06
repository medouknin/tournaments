import React from "react";
import { Link } from "react-router-dom";
import { Button, Result } from "antd";

export default function NotFound() {
	return (
		<main className="container flex items-center justify-center ">
			<Result
				status="404"
				title="404"
				subTitle="Sorry, the page you visited does not exist."
				extra={
					<Link to={'/home'}
					className=" no-underline">
						<Button type="primary">Back Home</Button>
					</Link>
				}
			/>
		</main>
	);
}
