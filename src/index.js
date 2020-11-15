import React, { useState, memo } from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import 'bulma/css/bulma.css'

const Header = (props) => {
    return(
        <div className='card-header'>
            <h1 className='card-header-title header'>
                You have {props.numTodos} Todos
            </h1>
        </div>
    );
}

const TodoList = (props) => {
    const todos = props.tasks.map((todo, index) => {
        return <Todo
            content={todo}
            key={index}
            id={index}
            onDelete={props.onDelete}
        />
    })
    return(
        <div className='list-wrapper'>
            {todos}
        </div>
    );
}

const Todo = (props) => {
    return(
        <div className='list-item'>
            {props.content}
            <button
                className="delete is-pulled-right"
                onClick={() => {props.onDelete(props.id)}}
            ></button>
        </div>
    );
}

const SubmitForm = ({ onFormSubmit }) => {
    const [term, setTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(term === '') return;
        onFormSubmit(term);
        setTerm('');
    }

    return(
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                className='input'
                placeholder='Enter Item'
                value={term}
                onChange={(e) => setTerm(e.target.value)}
            />
            <button className='button'>Submit</button>
        </form>
    );
};

const Settings = memo(({toggleColor}) => {
    return <div className='settings-component'>
        <span>Settings:</span>
        <button onClick={toggleColor} className='button'>change background color</button>
    </div>;
});

const App = () => {
    const [tasks, setTasks] = useState(['task 1', 'task 2', 'task 3']);
    const [isColorDark, setIsColorDark] = useState(false);

    const handleChangeColor = () => {
        setIsColorDark(prevIsColorDark => !prevIsColorDark);
    }

    const handleSubmit = task => {
        setTasks(prevTasks => [...prevTasks, task]);
    }

    const handleDelete = (index) => {
        const newArr = [...tasks];
        newArr.splice(index, 1);
        setTasks(newArr);
    }

    return (
        <div className={`wrapper ${isColorDark ? 'dark' : 'white'}`}>
            <Settings toggleColor={handleChangeColor}/>
            <div className='card frame'>
                <Header
                    numTodos = {tasks.length}
                />
                <TodoList
                    tasks = {tasks}
                    onDelete = {handleDelete}
                />
                <SubmitForm onFormSubmit={handleSubmit} />
            </div>
        </div>
    );
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
