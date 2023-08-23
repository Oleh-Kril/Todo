import ITodo from "../../../interfaces/ITodo"
import {useEffect} from "react"
import TodoDayGroup from "../../../modules/TodoDayGroup"
import {useAtom} from "jotai"
import {todosAtom} from "../../../store/atoms/todosAtom"
import formatDateToString from "../../../utils/dateUtils"
import TodoDndContext from "../../../modules/TodoDndContext"
import {getAllTodosAsync} from "../../../components/Todo"

export default function Home() {
    let initialTodoDayGroups: string[] = getInitialTodoDayGroups()

    const [todos, setTodos] = useAtom(todosAtom)
    const todosGroupedByDate = todos.reduce((acc, todo: ITodo) => {
        const dateKey = formatDateToString(todo.date)
        if (!acc[dateKey]) {
            acc[dateKey] = []
        }
        acc[dateKey].push(todo)
        return acc
    }, {} as Record<string, ITodo[]>)

    useEffect(() => {
        setTimeout(async () => {
            const fetchedTodos = await getAllTodosAsync()

            if(fetchedTodos){
                setTodos(fetchedTodos)
            }
        },0)
    }, [])

    return(
        <TodoDndContext>
                <div className={"flex flex-wrap overflow-x-scroll gap-2 mt-12 h-screen w-auto justify-center"}>
                    {initialTodoDayGroups.map((date: string, idx) => (
                        <TodoDayGroup key = {date}
                                      className={idx === 0 ? "bg-neutral-200" : ""}
                                      day = {new Date(date)}
                                      todos = {todosGroupedByDate[date] || []}/>
                    ))}
                </div>
        </TodoDndContext>
    )

    function getInitialTodoDayGroups(): string[]{
        const dates: string[] = []

        const todayDate = new Date()
        const yesterdayDate = new Date()
        yesterdayDate.setDate(todayDate.getDate() - 1)

        dates.push(formatDateToString(yesterdayDate.toISOString()))
        dates.push(formatDateToString(todayDate.toISOString()))

        let nextDate = new Date()
        for (let i = 1; i <= 5; i++){
            nextDate.setDate(todayDate.getDate() + i)
            dates.push(formatDateToString(nextDate.toISOString()))
        }

        return dates
    }
}
