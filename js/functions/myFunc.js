function getValue(id) {
	return document.getElementById(id).value;
}
// Generate id

// Random Id Generate
const seedId = () => {
	return Math.floor((Math.random()) * 0x1000000).toString(16);
}
const generateId = () => {
	return seedId() + "-" + seedId() + "-" + seedId();
}