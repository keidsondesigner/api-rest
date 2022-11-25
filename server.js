import app from "./app";

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log("Server exucutando na porta http://localhost:5000")
})