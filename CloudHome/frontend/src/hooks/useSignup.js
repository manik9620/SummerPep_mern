const useSignup = () => {
  const signup = async ({ email, password }) => {
    try {
      const res = await fetch(process.env.BACKEND_URL, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "content-type": "application/json",
        },
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      alert("Signup Error" + error.message);
    }
  };
  return { signup };
};
export default useSignup;
