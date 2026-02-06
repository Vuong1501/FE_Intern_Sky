import { useEffect } from "react";

function InviteAccept() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // redirect sang BE Zoho kèm token
      window.location.href = `http://localhost:3000/auth/zoho?token=${token}`;
    }
  }, []);

  return <div>Redirecting to Zoho...</div>;
}

export default InviteAccept;
