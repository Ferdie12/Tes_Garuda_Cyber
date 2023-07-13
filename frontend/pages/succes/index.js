import { Fragment } from 'react';
import Navbar from '../../components/navbar';

const Succes = () => {
    function handleClickKembali(){
        window.location.href = "/";
      }

    return <Fragment className="h-screen flex justify-center items-center"><Navbar />
        <div className="flex flex-col gap-5 justify-center items-center">
            <img src="/success-ilustration.svg" className="w-1/4"/>
            <button onClick={() => handleClickKembali()} className="px-4 py-2 bg-gray-300 rounded-full hover:text-cyan-500 hover:font-bold">Kembali</button>
        </div>
    </Fragment>;
}
 
export default Succes;