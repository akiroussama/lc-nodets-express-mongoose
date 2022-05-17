import mongoose from "mongoose";

export function connectToDatabase() {
	mongoose
		.connect("mongodb://localhost:27017/wildapi2", {
			autoIndex: true,
		})
		.then(() => {
			console.log("Connected");
		})
		.catch(() => {
			console.log("Not connected");
		});
}
