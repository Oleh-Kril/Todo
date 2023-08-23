import React from 'react'
import {useDroppable} from '@dnd-kit/core'

export default function Droppable({children, id, ...props}: any) {
    const {isOver, setNodeRef} = useDroppable({id})
    const style = {
        color: isOver ? 'green' : undefined,
    }

    return (
        <div ref={setNodeRef} style={style} {...props}>
            {children}
        </div>
    )
}
