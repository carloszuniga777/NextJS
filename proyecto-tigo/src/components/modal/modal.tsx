import { useEffect } from "react"

export function Modal({isOpen, onClose, children}:{
    isOpen: boolean,
    onClose: ()=> void,
    children: React.ReactNode
}){

    useEffect(() => {
        const handlerKeyDown=(event:KeyboardEvent)=>{
                if(event.key === "Escape"){
                    onClose()
                }
        }

        window.addEventListener("keydown", handlerKeyDown)
    }, [onClose])


    if(!isOpen) return null

    
    return <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
            <div className="bg-white p-5 rounded-md shadow-lg max-w-sw md:max-w-md mx-auto transition-transform duration-300 transform-gpu">
                <button onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    </>
}