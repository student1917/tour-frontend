import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "reactstrap";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";

export default function OtpPopup({ show, onClose, email }) {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleVerifyOtp = async () => {
    try {
      const res = await fetch(`${BASE_URL}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (data.success) {
        dispatch({ type: "REGISTER_SUCCESS" });
        alert("Email verified! You can login now.");
        onClose();
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Error verifying OTP");
    }
  };

  return (
    <Modal isOpen={show} toggle={onClose} centered>
      <ModalHeader toggle={onClose}>Enter OTP</ModalHeader>
      <ModalBody>
        <Input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleVerifyOtp}>
          Verify
        </Button>
      </ModalFooter>
    </Modal>
  );
}
