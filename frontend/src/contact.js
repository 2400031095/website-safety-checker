import React, { useState } from "react";
import emailjs from "emailjs-com";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      "service_rkbl4vi",     // your Service ID
      "template_lpvsay7",    // your Template ID
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      "hfZl2ugT9oOU1w4jQ"    // your Public Key
    )
    .then(() => {
      alert("✅ Message sent successfully!");
    })
    .catch((err) => {
      alert("❌ Error sending message: " + err.text);
    });
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#2c3e50" }}>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Name</label>
          <input
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Email</label>
          <input
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Message</label>
          <textarea
            name="message"
            placeholder="Your Message"
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", minHeight: "120px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            background:"#2c3e50",
            color:"#fff",
            padding:"10px 20px",
            border:"none",
            borderRadius:"6px",
            cursor:"pointer",
            width:"100%"
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;