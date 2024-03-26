'use client'

//sniper: rafc
import React from 'react'
import { SimpleWidget } from './SimpleWidget';
import { useAppSelector } from '@/store';
import { IoCartOutline } from "react-icons/io5";

export const WidgetsGrid = () => {
   const cantidadCarrito = useAppSelector(state => state.counter.count)

  return (
    <div className="flex flex-wrap p-2 justify-center">
        <SimpleWidget 
            label='Contador' 
            title={`${cantidadCarrito}`} 
            icon={<IoCartOutline size={50} className="text-blue-600"/>}
            subTitle='Productos agregados'
            href='/dashboard/counter'
        />
    </div>
  )
}
