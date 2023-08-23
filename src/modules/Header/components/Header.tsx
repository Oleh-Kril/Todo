export default function Header() {
    return(
        <div className={"bg-orange-400 h-16 p-2 flex justify-center items-center"}>
            <span className={"text-white text-xl font-bold mr-2"}>My Todo</span>
            <img src='/icons/arrow-up-right-from-square.svg'
                 alt='logo'
                 className={"w-5 h-5 invert"}/>
        </div>
    )
}
