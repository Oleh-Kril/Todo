import ITodo from "../../../interfaces/ITodo"
import Todo, {createNewTodoRequest} from "../../../components/Todo"
import Droppable from "../../../components/Droppable"
import formatDateToString from "../../../utils/dateUtils"
import {ToDoStateEnum} from "../../../enums/ToDoStateEnum"
import {useAtom} from "jotai"
import {todosAtom} from "../../../store/atoms/todosAtom"

type Props = {
    todos: ITodo[],
    day: Date,
    className?: string
}


export default function TodoDayGroup({todos, day, className}: Props) {
    const [globalTodos, setGlobalTodos] = useAtom(todosAtom)

    return(
        <div className={"bg-neutral-100 w-2/12 h-1/2" + " " + className}>
            <p className={"text-xl font-bold hover:cursor-pointer hover:bg-blue-200"}
               onClick={onTodoCreateClick}>
                {day.toDateString()}
            </p>
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
