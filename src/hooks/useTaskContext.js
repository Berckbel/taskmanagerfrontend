import { useContext } from "react";
import TaskContext from "../context/TaskContext";

export const useGlobalTask = () => {
    return useContext(TaskContext)
}