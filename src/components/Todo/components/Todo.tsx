import ITodo from "../../../interfaces/ITodo"
import {ToDoStateEnum} from "../../../enums/ToDoStateEnum"
import changeStateRequest from "../helpers/changeStateRequest"
import updateTodoTextRequest from "../helpers/updateTodoTextRequest"
import deleteTodoRequest from "../helpers/deleteTodoRequest"
import {useState, useRef} from "react"
import {useAtom} from "jotai"
import {todosAtom} from "../../../store/atoms/todosAtom"
import Draggable from "../../Draggable"
import TodoActionIcon from "../../TodoActionIcon"

type Props = {
    todo: ITodo
}

export default function Todo({todo}: Props) {
    const [todos, setTodos] = useAtom(todosAtom)

    const [isInEditState, setIsInEditState] = useState(false)
    const textInputRef = useRef<HTMLInputElement>(null)

    return(
        <Draggable id={todo.id}>
            <div onClick={onTodoClick}
                 className={"group p-2 hover:bg-orange-200 relative border-b-2 border-orange-200"}
            >
                {isInEditState ?
                    <input type='text'
                           defaultValue={todo.text}
                           ref={textInputRef}
                           onKeyPress={onSaveTodoTextKeyPress}
                           onClick={e => e.stopPropagation()}/>
                    :
                    <p className={`${todo.state == ToDoStateEnum.Done && "line-through"} hover:cursor-pointer`}>
                        {todo.text}
                    </p>
                }
                {todo.state == ToDoStateEnum.Todo ?
                   <TodoActionIcon onClick={onEditTodoClick} iconName={"pencil.svg"}/>
                    :
                    <TodoActionIcon onClick={onDeleteTodoClick} iconName={"trash.svg"}/>
                }
            </div>
        </Draggable>
    )

    async function onTodoClick() {
        const result = await changeStateRequest(todo)
        if(result) setTodos(prev => prev.map(t => t.id === todo.id ? result : t))
    }

    async function onEditTodoClick(event: React.MouseEvent<HTMLElement>) {
        event.stopPropagation()
        setIsInEditState(true)
    }

    async function  onDeleteTodoClick(event: React.MouseEvent<HTMLElement>) {
        event.stopPropagation()
        const isDeleted = await deleteTodoRequest(todo.id)
        if(isDeleted) {
            setTodos(prev => prev.filter(t => t.id != todo.id))
        }
    }

    async function onSaveTodoTextKeyPress(event: React.KeyboardEvent<HTMLElement>){
        if(event.key === 'Return' || event.key === 'NumpadEnter' || event.key === 'Enter'){
            const newText = textInputRef?.current?.value
            if(newText){
                const result = await updateTodoTextRequest(todo.id, newText)
                if(result) setTodos(prev => prev.map(t => t.id === todo.id ? result : t))
            }else{
                console.error("Smth wrong with the input !")
            }
            setIsInEditState(false)
        }
    }

}
