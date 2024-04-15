import style from '@/modules/auth/styles/auth.module.css'

export default function LoginLayout({
    children
}: Readonly<{children: React.ReactNode}>) {
    
    
    return (
        <main className={`h-[calc(100vh)] flex justify-center items-center ${style.body}`}>
           {children} 
        </main>
    )
}