import { useState, useContext } from "react";
import axios from "axios";
import { RecoveryContext } from "../../../App";
import { useNavigate } from "react-router-dom";

export default function SendOTPForm() {
  const { setEmail, setOTP, setPage } = useContext(RecoveryContext);
  const [emailInput, setEmailInput] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = () => {
    if (!emailInput) {
      alert("Por favor, introduce tu email");
      return;
    }

    const OTP = Math.floor(Math.random() * 9000 + 1000);
    console.log("Generated OTP:", OTP);
    setOTP(OTP);
    setEmail(emailInput);

    axios.post("http://localhost:3010/send_recovery_email", {
      OTP,
      recipient_email: emailInput,
    })
      .then((response) => {
        console.log("Email sent successfully:", response.data);
        setPage("otp");
        navigate("/otp");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        console.log("Response data:", error.response ? error.response.data : "No response data");
      });
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Recuperación de Contraseña</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>Introduce tu correo electrónico para recibir un OTP</p>
            </div>
          </div>

          <div>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSendOTP();
            }}>
              <div className="flex flex-col space-y-6">
                <div className="w-full">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Introduce tu correo electrónico"
                    required
                  />
                </div>
                <div className="w-full">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Enviar OTP
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
