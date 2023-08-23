import {MouseEventHandler} from "react"
import {twMerge} from "tailwind-merge"

type Props = {
    iconName: string
    onClick?: MouseEventHandler<HTMLElement>
    className?: string
}
export default function TodoActionIcon({onClick, iconName, className, ...props}: Props){
    return(
        <div className={twMerge("hidden group-hover:block absolute right-0 top-0 hover:bg-orange-300 p-2", className)}
             onClick={onClick}
             {...props}>
            <img src={'/icons/' + iconName}
                 alt='pencil'
                 width={14}
                 height={14}/>
        </div>
    )
}
