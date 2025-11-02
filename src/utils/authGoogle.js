import { BASE_URL } from "./config";

export const handleGoogleAuth = async (credential, dispatch, navigate) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",  
      body: JSON.stringify({ credential }),
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.message);
      return;
    }

    const user = {
      ...result.data,
      _id: result.data.id, 
    };

    dispatch({ type: "LOGIN_SUCCESS", payload: user });
    navigate("/");
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    console.error("Google Login Error:", err.message);
  }
};
