import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const productDetail = () => {

    const [products, setProducts] = useState();
    const [use, setUse]= useState("Gunakan");
    const [id, setId] = useState();
    let [total, setTotal] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [active, setActive]= useState(false);
    const [voucher, setVoucher] = useState();
    const router = useRouter();
    const token = Cookies.get("token");
    let productId;

    const fetchVoucher= async() => {
      const authorization = Cookies.get("token");
      const id = Cookies.get("user_id");
      if(authorization){
        axios.defaults.headers.common["authorization"] = Cookies.get("token");
        const response = await axios.get("http://localhost:5000/api/voucher");
        setVoucher(response.data.data);
      } else if(id){
        axios.defaults.headers.common["user_id"] = Cookies.get("user_id");
        const response = await axios.get("http://localhost:5000/api/voucher");
        setVoucher(response.data.data);
      } else {
        const response = await axios.get("http://localhost:5000/api/voucher");
        Cookies.set("user_id", response.data.id, {
          expires: 1
        });
        setVoucher(response.data.data);
      }
    }
  
    useEffect(()=> {
      fetchVoucher();
    }, [])
    
    const fetchProduct = async () => {
      if (router.query.id) {
        productId = router.query.id;
        console.log(productId);
        const response = await axios.get(`http://localhost:5000/api/product/${productId}`);
        setProducts(response.data.data)
        setTotal(response.data.total)
        setTotalPrice(response.data.data.price)
        setId(response.data.data.id)
      }
    }
    
    useEffect(() => {
      fetchProduct();
    }, [router.query.id]);

    useEffect(()=> {
      if(totalPrice >= 2000000){
        setActive(true)
      } else {
        setActive(false)
      }
    }, [totalPrice])
    
      function formatCurrency(number) {
        const formatter = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        });
    
        return formatter.format(number);
      }
    
      function handleAddProductPlus(product) {
        total += 1
        setTotal(total);
        setTotalPrice(products.price * total);
      }

      function handleAddProductMinus(product) {
        if(total > 1 ){
          total -= 1
          setTotal(total)
          setTotalPrice(products.price * total);
        };
      }

      async function handleClickBayar(){
        if (!token) {
          toast.error("anda harus login");
          router.push("/login");
        } else {
        axios.defaults.headers.common["authorization"] = token;
        await axios.post("http://localhost:5000/api/product/buy", {total_price:totalPrice, id})
        router.push("/succes")
        }
      }

      function handleClickKembali(){
        window.location.href = "/";
      }

      async function handleClickGunakan(){
        try {
          const response = await axios.get(`http://localhost:5000/api/use?total_price=${totalPrice}&code=${voucher.code}`);
          if (response.status === 200) {
            setTotalPrice(response.data.data);
            setUse("Voucher telah Digunakan");
          } else {
            setUse(response.data.message);
          }
        } catch (error) {
          setUse("Voucher invalid");
        }
      }
    return (
        <div className="relative h-screen bg-primary lg:bg-zinc-200 flex flex-col items-center font-quickSand">
          <div className="flex lg:fixed flex-col justify-center items-center gap-3 bottom-0 lg:top-[5%] bg-white lg:bg-white w-full lg:w-1/3 h-full lg:h-fit px-5 lg:px-4 lg:py-5 lg:rounded-xl">
            <div className="flex flex-col gap-3 w-full ">
              <div className="flex flex-col gap-2 px-3 py-5 bg-gray-200 rounded-lg">
    
                <div className="flex w-full justify-between items-center">
                  <h1 className="text-black text-sm font-medium">Nama Produk</h1>
                  <h1 className="text-black text-sm font-semibold">{products?.name}</h1>
                </div>
              
    
                
                <div className="flex w-full justify-between items-center">
                  <h1 className="text-black text-sm font-medium">Metode Pembayaran</h1>
                  <h1 className="text-black text-sm font-semibold">Gopay</h1>
                </div>

                <div className="flex w-full justify-between items-center">
                  <h1 className="text-black text-sm font-medium">Harga</h1>
                  <h1 className="text-black text-sm font-semibold">{formatCurrency(products?.price)}</h1>
                </div>
            
    
               
                <div className="flex w-full justify-between items-center">
                  <h1 className="text-black text-sm font-medium">Total Barang</h1>
                  <h1 className="text-black text-sm font-semibold">{total}</h1>
                </div>
               
              </div>

            <div className="bg-gradient-to-r from-primary to-teal-500 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-white text-sm font-medium">Diskon Rp 10K</h1>
                {active ? (
                  use === "Gunakan" ? (
                    <button
                      onClick={handleClickGunakan}
                      className="text-primary bg-white inline-block px-4 py-2 rounded-full text-sm font-semibold"
                    >{use}</button>
                    ) : (
                    <h1 className="text-white text-sm font-semibold">{use}</h1>
                  )
                ) : (
                  <h1 className="text-white text-sm font-medium">Tidak Memenuhi Syarat</h1>
                )}
              </div>
              <div className="border-t border-white pt-2">
                <p className="text-white text-sm font-medium">code: {voucher?.code}</p>
                <p className="text-white text-sm font-medium">Berlaku sampai: {voucher?.exp.split("T")[0]}</p>
              </div>
              <p className="text-white text-xs mt-4">
                Minimal pembelian <span className="text-lg font-semibold">Rp 2.000.000</span>
              </p>
            </div>

            <div className="flex items-center gap-12 px-2 py-2 justify-center rounded-lg">
            {/* Tombol untuk menambahkan produk */}
            <button
                onClick={() => handleAddProductPlus()}
                className="flex p-2 justify-center items-center bg-primary rounded-full text-secondary font-medium text-2xl text-center "
            ><img src="/plus-icon.svg" className='w-7'/></button>

            <button
                onClick={() => handleAddProductMinus()}
                className="flex p-2 justify-center items-center bg-primary rounded-full text-secondary font-medium text-2xl text-center"
            ><img src="/minus-icon.svg" className='w-7'/></button>
            </div>
              
              <div className="flex w-full justify-between items-center px-3 py-5 bg-gray-200 rounded-lg">
                <h1 className="text-black text-lg font-medium">Total Harga</h1>
                <h1 className="text-black text-lg font-semibold">{formatCurrency(totalPrice)}</h1>
              </div>

            <div className="flex justify-between gap-2 px-3 py-5 bg-gray-200 rounded-lg">
    
                <button  onClick={() => handleClickBayar()} 
                 className="flex w-[100px] justify-center items-center bg-primary px-4 py-2 rounded-lg">
                  <div
                  className="text-secondary text-sm font-bold"
                  >Bayar</div>
                </button>

                <button  onClick={() => handleClickKembali()} 
                 className="flex w-[100px] justify-center items-center bg-primary px-4 py-2 rounded-lg">
                  <div
                  className="text-secondary text-sm font-bold"
                  >Kembali</div>
                </button>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      );
}
 
export default productDetail;