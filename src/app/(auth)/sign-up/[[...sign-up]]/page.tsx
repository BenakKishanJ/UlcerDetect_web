import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="bg-neutral flex items-center justify-center m-12">
      <SignUp />
    </div>
  );
}
