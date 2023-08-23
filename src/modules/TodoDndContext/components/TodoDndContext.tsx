import {DndContext, PointerSensor, useSensor, useSensors} from "@dnd-kit/core"
import ITodo from "../../../interfaces/ITodo"
import {moveToAnotherDayRequest} from "../../../components/Todo"
import {useAtom} from "jotai/index"
import {todosAtom} from "../../../store/atoms/todosAtom"

export default function TodoDndContext({children, ...props}: any) {
    const [todos, setTodos] = useAtom(todosAtom)


    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 4,
            },
        })
    )

    return(
        <DndContext onDragEnd={onMovingTodoToAnotherDay} sensors={sensors} {...props}>
            {children}
        </DndContext>
    )

    async function onMovingTodoToAnotherDay(event: any) {
        const dayToMoveTo = event?.over?.id || null
        const todoId = event.active.id
        if(dayToMoveTo){
            const currentTodo = todos.find(todo => todo.id === todoId) as ITodo
            setTodos(prev => (prev.map(todo => todo.id === todoId ? {...todo, date: dayToMoveTo} : todo)))

            const result = await moveToAnotherDayRequest(todoId, dayToMoveTo)
            if(result === null) setTodos(prev => (prev.map(todo => todo.id === todoId ? currentTodo : todo)))
        }
    }
}
