import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const productDetail = () => {

    const [products, setProducts] = useState();
    let [total, setTotal] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [voucher, setVoucher] = useState();
    const [kupon, setKupon] = useState();
    console.log(kupon);
    const router = useRouter();
    const [id, setId] = useState();
    let productId;

    useEffect(()=> {
      if (totalPrice >= 2000000) {
        if (kupon) {
          setVoucher(kupon);
        } else {
          fetch(`http://localhost:5000/voucher?total_price=${totalPrice}&code=${voucher}`)
            .then((response) => response.json())
            .then((data) => {
              setVoucher(data.data.code);
              setKupon(data.data.code);
              setId(data.data.id);
            });
        }
      } else {
        setVoucher("");
      }
    }, [totalPrice])
    
    useEffect(() => {
      if (router.query.id) {
        productId = router.query.id;
        console.log(productId);
  
        fetch(`http://localhost:5000/product/${productId}`)
          .then((response) => response.json())
          .then((data) => {
            setProducts(data.data)
            setTotal(data.total)
            setTotalPrice(data.data.price)
          });
      }
    }, [router.query.id]);

    
    
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

      function handleClickBayar(){
        window.location.href = "/succes";
      }

      function handleClickKembali(){
        window.location.href = "/";
      }

      function handleClickGunakan(){
        fetch(`http://localhost:5000/use?total_price=${totalPrice}&code=${voucher}&id=${id}`)
            .then((response) => response.json())
            .then((data) => {
              setTotalPrice(data.data);
            });
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
               
              </div>
    
              <div className="flex flex-col gap-2 px-3 py-5 bg-gray-200 rounded-lg">
    
                <div className="flex w-full justify-between items-center">
                  <h1 className="text-black text-sm font-medium">Harga</h1>
                  <h1 className="text-black text-sm font-semibold">{formatCurrency(products?.price)}</h1>
                </div>
            
    
               
                <div className="flex w-full justify-between items-center">
                  <h1 className="text-black text-sm font-medium">Total Barang</h1>
                  <h1 className="text-black text-sm font-semibold">{total}</h1>
                </div>
                
    
            
                <div className="flex w-full justify-between items-center">
                  <h1 className="text-black text-sm font-medium">voucher</h1>
                  <h1 className="text-black text-sm font-semibold">{voucher? voucher : "-"}</h1>
                </div>

                {voucher && <div className="flex w-full justify-end items-center">
                  <button 
                  onClick={() => handleClickGunakan()}
                  className="text-black px-4 py-2 bg-green-500 rounded-lg text-sm font-semibold"
                  >Gunakan</button>
                </div>}
               
              </div>

            <div className="flex items-center gap-12 px-3 py-5 justify-center rounded-lg">
            {/* Tombol untuk menambahkan produk */}
            <button
                onClick={() => handleAddProductPlus()}
                className="flex p-2 justify-center items-center bg-green-600 rounded-full text-white font-medium text-2xl text-center "
            ><img src="/plus-icon.svg" className='invert w-7' /></button>

            <button
                onClick={() => handleAddProductMinus()}
                className="flex p-2 justify-center items-center bg-red-600 rounded-full text-white font-medium text-2xl text-center"
            ><img src="/minus-icon.svg" className='invert w-7'/></button>
            </div>
              
              <div className="flex w-full justify-between items-center px-3 py-5 bg-gray-200 rounded-lg">
                <h1 className="text-black text-lg font-medium">Total Harga</h1>
                <h1 className="text-black text-lg font-semibold">{formatCurrency(totalPrice)}</h1>
              </div>

            <div className="flex justify-between gap-2 px-3 py-5 bg-gray-200 rounded-lg">
    
                <div className="flex w-[100px] justify-center items-center bg-green-500 px-4 py-2 rounded-lg">
                  <button
                  onClick={() => handleClickBayar()} 
                  className="text-black text-sm font-medium"
                  >Bayar</button>
                </div>

                <div className="flex w-[100px] justify-center items-center bg-red-500 px-4 py-2 rounded-lg">
                  <button
                  onClick={() => handleClickKembali()} 
                  className="text-black text-sm font-medium"
                  >Kembali</button>
                </div>
              
    
                
               
              </div>
            </div>
          </div>
        </div>
      );
}
 
export default productDetail;