//import styles
import "./App.css";

//react imports
import { useEffect, useState } from "react";

// import third party packages
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

import {
  AiTwotoneDelete,
  AiOutlineEdit,
  AiFillCheckCircle,
} from "react-icons/ai";

import { BsCircle, BsFillCircleFill } from "react-icons/bs";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [todo, setTodo] = useState({ task: "" });

  const [todosList, setTodoList] = useState([]);

  const [updateId, setId] = useState(null);

  const { task } = todo;

  const [toggle, setToggle] = useState(true);

  const [updateUI, setUpdateUI] = useState(false);

  const baseUrl = "http://localhost:4000/api/tasks/";

  //get all todos
  const getContacts = async () => {
    const todoRes = await axios.get(`${baseUrl}alltodos`);
    setTodoList(todoRes.data);
  };

  //add todo

  const addTodo = async () => {
    console.log("add");

    try {
      const response = await axios.post(`${baseUrl}addtodo`, todo);

      console.log("res=======", response);
      if (response.status === 201) {
        setTodo({ task: "" });

        setUpdateUI((prev) => !prev);
        toast.info(response?.data?.message);
      }
      if (response.status === 200) {
        // setTodo({ task: "" });

        setUpdateUI((prev) => !prev);
        toast.error(response?.data?.message);
      }

      toast.warning(response?.data?.error);
    } catch (err) {
      console.log(err);
      toast.warning(err?.message);
    }
  };

  //delete todo

  const deleteContact = async (id) => {
    const res = await axios.delete(`${baseUrl}${id}`);

    if (res.status === 200) {
      setUpdateUI((prev) => !prev);
      toast.warn(res?.data?.message);
    }
  };

  //logic for todo id
  const updateContact = async (id) => {
    setId(id);
    setToggle(false);
    const res = await axios.get(`${baseUrl}${id}`);
    console.log(res);
    if (res.status === 200) {
      const data = await res.data;
      console.log(data);

      setTodo({ task: data?.task });
      // toast.info(res.data?.message);
    }
  };

  //change status of todo
  const updateStatus = async (id) => {
    try {
      const update = await axios.put(`${baseUrl}updatestatus/${id}`);
      console.log(update);
      if (update.status === 200) {
        setUpdateUI((prev) => !prev);
        toast.info(update.data?.message);
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handleStatusChange = (id) => {
    updateStatus(id);
  };

  //update todo

  const editContact = async () => {
    try {
      const update = await axios.put(`${baseUrl}${updateId}`, todo);
      console.log(update);
      if (update.status === 201) {
        setTodo({ task: "" });
        setToggle(true);
        setUpdateUI((prev) => !prev);
        toast.info(update.data?.message);
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  //event handlers for inputs
  function eventHandler(e) {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  }

  //form handlers
  const submitHandler = (e) => {
    e.preventDefault();

    if (task.length > 0) {
      addTodo();
    } else {
      toast.error("number length should minimum 10 and name not empty");
    }
  };
  const updateSubmitHandler = (e) => {
    e.preventDefault();

    if (task.length > 0) {
      editContact();
    }
  };

  useEffect(() => {
    getContacts();
    console.log("hello");
  }, [updateUI]);

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h1>todos list</h1>
      <div className="form shadow-lg p-5">
        {toggle ? (
          <Form onSubmit={submitHandler} autoComplete="true">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>TODO</Form.Label>
              <Form.Control
                onChange={eventHandler}
                name="task"
                value={task}
                type="text"
                placeholder="Enter your todo"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add todo
            </Button>
          </Form>
        ) : (
          <Form onSubmit={updateSubmitHandler} autoComplete="true">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={eventHandler}
                name="task"
                value={task}
                type="text"
                placeholder="Enter your name"
              />
            </Form.Group>

            <Button onClick={editContact} variant="primary">
              Update todo
            </Button>
          </Form>
        )}
      </div>
      <div className="table_container">
        {todosList.length <= 0 ? (
          <h3 className="text-danger mb-5">no todos</h3>
        ) : (
          <>
            {todosList.map((val, idx) => (
              <div key={idx} className="todo_item">
                <div
                  className="status"
                  onClick={() => {
                    handleStatusChange(val?._id);
                  }}
                >
                  {!val?.done ? (
                    <BsCircle className="icon" />
                  ) : (
                    <AiFillCheckCircle
                      className="icon"
                      style={{ color: "green" }}
                    />
                  )}
                </div>
                <h4
                  style={{
                    textDecoration: val?.done ? "line-through" : "",
                    color: val?.done ? "red" : "",
                  }}
                >
                  {val?.task}
                </h4>
                <div className="edit">
                  <AiOutlineEdit
                    onClick={() => updateContact(val?._id)}
                    className="ml-4 mx-3 icon"
                  />
                  <AiTwotoneDelete
                    className="icon delete"
                    onClick={() => deleteContact(val?._id)}
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
