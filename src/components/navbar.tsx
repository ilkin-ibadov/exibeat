import Link from "next/link"
import Image from "next/image";

const Navbar = () => {
    return (
        <div className="w-full bg-black">
            <Link className="w-fit flex items-center gap-1 px-6 py-5 bg-[#273AF4]" href="/">
                    <Image
                    src="/logo.svg"
                    alt="Exibeat logo"
                    width={14}
                    height={13}
                    priority
                />
                <h2 className="font-grotesk font-bold text-white leading-6">Exibeat</h2>
            </Link>
        </div>
    )
}

export default Navbar