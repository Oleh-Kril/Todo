import ITodo from "../../../interfaces/ITodo"
import Todo, {createNewTodoRequest} from "../../../components/Todo"
import Droppable from "../../../components/Droppable"
import formatDateToString from "../../../utils/dateUtils"
import {ToDoStateEnum} from "../../../enums/ToDoStateEnum"
import {useAtom} from "jotai"
import {todosAtom} from "../../../store/atoms/todosAtom"
import TodoActionIcon from "../../../components/TodoActionIcon"
import {twMerge} from "tailwind-merge"

type Props = {
    todos: ITodo[],
    day: Date,
    className?: string
}


export default function TodoDayGroup({todos, day, className}: Props) {
    const [globalTodos, setGlobalTodos] = useAtom(todosAtom)

    return(
        <div className={twMerge("bg-neutral-100 w-1/12 h-1/2 min-w-[250px]", className)}>
            <div className={"text-xl font-bold hover:cursor-pointer hover:bg-blue-200 group relative text-center p-2"}
               onClick={onTodoCreateClick}>
                {day.toDateString()}
                <TodoActionIcon iconName={"plus.svg"} className={"top-1.5 right-1.5 hover:bg-blue-200"}/>
            </div>
            <Droppable id={formatDateToString(day.toISOString())}
                       className={"h-full"}>
                {todos.map(todo => <Todo todo={todo}
                                                key={todo.id}/>)}
            </Droppable>
        </div>
    )

    async function onTodoCreateClick(){
        const newTodo : ITodo = {
            id: "",
            text: "New TODO",
            date: formatDateToString(day.toISOString()),
            orderNumber: 4,
            state: ToDoStateEnum.Todo
        }
        const result = await createNewTodoRequest(newTodo)
        if(result) setGlobalTodos((prev: ITodo[]) => [...prev, result])
    }
}
