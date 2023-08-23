import {MouseEventHandler} from "react"

type Props = {
    onClick: MouseEventHandler<HTMLElement>
    iconName: string
}
export default function TodoActionIcon({onClick, iconName, ...props}: Props){
    return(
        <div className={"hidden group-hover:block absolute right-0 top-0 hover:bg-orange-300 p-2"}
             onClick={onClick}
             {...props}>
            <img src={'/icons/' + iconName}
                 alt='pencil'
                 width={14}
                 height={14}/>
        </div>
    )
}
