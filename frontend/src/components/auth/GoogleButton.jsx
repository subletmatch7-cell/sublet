import { useEffect, useRef, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function GoogleLoginButton() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const initializeGoogle = () => {
      if (!window.google || !buttonRef.current) return;

      // Prevent duplicate button rendering (important in StrictMode)
      if (buttonRef.current.hasChildNodes()) return;

      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        width: "100%"
      });
    };

    // Load script only if not already loaded
    if (!window.google) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogle;
      document.body.appendChild(script);
    } else {
      initializeGoogle();
    }

    // 🚫 DO NOT remove script in cleanup
  }, []);

  const handleCredentialResponse = async (response) => {
    setIsLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/google", {
        credential: response.credential
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);

      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (res.data.user.role === "lister") {
        navigate("/lister/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to sign in with Google. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-600 text-sm">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="w-full py-3 flex justify-center">
          Signing in with Google...
        </div>
      ) : (
        <div ref={buttonRef} className="w-full flex justify-center" />
      )}
    </div>
  );
}