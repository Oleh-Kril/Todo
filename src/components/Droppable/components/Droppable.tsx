import React from 'react'
import {useDroppable} from '@dnd-kit/core'

export default function Droppable({children, id, ...props}: any) {
    const {isOver, setNodeRef} = useDroppable({id})

    return (
        <div ref={setNodeRef} {...props}>
            {children}
        </div>
    )
}
