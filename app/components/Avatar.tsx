import Image from "next/image";
import avatar from "../../public/images/placeholder.png";

function Avatar() {
  return (
    <Image
      className="rounded-full"
      src={avatar}
      width="30"
      height="30"
      alt="Avatar"
    />
  );
}

export default Avatar;
