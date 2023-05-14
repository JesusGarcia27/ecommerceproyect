import React from 'react'
import { dateFormat } from '../../utils/date'

const PurchaseCard = ({purchase}) => {
  return (
    <article className='grid grid-cols-2 items-center gap-2 text-sm sm:text-base mx-4'>
        <section className='flex gap-2'>
            <div className='h-[50px] sm:h-[80px] aspect-square '>
                <img className='h-full w-full object-contain' loading='lazy' src={purchase.product.images[2].url} alt="" />
            </div>
            <h4 className=' font-semibold grid justify-center items-center'>{purchase.product.title} </h4>
        </section>

        <section className='grid text-end gap-3 sm:grid-cols-3'>
            <span className='text-gray-400/70'>{dateFormat(purchase.createdAt)} </span>
            <div >
                <span className='p-2 border-[1px] border-gray-400/70 rounded-lg hover:shadow-md hover:shadow-blue-400 hover:bg-blue-600 hover:text-white cursor-alias font-bold'>{purchase.quantity} </span>
            </div>
            <h4 className='font-bold'>{(purchase.quantity * purchase.product.price).toFixed(2)} </h4>
        </section>  
    </article>
  )
}

export default PurchaseCard