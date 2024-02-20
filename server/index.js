const asteriskAmi = require("asterisk-ami");

// Asterisk Manager Connection Settings
const amiConfig = {
  username: "test1",
  password: "12345",
  host: "192.168.55.227",
  port: 5038,
  reconnect: true,
};

// Create an instance of the Asterisk Manager
const ami = new asteriskAmi(amiConfig);

ami.on("ami_data", function (data) {
  console.log("AMI DATA: ", data);
});

// Event listener for successful AMI connection
ami.on("connect", () => {
  console.log("Connected to Asterisk AMI");

  // Action to add a new SIP user
});

// Event listener for AMI disconnection
ami.on("disconnect", (error) => {
  console.log("Disconnected from Asterisk AMI:", error);
});

// Error handler for Asterisk Manager connection
ami.on("error", (error) => {
  console.error("Error connecting to Asterisk AMI:", error);
});

// Connect to Asterisk AMI
ami.connect(function (response) {
  console.log("Connected to AMI");
  setInterval(function () {
    ami.send({ action: "Ping" });
  }, 2000);
});

process.on("SIGINT", function () {
  ami.disconnect();
  process.exit(0);
});