import "./ErrorPage.css";
import ErrorImg from "../../assets/ErrorImg.png";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-container">
        <img className="errorImg" src={ErrorImg} alt="loginImage" />
        <p className="errorMsg">Wrong Page</p>

        <Button
          className="retry-button"
          type="primary"
          size="large"
          onClick={() => navigate("/")}
        >
          Return Home
        </Button>
      </div>
    </div>
  );
}
