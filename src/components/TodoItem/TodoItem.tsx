import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../../model";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDeleteOutline, MdDone } from "react-icons/md";
import "./style.css";

interface Props {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoItem: React.FC<Props> = ({ todo, todos, setTodos }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleDone = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, todo: editTodo } : todo
            )
        );
        setEdit(false);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <form className="todoItem" onSubmit={(e) => handleEdit(e, todo.id)}>
            {edit ? (
                <input
                    ref={inputRef}
                    value={editTodo}
                    onChange={(e) => setEditTodo(e.target.value)}
                    className="todoItem__text"
                />
            ) : todo.isDone ? (
                <s className="todoItem__text">{todo.todo}</s>
            ) : (
                <span className="todoItem__text">{todo.todo}</span>
            )}

            <div>
                <span
                    className="icon"
                    onClick={() => {
                        if (!edit && !todo.isDone) {
                            setEdit(!edit);
                        }
                    }}
                >
                    <AiOutlineEdit />
                </span>
                <span className="icon" onClick={() => handleDelete(todo.id)}>
                    <MdOutlineDeleteOutline />
                </span>
                <span className="icon" onClick={() => handleDone(todo.id)}>
                    <MdDone />
                </span>
            </div>
        </form>
    );
};

export default TodoItem;
