import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-slate-100 py-5">
      <div className="container mx-auto px-4">
        <ul className="flex justify-between items-center">
          <li>
            <Link href="https://wa.me/085278145715" target='blank'>
              <button className="text-cyan-500 text-sm font-bold font-sans sm:text-3xl">Ferdie Maulana</button>
            </Link>
          </li>
          <li>
            <Link href="https://github.com/Ferdie12" target='blank'>
              <button className="text-cyan-500 text-sm font-bold font-sans sm:text-3xl">Github</button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
