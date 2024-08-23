import React from 'react'
import {Heading} from '../../LogicList/index'
import {Loading} from '../../Feedback/index'
import useOrders from './useOrders'
import Dialog from '@mui/material/Dialog';



const OrdersRender = () => {
  const {
    loading,
    error,
    orderList,
    open,
    selectedProduct,
    viewDetailsDialog,
    closeDialogHandler,
  } = useOrders();
  
  
  
  return (
    <section>
    
    <Dialog
       sx={{".MuiPaper-root": {background: "#181818", borderRadius: "15px"}}}
        open={open}
        onClose={closeDialogHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <div className="bg-[#181818] text-white rounded-lg px-10 py-5 text-center ">
        <span className="flex flex-end hover:text-red-600" onClick={closeDialogHandler}>
        X
        </span>
        
         <h2 className="pb-2">Product Detailis</h2>
         
         <div className="">
         {
           selectedProduct.map((item) => (
             <div key={item.id} className="flex items-center gap-3 pt-3 pb-3 border-b-[1px] border-b-[#222]">
              
              <div className="w-[80px] shadow-2xl">
                <img className="w-[100%] rounded-lg" src={item.img} alt="" />
              </div>
              
              <div className="text-start">
                <h3 className="text-[14px]">{item.title}</h3>
                
                <h4 className="text-[10px]">Quantity -
                {" "}{item.quantity}
                </h4>
                <h4 className="text-[12px] text-blue-500">Price - {" "} ${item.quantity * item.price}</h4>
              </div>
             </div>
           ))
         }
         </div>
          
        </div>
      
      </Dialog>
    
    <Heading title="My Orders" />
    <Loading status={loading} error={error} type="category">
    
    <div className=" flex flex-col items-center overflow-hidden ">
      <div className="table_body w-[95%] overflow-auto ">
        <table className="w-[100%] border-2 border-[#22]">
        
          <thead className="border-2 border-[#22] text-[15px] ">
            <tr>
              <th>Order Number</th>
              <th>Items</th>
              <th>Total Price</th>
        
            </tr>
          </thead>
          
          <tbody className="text-center text-[12px] ">
            {
              orderList.map((item) => (
                <tr className="border-2 border-[#22]" key={item.id}>
                  <td># {item.id}</td>
                  <td>{item.items.length} item 
                    <span className="text-blue-400 border-b-[1px] border-b-blue-400 cursor-pointer"
                    onClick={() => viewDetailsDialog(item.id)}
                    >
                    
                    {`/Product Details`}
                    </span>
                  </td>
                  <td>${item.subtotal.toFixed(2)}</td>
                  
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
    </Loading>
    
    </section>
  )
}

export default OrdersRender