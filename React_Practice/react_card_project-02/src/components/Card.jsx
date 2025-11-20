import React from 'react'
import {HeartIcon,ShoppingCart} from 'lucide-react';

const Card = (props) => {
    return (
        <>
            <div className="w-[260px] bg-white rounded-3xl shadow-xl p-3">
                <div className="relative bg-gray-100 rounded-2xl p-4 flex items-center justify-center">
                    <img src={props.productImage} alt="Air Force 1" className="w-56 h-32 object-contain" />
                    <button className="absolute top-3 right-3 bg-white shadow-md p-2 rounded-full"><HeartIcon /></button>
                </div>
                <div className="bg-black text-white p-4 rounded-2xl mt-4">
                    <h2 className="text-[17px] font-medium truncate">
                        {props.brandName}
                    </h2>
                    <p className="text-gray-300 text-sm mb-3">{props.brandName}</p>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold">{props.price}</span>
                        <button className="bg-white text-black p-3 rounded-2xl shadow-lg"><ShoppingCart /></button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Card