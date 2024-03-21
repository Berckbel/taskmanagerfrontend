import { useTask } from "../../hooks/useTask"

export const Home = () => {

    const { tasks, selectTask, editTaskById, deleteTaskById, existTask, isLoading, isError } = useTask()

    const handleEdit = ({ task }) => {
        selectTask({ task })
    }

    const handleDelete = ({ task }) => {
        const { id } = task
        deleteTaskById({ task_id: id })
    }

    const handleDone = ({ task }) => {
        const { id, title, description, is_finished } = task
        editTaskById({ task_id: id, title, description, is_finished: !is_finished })
    }

    return (
        <>
            {
                existTask && !isLoading ? (
                    tasks.map(task => (
                        <div
                            key={task.id}
                            className={`task-card ${task.is_finished ? "done" : ""}`}
                        >
                            <h3>{`${task.title} ${task.is_finished ? "Done" : "To Do"}`}</h3>
                            <p>{task.description}</p>
                            <span>{task.created_at}</span>
                            <section>
                                <button
                                    className={`${task.is_finished ? "done" : "no-done"}`}
                                    onClick={() => handleDone({ task })}
                                >
                                    {`${task.is_finished ? "Undo" : "Done"}`}
                                </button>
                                <button
                                    onClick={() => handleEdit({ task })}
                                >
                                    {"Edit"}
                                </button>
                                <button
                                    onClick={() => handleDelete({ task })}
                                >
                                    {"Delete"}
                                </button>
                            </section>
                        </div>
                    ))
                ) :
                    (
                        <h4>{"There are not any tasks"}</h4>
                    )
            }
            {isLoading && <h4>{"loading..."}</h4>}
            {isError && <h4>{"Something went wrong"}</h4>}
        </>
    )
}