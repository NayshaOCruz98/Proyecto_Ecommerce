import Register from "../../components/register/register";
import "../../styles/global.css";

export default function DetallePage() {
  return (
    <Register
      onSubmit={function (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        profileImage: File | null
      ): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
}
