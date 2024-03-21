import { useTask } from "../../hooks/useTask"

export const HomeGuest = () => {
    const { tasks, selectTask, editTaskGuest, deleteTaskGuest, existTask } = useTask()

    const handleEdit = ({ task, index }) => {
        const updatedTask = {...task, taskIndex: index}
        selectTask({ task: updatedTask })
    }

    const handleDelete = ({ index }) => {
        deleteTaskGuest({ taskIndex: index })
    }

    const handleDone = ({ task, index }) => {
        const updatedTask = {...task, is_finished: !task.is_finished}
        editTaskGuest({ updatedTask, taskIndex: index })
    }
    
    return (
        <>
            {
                existTask ? (
                    tasks.map((task, index) => (
                        <div
                            key={index}
                            className={`task-card ${task.is_finished ? "done" : ""}`}
                        >
                            <h3>{`${task.title} ${task.is_finished ? "Done" : "To Do"}`}</h3>
                            <p>{task.description}</p>
                            <section>
                                <button
                                    className={`${task.is_finished ? "done" : "no-done"}`}
                                    onClick={() => handleDone({ task, index })}
                                >
                                    {`${task.is_finished ? "Undo" : "Done"}`}
                                </button>
                                <button
                                    onClick={() => handleEdit({ task, index })}
                                >
                                    {"Edit"}
                                </button>
                                <button
                                    onClick={() => handleDelete({ index })}
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
        </>
    )
}