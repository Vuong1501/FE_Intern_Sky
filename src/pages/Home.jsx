function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: 40 }}>
      <h1>🏠 Home</h1>

      {user ? (
        <>
          <p>
            Xin chào: <b>{user.email}</b>
          </p>
          <p>Role: {user.role}</p>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/invite";
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <p>Chưa đăng nhập</p>
      )}
    </div>
  );
}

export default Home;
